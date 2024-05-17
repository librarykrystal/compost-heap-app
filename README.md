# compost-heap-app
This is an app for creative writers to collect and manage their "compost heap" of ideas.  Users can also enter and make changes to collections of tags (e.g. character trait, setting, or dialogue) which have customizable color-coding, and writing projects.  Ideas in the heap can be tagged by type and assigned to a project, if the user wishes to do so.  This information will be visible on the home screen in the home list of all ideas, which will be filterable by tag and/or project.

### CURRENT STAGE of DEVELOPMENT: ROUTES
This is where I am tracking which CRUD routes are completed in the app, for my own planning as well as for any visitors here checking out my work and progress.  Some routes are used in multiple places, in which case they are not checked off until utilized/functioning in the particular component below.

RegisterForm
  - [x] USER: POST

LoginForm
  - [x] USER: GET w/ AUTH

UserHome
  - [x] IDEA: GET ALL

DetailsPage
  - [x] IDEA: GET by IDEA ID
  - [x] TAG: GET by IDEA ID

AddIdeaPage
  - [x] IDEA: POST

EditIdeaPage
  - [ ] IDEA: GET by IDEA ID
  - [ ] TAG: GET ALL
  - [ ] TAG: GET by IDEA ID
  - [ ] IDEA: PUT
  - [ ] IDEA: DELETE

TagsPage
  - [x] TAG: GET ALL

AddTagPage
  - [x] TAG: POST

EditTagPage
  - [x] TAG: GET by TAG ID
  - [x] TAG: PUT
  - [x] TAG: DELETE

ProjectsPage
  - [x] PROJECT: GET ALL

AddProjectPage
  - [x] PROJECT: POST
  
EditProjectPage
  - [x] PROJECT: GET by PROJECT ID
  - [ ] PROJECT: PUT
  - [x] PROJECT: DELETE