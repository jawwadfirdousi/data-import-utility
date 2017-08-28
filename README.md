data-import-utility
===================

This little script gets a formatted csv file from the url, parses the orders and writes them in the DB with streaming.

A batch of maximum **5,000** records is written to MySQL database.
This solution is scalabale, millions of records can be processed without choking memory.

Batch limit could be increased or decreased based on stream performance.

Sequelize ORM is used, although the size of the project is not huge, and even inline queries would have done the job nicely but ORMs make code a bit maintainable.

Tests are written with Jasmine.

----------


Prerequisites
-------------
- To run the script, **Node.js** and **MySQL** must be installed on the running machine.

- .env file must be configured on root of the project with the required keys.
 *.env-sample* on root of the project constains the example about how *.env* should look like.



 ----------

Installation
-------------

All local dependencies can be installed with npm using

	% npm install



  ----------

  Configuring
  -------------

Set the correct MySQL URL in .env on root and make sure the DB is already created.

Eslint and Editor Config files are used to maintain a consistent coding style throughout the project.

  ---------

  Running
  ---------

project can be executed with the

	% npm start


On start it will immmediatedly start downling the file in chunk and will process them simultaneously.


---------

Test
---------


Tests can be run with

	% npm test
