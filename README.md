__TASK MASTER API__


_This is a RESTful API for project and task management._


_Brief note on the core tech that makes this API possible_:

It is built with the three core technologies that help build modern web applications.  

*Node.js - a JavaScript runtime environment that lets user run javascript on the server. -- handles file operations, database connections, and HTTP requests.

*Express.js - is a web appication framework for Node.js - makes it easy to create REST APIs, handles HTTP methods of GET (finding and returning requested data), POST(inputing new or creating new data (user, project, task,etc), PUT (updating data), DELETE (deleting data))

*MongoDb - is a NoSQL document database that stores data in BSON --JSON like documents. 


_How the work together (MERN STACK)_: MongoDB stores the data; Express creates the API endpoints and handles HTTP requests; Node.js runs the server-side JavaScript cod; React(frontend) would consume the API


_Example of the flow_: 

User would click on "GET PROJECTS" button on the Frontend --->

frontend makes HTTP request to the endpoint  /api/projects (express route) ---> 

Express route queries MongoDB for the project data (Node.js and MongoDB)--->

MongoDB returns the data ---> 

Express sends JSON response --> 

Frontend displays projects.
