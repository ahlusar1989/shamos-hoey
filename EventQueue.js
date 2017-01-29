let currentIndex;
let points;


class EventQueue {

	constructor(polygon) {

	points = polygon.vertices.length; // length
	currentIndex = 0;
	this.numberOfEvents = 2 * points;  // 2 "events" for each edge - one for each vertex: a and b
	this.events = [];
	
	// Initialize event queue with edge segment endpoints
	for (let i = 0; i < points; i++) {
		const a = 2 * i;
		const b = 2 * i + 1;
		this.events[a] = {edge: i};
		this.events[b] = {edge: i};
		this.events[a].vertex = polygon.vertices[i];
		this.events[b].vertex = i + 1 < points ? polygon.vertices[i + 1] : polygon.vertices[0];
		this.events[a].otherEnd = this.events[b];
		this.events[b].otherEnd = this.events[a];

		this.events[a].seg = this.events[b].seg = 0;
		if (this.events[a].vertex.compareThisWithThat(this.events[b].vertex) < 0) { // determine type
			this.events[a].type = 'left';
			this.events[b].type = 'right';
		} else {
			this.events[a].type = 'right';
			this.events[b].type = 'left';
		}
	}

	// sort events lexicographically
	this.events.sort(compare);

	}

	next() {
		const result = this.events[currentIndex];
		if (result) {
			currentIndex++;
		}
		return result
	}

	reset() {
		currentIndex = 0;
	}
}


function compare(edge1, edge2) {
		const v1 = edge1.vertex,
			v2 = edge2.vertex;

		const right = v1.compareThisWithThat(v2);

		if (right == 0) {
			if (edge1.type == edge2.type) return 0;
			if (edge1.type == 'left') return -1;
			else return 1;
		} else {
			return right;
		}
	}

module.exports = EventQueue;
