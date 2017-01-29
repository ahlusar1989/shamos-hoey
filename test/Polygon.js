const Point = require('../Point.js');
const EventQueue = require('../EventQueue.js');
const Polygon = require('../Polygon.js');
const assert = require("chai").assert;



describe('polygon', function () {
	let points, polygon;
	it('test can build a polygon from floor data', function () {
		const floor = [
				    {
				      "id": 1297005,
				      "floor_id": 17123,
				      "x": 174,
				      "y": 108.06754,
				      "archived": 0
				    },
				    {
				      "id": 1297006,
				      "floor_id": 17123,
				      "x": 174,
				      "y": 1303.55226,
				      "archived": 0
				    },
				    {
				      "id": 1297007,
				      "floor_id": 17123,
				      "x": 2039.21114,
				      "y": 1303.55226,
				      "archived": 0
				    },
				    {
				      "id": 1297008,
				      "floor_id": 17123,
				      "x": 2039.21114,
				      "y": 108.06754,
				      "archived": 0
				    },
				    {
				      "id": 1297009,
				      "floor_id": 17123,
				      "x": 2039.21114,
				      "y": 606.37899,
				      "archived": 0
				    },
				    {
				      "id": 1297010,
				      "floor_id": 17123,
				      "x": 951.137,
				      "y": 606.164,
				      "archived": 0
				    },
				    {
				      "id": 1297011,
				      "floor_id": 17123,
				      "x": 174,
				      "y": 606.164,
				      "archived": 0
				    },
				    {
				      "id": 1297012,
				      "floor_id": 17123,
				      "x": 951.137,
				      "y": 1303.55226,
				      "archived": 0
				    },
				    {
				      "id": 1297013,
				      "floor_id": 17123,
				      "x": 951.137,
				      "y": 108.06754,
				      "archived": 0
				    },
				    {
				      "id": 1297014,
				      "floor_id": 17123,
				      "x": 1515,
				      "y": 108.06754,
				      "archived": 0
				    },
				    {
				      "id": 1297015,
				      "floor_id": 17123,
				      "x": 1515,
				      "y": 606.275,
				      "archived": 0
				    },
				    {
				      "id": 1297016,
				      "floor_id": 17123,
				      "x": 1641,
				      "y": 240.15009,
				      "archived": 0
				    },
				    {
				      "id": 1297017,
				      "floor_id": 17123,
				      "x": 1641,
				      "y": 495.30957,
				      "archived": 0
				    },
				    {
				      "id": 1297018,
				      "floor_id": 17123,
				      "x": 1911.01669,
				      "y": 495.30957,
				      "archived": 0
				    },
				    {
				      "id": 1297019,
				      "floor_id": 17123,
				      "x": 1911.01669,
				      "y": 240.15009,
				      "archived": 0
				    }
				  ];

			points = floor.map(function (point) {
				return new Point(point.x, point.y);
			}),
			polygon = new Polygon(points);
			
		assert.equal(polygon.vertices.length, floor.length);
		assert.equal(polygon.vertices[0].x, floor[0].x);
	});

});


