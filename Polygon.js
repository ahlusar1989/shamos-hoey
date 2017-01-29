var EventQueue = require('./EventQueue.js'),
	SweepLine = require('./BentleyOttman.js');


class Polygon {
		constructor(pointArray) {
		this.vertices = pointArray
	}	

	// returns true if simple, false if not.
	isASimplePolygon () {

		const eventQueue = new EventQueue(this);
		const sweepLine = new SweepLine(this);
		let seg, event;

		// This while loop processes all "events" (aka vertices) in the sorted queue
		// Events are classified as only left or right vertices
		while (event = eventQueue.next()) {
			if (event.type == 'left') {
				seg = sweepLine.add(event);
				if (sweep_line.intersect(seg, seg.above)) return false;
				if (sweepLine.intersect(seg, seg.below)) return false;

			} else {
				seg = event.otherEnd.seg;
				if (sweepLine.intersect(seg.above, seg.below)) return false;
				sweepLine.remove(seg);
			}
		}
		return true;
	}

}


module.exports = Polygon;