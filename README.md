Use MongoDB Atals Instruciton 

1. log in on https://cloud.mongodb.com/user#/atlas/login
username: cristinachen1204@gmail.com
password: sail@1204

2. add your IP address to IP whitelist enable connection 
- click "Network Access" under "SECURITY"
- click "+ADD IP ADDRESS"
- add your current IP address (school ip has already been added in)

3. connection string and user account information 
"mongodb+srv://admin:admin123@cluster0-vddun.azure.mongodb.net/sample?retryWrites=true&w=majority"
our account name: admin
our password: admin123
sample is the database name 

4. connect to cloud database simply by starting server "node server.js"

5. use mongo shell to load data or something else 
- open a new terminal 
- enter following command
mongo "mongodb+srv://cluster0-vddun.azure.mongodb.net" --username admin
- enter password: admin123
- if loading data, use absolute path like:
load("/Users/Cristina/Desktop/tracker/expressServer/createDB/createSampleData.js")

How to run backend server?

1. open a terminal and go to the folder tracker/expressServer/lib
2. "npm install"
3. "node server.js", comiple first if necessary 

How to run Angular with chart.js?

1. npm install --save ng2-charts
2. npm install --save chart.js

how to run mocha tests?

1. start backend server
2. open a terminal, go to tracker/expressServer/lib/test
3. run mocha test using commandline:
mocha
(you need replace the goalid value inside test.js with dynamically generated goalId in broswer for tests all pass)


Azure Instruciton 


Trello URL: 
https://trello.com/b/saJnIaud/user-stories


Feedback Incorporated:
**Project Review #1**
- Powerpoint was used for later presentation
- Due date is included in Goal Schema
- Resolved concerns about implementation
- "Tag" property is included in Goal Schema to separate goals
- Goals are divided into three categories: finished and due, not finish and due, and not finish and not due; with different color presenting to users.

**User Stories**
- User Stories seperated into Sprint 1, 2, 3, and 4 
- Trello is labeled 

**Project Review #2**
- Backend file was seperated to controllers, models, routes, tests
- Typescript is used for implementation
- User model and Record model were added, instead of having only one model