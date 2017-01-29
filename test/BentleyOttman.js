const Point = require('../Point.js');
const EventQueue = require('../EventQueue.js');
const Polygon = require('../Polygon.js');
const assert = require("chai").assert;
const Sweepline = require("../BentleyOttman.js")

describe('Sweep Line class method test for Floor 87563', function () { 
		const floor87563 = [
						{
						    "id": 26511573,
						    "floor_id": 87563,
						    "x": 642,
						    "y": 1071.66979
						},
						{
						    "id": 26511574,
						    "floor_id": 87563,
						    "x": 645,
						    "y": 399.24953
						},
						{
						    "id": 26511575,
						    "floor_id": 87563,
						    "x": 1305,
						    "y": 399.24953
						},
						{
						    "id": 26511576,
						    "floor_id": 87563,
						    "x": 1299,
						    "y": 720.45028
						},
						{
						    "id": 26511577,
						    "floor_id": 87563,
						    "x": 1392,
						    "y": 720.45028
						},
						{
						    "id": 26511578,
						    "floor_id": 87563,
						    "x": 1392,
						    "y": 630.394
						},
						{
						    "id": 26511579,
						    "floor_id": 87563,
						    "x": 1719,
						    "y": 630.394
						},
						{
						    "id": 26511580,
						    "floor_id": 87563,
						    "x": 1710,
						    "y": 1089.68105
						},
						{
						    "id": 26511581,
						    "floor_id": 87563,
						    "x": 1533,
						    "y": 1092.68293
						},
						{
						    "id": 26511582,
						    "floor_id": 87563,
						    "x": 1536,
						    "y": 1173.7335834896812
						},
						{
						    "id": 26511583,
						    "floor_id": 87563,
						    "x": 1704,
						    "y": 1167.7298311444654
						},
						{
						    "id": 26511584,
						    "floor_id": 87563,
						    "x": 1545,
						    "y": 1449.90619
						},
						{
						    "id": 26511585,
						    "floor_id": 87563,
						    "x": 741,
						    "y": 1461.9137
						},
						{
						    "id": 26511586,
						    "floor_id": 87563,
						    "x": 1296,
						    "y": 1044.6529080675423
						},
						{
						    "id": 26511587,
						    "floor_id": 87563,
						    "x": 1533,
						    "y": 873.54597
						}
				];

	it('test find class method for Sweepline construct', function () {
		let points, polygon, sweepLine, eventQueue;
		points = floor87563.map(function (point) {
				return new Point(point.x, point.y
			)});
		polygon = new Polygon(points);
		sweepLine = new Sweepline(polygon);
		eventQueue = new EventQueue(polygon);
		let event;
		while (event = eventQueue.events.pop()) {
			sweepLine.add(event);
		}
		assert.isOk(sweepLine.find({
			edge: 1
		}));
	});
});