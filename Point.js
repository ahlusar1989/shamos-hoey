class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return `(${this.x}, ${this.y})`;
    }

	compareThisWithThat (other_point) {

		// x-coord first
		if (this.x > other_point.x) return 1;
		if (this.x < other_point.x) return -1;

		// y-coord second
		if (this.y > other_point.y) return 1;
		if (this.y < other_point.y) return -1;

		// they are the same point
		return 0
	}

	// Answers the question, given a line segment p0 -> p1,
	// is p2 left, right or on this segment
	//
	// returns:
	//  > 0 if the line is to the left of the line segment
	//  0 if point is on the line
	//  < 0 if the line is to the right of the segment
	isLeftOfSegment (p0, p1, p2) {
		return (p1.x - p0.x) * (p2.y - p0.y) - (p2.x - p0.x) * (p1.y - p0.y);
	}

}

module.exports = Point;