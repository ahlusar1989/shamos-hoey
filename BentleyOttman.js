// Originally forked project from https://github.com/tokumine/sweepline
//
// Javascript port of http://softsurfer.com/Archive/algorithm_0108/algorithm_0108.htm
// The following Sweepline and SweepLine implementation validate and test simple 
// polygons

const RedBlackTree = require('./RedBlackTree.js');
const Point = require('./Point.js');
// A class for constructing segments (or edges) of a given polygon to test
// Allows storage and retrieval from the AVL tree
class SweepLineSegment {

	constructor(event) {
	this.edge = event.edge;            // polygon edge i is V[i] to V[i+1]
	this.leftPoint = null;         // leftmost vertex point
	this.rightPoint = null;        // rightmost vertex point
	this.above = null;              // segment above "this" 
	this.below = null;              // segment below "this" 

	}
	// required function for storage in the binary search tree. 
	// This sorts by y axis of the points where the segment crosses 
	// L (eg, the left point)
	compare (seg) {
		return this.equal(seg) ? 0 : (seg.lessThan(this) ? -1 : 1);
	};
	// return true if 'this' is below 'seg'
	lessThan (seg) {
		// First check if these two segments share a left vertex
		if (this.leftPoint == seg.leftPoint) {
			// Same point - the two segments share a vertex.
			// use y coord of right end points
			return this.rightPoint.y < seg.rightPoint.y;
		}
		return new Point(this).isLeftOfSegment(this.leftPoint, this.rightPoint, seg.leftPoint) > 0
	};

	equal (seg) {
		return this.edge == seg.edge
	};

	toString () {
		return "edge:" + this.edge;
	};

}

// Main SweepLine class.
// For full details on the algorithm used, consult the C code here:
// http://softsurfer.com/Archive/algorithm_0108/algorithm_0108.htm
//
// This is essentially a direct port of the above C iteration ==> Javascript
class Sweepline {

	constructor(polygon) {
		// Construct AvlTree
		this.tree =  new RedBlackTree();
		this.numberVertices = polygon.vertices.length;
		this.polygon = polygon;
	}
// Add Algorithm 'event' (more like unit of analysis) to queue
// Units are segments or distinct edges of the polygon.
	add(event) {

		const seg = new SweepLineSegment(event);
		event.seg = seg;
		const p1 = this.polygon.vertices[seg.edge];
		const p2 = seg.edge + 1 < this.polygon.vertices.length ? this.polygon.vertices[seg.edge + 1] : this.polygon.vertices[0];

			// if it is being added, then it must be a LEFT edge event
			// but need to determine which endpoint is the left one first
			if (p1.compareThisWithThat(p2) < 0) {
				seg.leftPoint = p1;
				seg.rightPoint = p2;
			} else {
				seg.leftPoint = p2;
				seg.rightPoint = p1;
			}

			// Add node to tree in order to create links to "above" and "below"
			// edges as per above algorithm 
			const node = this.tree.add(seg);
			const above = this.tree.findNext(node._value);
			const np = this.tree.findPrevious(node._value);

			if (above) {
				seg.above = above;
				seg.above.below = seg;
			}
			if (np) {
				seg.below = np;
				seg.below.above = seg;
			}

			return seg;
	}

	find(event) {
		// need a segment --> source the tree
		const seg = new SweepLineSegment(event);
		const p1 = this.polygon.vertices[seg.edge];
		const p2 = this.polygon.vertices[seg.edge + 1];
		// if it is being added, then it must be a LEFT edge event
		// but need to determine which endpoint is the left one first
		if (p1.compareThisWithThat(p2) < 0) {
			seg.leftPoint = p1;
			seg.rightPoint = p2;
		} else {
			seg.leftPoint = p2;
			seg.rightPoint = p1;
		}
		return this.tree.find(seg)
	}

	// When removing a node from the tree, ensure the above and below links are
	// passed on to adjacent nodes before node is deleted - addressed bug
	remove (seg) {

		// Fixed the bug that incorrectly prunes the tree and removes the wrong elements in the list
		const nd = this.tree.find(seg);
		if (!nd) return;

		// get the above and below segments pointing to each other
		const nextNode = this.tree.findNext(nd);
		if (nextNode) {
			nextNode.below = seg.below;
		}

		const prevNode = this.tree.findPrevious(nd);
		if (prevNode) {
			prevNode.above = seg.above;
		}

		// now  can safely remove it ---> big win!
		this.tree.remove(nd);
	}

	// test intersect of 2 segments and return: false, true
	intersect (segment1, segment2) {

		if (!segment1 || !segment2) return false; // no intersect if either segment doesn't exist

		// check for consecutive edges in polygon
		var e1 = segment1.edge;
		var e2 = segment2.edge;

		if (((e1 + 1) % this.numberVertices === e2) || (e1 === (e2 + 1) % this.numberVertices))
			return false; // no non-simple intersect since consecutive segments
		// test for existence of an intersect point
		var lsign = new Point(this).isLeftOfSegment(segment1.leftPoint, segment1.rightPoint, segment2.leftPoint); // segment2 left point sign
		var rsign = new Point(this).isLeftOfSegment(segment1.leftPoint, segment1.rightPoint, segment2.rightPoint); // segment2 right point sign
		if (lsign * rsign > 0) // segment2 endpoints have same sign relative to segment1
			return false; // => on same side => no intersect is possible
		
		lsign = new Point(this).isLeftOfSegment(segment2.leftPoint, segment2.rightPoint, segment1.leftPoint); // segment1 left point sign
		rsign = new Point(this).isLeftOfSegment(segment2.leftPoint, segment2.rightPoint, segment1.rightPoint); // segment1 right point sign
		
		if (lsign * rsign > 0) // segment1 endpoints have same sign relative to segment2
			return false; // => on same side => no intersect is possible
		return true; // segments segment1 and segment2 are intersecting
	}
}

module.exports = Sweepline;