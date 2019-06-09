# blackCatApp
1. an React-Native app.

2. use TypeScript.

3. build by expo toolchain.


## begin
$ npm install
<br>
$ npm start(or $ expo start)

## project tools
react-navigation, redux, redux-saga, react-native-side-menu, react-native-svg-uri, etc.

## project structure
**utils**: This folder contains all the utils in this propject, such as time formation tool, svg tool, etc.

**redux**: This folder contains files relative to redux and its middleware redux-saga, by whitch we can manage global and some complex states in the project.

**compnent**: This folder contains component files in the propject, includes common components and private components. cuz these two types of components are not really so much, I choes to put them in one folder.

**api.ts**: Manage all of the fetch requests in the project. Export a completed fetch request for each component, which just needs to import the request needed like 'import { userEvents, userDetail } from './api';'

**AppNavigator.ts**: Manage and config router of the project by using react-navigation.

**xxxScene.tsx**: Files built for each main scene of this app.



## other info
**infinite scroll**: Using FlatList and its event 'onEndReached' to load more.


