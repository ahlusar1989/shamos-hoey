const Point = require('../Point.js');
const assert = require("chai").assert;

describe('Point constructor test', function () {
		it('test less than precision', function () {
			var p0 = new Point(1, 1);
			var p1 = new Point(3, 3);
			assert.equal(p0.compareThisWithThat(p1), -1);
		});

		it('test greater than precision', function () {
			var p0 = new Point(1, 1);
			var p1 = new Point(3, 3);
			assert.equal(p1.compareThisWithThat(p0), 1);
		});

		it('test equality precision', function () {
			var p0 = new Point(1, 1);
			assert.equal(p0.compareThisWithThat(p0), 0);
		});

		it('test left of line', function () {
			var p0 = new Point(1.0, 1.0);
			var p1 = new Point(3.0, 3.0);
			var p2 = new Point(1.0, 3.0);

			assert.ok(new Point().isLeftOfSegment(p0, p1, p2) > 0);
		});
});
