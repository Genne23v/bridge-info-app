# Bridge Information App

This project is to display Ontario bridge information populated from https//data.ontario/dataset/bridge-conditions

User authentication and authorization using passport, JSON web token and guard routes from unauthorized user. 
JSON web token to be stored in client's local storage to maintain a session. User information is stored locally with library Loki.js.

### Bridge Information Pane
![bridge](./src/assets/bridge.jpg)
### Material UI Angular Form
![form](./src/assets/form.jpg)

Various Angular form practice: bridge-form-template-driven, bridge-form-reactive, bridge-form-material components.

## Run the app

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.<br>

<b>[Routes]<br></b>
`login`: User authentication & authorization to access each bridge info<br>
`bridges/:id`: Display a bridge location, width, length and age for a selected ID<br>
`bridges`: Display a list of bridges on the left pane and default location of the map which is Ontario<br>
`new-template`: Angular template-driven form to input bridge information<br>
`new-reactive`: Angular reactive form<br>
`new-material`: Angular form with material UI<br>

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests 

### Test frameworks
Jest: `npm install --save-dev jest` 
Supertest: `npm install --save-dev supertest` 
`npm run test:watch` will run an automatic test when there is a change in the file. 

*Refer to bridge-api/db.test.js file for Jest test.

Jasmine: `npm install --save-dev jasmine` 
RUN Jasmine: `npm test` (ng test)

*Refer to src/app/bridge-info-panel.component.spec.ts for Jasmine test.

