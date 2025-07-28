__TASK MASTER API__


_This is a RESTful API for project and task management._

--------------------------------------------------------------------------------------------------
_Brief note on the core tech that makes this API possible_:

It is built with the three core technologies that help build modern web applications.  

_*Node.js_ - a JavaScript runtime environment that lets user run javascript on the server. -- handles file operations, database connections, and HTTP requests.

_*Express.js_ - is a web appication framework for Node.js - makes it easy to create REST APIs, handles HTTP methods of GET (finding and returning requested data), POST(inputing new or creating new data (user, project, task,etc), PUT (updating data), DELETE (deleting data))

_*MongoDb_ - is a NoSQL document database that stores data in BSON --JSON like documents. 


_How the work together (MERN STACK)_: MongoDB stores the data; Express creates the API endpoints and handles HTTP requests; Node.js runs the server-side JavaScript cod; React(frontend) would consume the API


_Example of the flow_: 

User would click on "GET PROJECTS" button on the Frontend --->

frontend makes HTTP request to the endpoint  /api/projects (express route) ---> 

Express route queries MongoDB for the project data (Node.js and MongoDB)--->

MongoDB returns the data ---> 

Express sends JSON response --> 

Frontend displays projects.

------------------------------------------------------------------------------------------------


__FEATURES of TASK MASTER API__


 *  User Managment - Registration, Login, and Authentication (JWT-Based Auth).
   
 *  Project Organization - CRUD --Create, Read, Update, and Delete projects (and tasks).
   
 *  Task Management - manage tasks within projects with status tracking.
   
 *  Security: Password hashing with bcrypt and protected routes.
   
 *  Database: MongoDB with Mongoose object document model ODM

----------------------------------------------------------------------------------------------

__TECH USED__:

_Production dependencies_:
 *  runtime - Node.js --ES6 module support---("type": "module" in package.json)
 *  framework - Express.js --webframework (as stated above), routing, middleware.
 *  Database ODM: Mongoose - MongoDB object modeling, schemas, and validation.
 *  Authentication: jsonwebtoken - JWT token creation and verification.
 *  password security: bcrypt - password hashing with "salt".
 *  environment config: dotenv - load environment variables from .env file.
 *  development tool: nodemon - auto-restart server anytime a file changes---love this:).

----------------------------------------------------------------------------------------------------------

__INSTALLATION__:(in VS Code terminal)

 *  Clone repo - `git clone https://github.com/FrancesReagan/task-master-api.git`
   
 *  `cd task-master-api`
   
 *  install dependecies: `npm i express mongoose jsonwebtoken bcrypt dotenv nodemon`
   
 *  create a `.env` file in root directory:
   
   `MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/
    taskmasterapi?retryWrites=true&w=majority&appName=Cluster0`
    
    `JWT_SECRET=your_super_secret_jwt_key_here`
    
   `PORT=3000`
   
 *  Start the dev server: `npm run dev`

   -------------------------------------------

__MANUAL TESTING with POSTMAN ext in VS CODE__
  _Setup Postman Extension_
  *  Install extension: search for "Postman" in VS code extensions (shortcut ctrl + shift key + X)
  *  Sign in: click postman icon in sidebar, sign in to postman
  *  Test Ready---not using test collections--doing manual testing

 __Manual Testing Guide__
 
 ----------------------------------------------------------------------------------
 
  *  __Register/Create User__: click new HTTP request in postman---
    
     - Method: POST
       
     - URL endpoint to test: http//localhost:3000/api/users/register
       
     - Headers: application/json
       
        - click "body" -- click "raw" ---select JSON
          
        - type in body:
           `{
          
                "username": "starlight",
          
                "email": "starbright@seeyoutonight.com",
          
                "password": "wishingstar678"
          
             }`
          
          -click send
      
          -should see Status: 201 ; see token (now created and assigned to this user), username, email, password, and userid (now created and assigned to this user)
          
          
           <img width="1280" height="764" alt="image" src="https://github.com/user-attachments/assets/81741642-dc2d-42eb-ad9b-2a4e99535049" />
           

            - Copy token from response for next requests.
              
           -`Save the users you create's token, username, email, password, and userid in a separate document somewhere for this project so you can use to continue to test--login, create project and tasks, get project
             and tasks by id, update projects and tasks, and delete project and tasks.`

          -make a few more users to populate data.


      ----------------------------------------------------------------------------------------------------------
     

   * __Login User__ -
     
     - Method: POST
       
     - URL endpoint to test: http//localhost:3000/api/users/login
       
     - Headers: application/json
       
        - click "body" -- click "raw" ---select JSON
          
        - type in body:
      
          
          
           `{
          
                "email": "starbright@seeyoutonight.com",
          
                "password": "wishingstar678"
          
             }`
      
          
          -click send
          
          -should see Status: 201 and in the body token first, then user id username, email, and password now hashed
          
          <img width="1280" height="764" alt="image" src="https://github.com/user-attachments/assets/c30d56fc-478e-4a83-a014-2f165d8b6929" />
          

       - Copy the token from response.


---------------------------------------------------------------------------------------


* __Create Project (protected route)__
  
  _click new HTTP request in postman_
  
     - Method: POST 
       
     - URL endpoint to test: http://localhost:3000/api/projects
       
     - Headers: content-type: application/json; authorization: Bearer _ user token here
       
       -click on "Authorization"  --select "Bearer Token" from type drop down ---insert token from user into token input field
 
       -click on "Body" --- and type in the body new project name and description:
       
       
          `{
       
              "name": "Interdimensional travel",
       
              "description": "top-secret project--transport transportal transportation proven successful"
       
    
           }`
       
          
          -click send
          
          -should see Status: 201 Created
       
           and in the returned body --check "raw" as sometimes "pretty" does not update right away---should see: -name of project, description, user id associated with project, project id, and createdAt time stamp.
       
          <img width="1280" height="764" alt="image" src="https://github.com/user-attachments/assets/e84ffd49-381c-44c8-ae39-37457435e33c" />
       
          - Copy the project Id from the response.

          - make a few more projects for this user by repeating the above steps but with new project name and description---save the project id with
            
             the user's id in a separate document to retrieve later to put in Postman.
            
            for example:
            
            
            <img width="1280" height="764" alt="image" src="https://github.com/user-attachments/assets/23dd0099-00bb-4332-a2a0-df15038585ec" />
 
            


       -------------------------------------------------------------------------------------------------
       

* __GET All projects__ 
  
  _click new HTTP request in postman_
  
     - Method: GET 
       
     - URL endpoint to test: http://localhost:3000/api/projects
       
     - Headers: authorization: Bearer _ user token here (use the user token from the user you created the project for here)
       
       -click on "Authorization"  --select "Bearer Token" from type drop down ---insert token from user into token input field
 
          -click send
          
          -should see Status: 200 OK  -- and in the body of the response back should be a list of all the projects with their id, title, decription, user, timestamp.
        <img width="1280" height="764" alt="image" src="https://github.com/user-attachments/assets/d97c5626-b5b6-43f8-84a8-3385c3bfec80" />
 
       -----------------------------------------------------------------------------------------------------------------------------------------
       
  __GET Single Project__ 
  
  _click new HTTP request in postman_
  
     - Method: GET 
       
     - URL endpoint to test: http://localhost:3000/api/projects/PROJECT_ID_HERE
       
     - Headers: authorization: Bearer _ user token here (use the user token from the user you created the project for here)
       
       -click on "Authorization"  --select "Bearer Token" from type drop down ---insert token from user into token input field
 
          -click send
          
          -should see Status: 200 OK  -- and in the body of the response back should be that specific project id,
       
            name of project, description of project, user associated with project, and time stamp.
       <img width="1280" height="764" alt="image" src="https://github.com/user-attachments/assets/55bbfb35-178b-4ba7-a6eb-3bb59b0a5628" />
 

  -----------------------------------------------------------------------------------------------------


  * __Update a Project__
  
  _click new HTTP request in postman_
  
     - Method: PUT (to update a project use the PUT method) 
       
     - URL endpoint to test: http://localhost:3000/api/projects/PROJECT_ID_HERE
       
     - Headers: content-type: application/json; authorization: Bearer _ user token here
       
       -click on "Authorization"  --select "Bearer Token" from type drop down ---insert token from user into token input field
 
       -click on "Body" --- and type in the body your desired updates for the specific project name and description:
       
       
          `{
       
              "name": "Moon and Star Power---harnessing moon and starlightto power our homes",
       
              "description": "declassified--moon and star power will be utilized for all homes in America"
    
           }`
 
          
          -click send
          
          -should see Status: 200 OK -----and in the returned body --check "raw" as sometimes "pretty" does not update right away---should see:

            - UPDATED name of project, UPDATED description, user id associated with  project, project id, and createdAt time stamp.
        <img width="1280" height="764" alt="image" src="https://github.com/user-attachments/assets/7ab30e14-b083-47ab-8429-47778ed74be6" />
       
       --------------------------------------------------------------------------------------------------------


       
* __Create a TASK__
  
  _click new HTTP request in postman_
  
     - Method: POST 
       
     - URL endpoint to test: http://localhost:3000/api/projects/PROJECT_ID_HERE/tasks
       
     - Headers: content-type: application/json; authorization: Bearer _ user token here
       
       -click on "Authorization"  --select "Bearer Token" from type drop down ---insert token from user into token input field
 
       -click on "Body" --- and type in the body new project name and description:
       
       
          `{
       
               "title": "Moon and Star Power ---harnessing moon and starlight to power our homes",
       
               "description": "declassified--moon and star power will be utilized for all homes in America",
       
               "status": "To Do"

           }`
 
          
          -click send
          
          -should see Status: 201 Created and in the returned body --check "raw" as sometimes "pretty" does not update right away---should see: -title of task, description or task, , status, project id associated with
           the task, task id, and createdAt time stamp.
           <img width="1280" height="764" alt="image" src="https://github.com/user-attachments/assets/35e8cd92-acf1-49c0-905b-3ad3620b5955" />



       -------------------------------------------------------------------------------------------------------------------------------

       * __GET All TASKS for Project__
  
  _click new HTTP request in postman_
  
     - Method:GET
       
     - URL endpoint to test: http://localhost:3000/api/projects/PROJECT_ID_HERE/tasks
       
     - Headers: authorization: Bearer _ user token here (use the user token from the user you created the project for here
       
       -click on "Authorization"  --select "Bearer Token" from type drop down ---insert token from user into token input field
 
       (note: if you were just now creating tasks for this project---make sure you delete the request body content--otherwise you won't see the
       list of tasks associated with that user's token and project id)
 
          -click send
          
          -should see Status: 200 OK  -- and in the body of the response back should be a list of all the tasks with their task id, task title, task description,
           status of the task, associated project id, and time stamp.

         <img width="1280" height="764" alt="image" src="https://github.com/user-attachments/assets/272cd234-6f6b-4493-99ec-fb1122d9db52" />


  ---------------------------------------------------------------------------------------


 __GET Single Task__ 
  
  _click new HTTP request in postman_
  
     - Method: GET 
       
     - URL endpoint to test:http://localhost:3000/api/tasks/TASK_ID_HERE
       
     - Headers: authorization: Bearer _ user token here (use the user token from the user you created the project for here)
       
       -click on "Authorization"  --select "Bearer Token" from type drop down ---insert token from user into token input field
 
          -click send

          -should see Status: 200 OK  -- and in the body of the response back should be that specific task id, title of task, 
          
          description of specific task, status of task, project id of project assoicated with task, name of project, 
          
          description of project, user id associated with project, and time stamp.
 <img width="1280" height="764" alt="image" src="https://github.com/user-attachments/assets/458c3496-d6ea-418d-9f3b-28cb8f64b79c" />
 


---------------------------------------------------------------


 * __Update a Task__
  
  _click new HTTP request in postman_
  
     - Method: PUT (to update a task use the PUT method) 
       
     - URL endpoint to test: http://localhost:3000/api/tasks/6886d2090b768348a9a0acc9
       
     - Headers: content-type: application/json; authorization: Bearer _ user token here
       
       -click on "Authorization"  --select "Bearer Token" from type drop down ---insert token from user into token input field
 
       -click on "Body" --- and type in the body your desired updates for the specific task:

       
          `{
       
              "status": "Done"
       
    
           }`
 
          
          -click send

          
          -should see Status: 200 OK -----and in the returned body --check "raw" as sometimes "pretty" does not update right away---should see:

            - UPDATED task -- in this case just the status of task was updated.
           
 <img width="1280" height="764" alt="image" src="https://github.com/user-attachments/assets/3ba0001a-0200-4444-83d4-bd3b7cc3b0f8" />



 -----------------------------------------------------------------------

 
* __DELETE a Task__
  
  _click new HTTP request in postman_
  
     - Method: DELETE
       
     - URL endpoint to test: http://localhost:3000/api/tasks/TASK_ID_HERE
       
     - Headers: content-type: application/json; authorization: Bearer _ user token here
    
       
       -click on "Authorization"  --select "Bearer Token" from type drop down ---insert token from user into token input field
        - ensure the request body is empty befor you hit send---

      -should see Status: 200 OK and message in response body { "message": "Task deleted successfully"}
  <img width="1280" height="764" alt="image" src="https://github.com/user-attachments/assets/b18140c9-5726-4dda-9626-de4ce205909a" />



  -----------------------------------------------------------------------------------------------------------


* __DELETE a Project
  
  _click new HTTP request in postman_
  
     - Method: DELETE
       
     - URL endpoint to test: http://localhost:3000/api/projects/PROJECT_ID_HERE
       
     - Headers: content-type: application/json; authorization: Bearer _ user token here
    
       
       -click on "Authorization"  --select "Bearer Token" from type drop down ---insert token from user into token input field
        - ensure the request body is empty befor you hit send---

      -should see Status: 200 OK and message in response body { "message": "Project has been deleted."}
 <img width="1280" height="764" alt="image" src="https://github.com/user-attachments/assets/641faace-4c16-47f1-a7e0-175da3d8171c" />


  
--------------------------------------------------------------------------------------------------------------------

__DEPLOYMENT TEST__

_Backend Deployment on Render.com_

 * go to `render.com` and sign up or login
   
 * create new web service: click `new +` ----select `web service` ----connect to your GitHub account--select `task-master-api` repo
   
 * configure build settings on render: name: task-master-api; runtime: node ; build command: npm install; start command: node server.js; select "Free" for the instance type.
   
 * add environmental variables: MONGO_URI=your_mongodb_atlas_connection_string; JWT_SECRET=your_jwt_secret; PORT=3000 -- can manually add--- or click option add from `.env`
   
   --navigate to your .env file in the repo and then select `add variables`---this will instantly populate these.
   
 * deploy: click `Deploy Web service" ---- check that it is successfully deployed----will get a deployed url: like -- https://task-master-api-94i3.onrender.com
 * create a simple front-end: just one HTML file and an API--keep on Render.com;
                              - add `simple-frontend` folder in the backend file structure and in that that folder create `index.html`;
                              - make simple index.html file that displays message API is running successfully";
                              - add this line `app.use(express.static("public"));` to the backend server.s file --- put after the express.json() middleware---
                                 and before the API route handlers---this way the static files are served first---then the API routes will handle the endpoint
                                 `/api/` requests.






------------------------------------------
Acknowledgements: Thank to my instructors Colton Wright and Abraham Tavarez for their guidance and to my fellow classmates of 2025-RTT-23 Cohort for their feedback and support
