Detecting polygon self-intersection in Javascript
============================================
An implementation of the O((n + k) log n) Bentley–Ottmann sweep-line algorithm for detecting crossings in a set of line segments (originally by Simon Tokumine's iteration of `sweepline`). The aim was to make something to rapidly detect self-intersecting polygons for client side validation before serialization and storage, but there's not much to stop it being used server-side (except it being more a statement of intent than actual production ready code).

* Note: This fork's refactoring does not contain any client side or browser examples - this entirely server side validation of floor plan data and geometries. This version also has all tests rewritten to validate floor-plan data for Property Service.


Development
===========
* node.js 6.9.1
* mocha
* chai

Notable Made Implementation
==============================================
1. ECMAScript classes that provide a much simpler and clearer syntax to create objects and deal with inheritance.
2. Point: refactor the `isLeftofSegment` of Class `Point` as a static method
3. Polygon: fix implicit global variables; rename the `simple_polygon` to `isSimplePolygon`; refactor the logic according to the rest of the classes
4. RedBlackTree: fix the implicit global variables in Kevin Lindsey's implementation;
5. Sweepline: Rename to Bentley-Ottman; improvements to SweepLine and SweepLine segment logic; refactor the logic according to the new constructor patterns
6. EventQueue: add the `next` method; refactor the logic according to the new constructor pattern
7. updates to the test spec for floor plan data


Reference Implementation
==============================================
http://geomalgorithms.com/a09-_avl_code.html#SweepLineClass
the above is the implementation of Bentley–Ottmann sweep-line algorithm with an AVL tree.

In use is a variant with the Red-Black tree in lieu of the AVL tree. It has some adjustments and methods (for example - no rotateLeft and rotateRight methods).


Tests
======
To run the tests, ensure you have node.js and npm, and necessary dev dependencies installed:

$ npm test

Note that this implementation currently doesn't validate polygons that share the same start and end vertex.


License
========
free