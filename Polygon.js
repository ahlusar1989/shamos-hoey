var EventQueue = require('./EventQueue.js'),
	SweepLine = require('./BentleyOttman.js');


class Polygon {
		constructor(pointArray) {
		this.vertices = pointArray
	}	

	// returns true if simple, false if not.
	isSimplePolygon() {

		let seg, event, eventQueue, sweepLine;
		eventQueue = new EventQueue(this);
		sweepLine = new SweepLine(this);
		// This while loop processes all "events" (aka vertices) in the sorted queue
		// Events are classified as only left or right vertices
		while (event = eventQueue.next()) {
			if (event.type == 'left') {
				seg = sweepLine.add(event);
				if (sweepLine.intersect(seg, seg.above)) return false;
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