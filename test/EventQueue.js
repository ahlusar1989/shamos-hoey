const Point = require('../Point.js');
const EventQueue = require('../EventQueue.js');
const Polygon = require('../Polygon.js');
const assert = require("chai").assert;


// Floorplan 1723 data
describe('Shamos Hoey Event Queue', function () {
	describe('event queue', function () {
			let points, data, polygon, event_queue;
			it('test can create an Event Queue', function () {
				const data = [
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

				var points = data.map(function (pnt) {
					return new Point(pnt.x, pnt.y);
				});

				polygon = new Polygon(points);

				event_queue = new EventQueue(polygon);

				assert.equal(event_queue.events.length, 30);
				assert.equal(event_queue.events.length, event_queue.numberOfEvents);
			});
	});
});