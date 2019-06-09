import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import { LoginScene } from './LoginScene';
import { ListScene } from './ListScene';
import { DetailScene } from './DetailScene';
import { UserScene } from './UserScene'


const Scenes = createStackNavigator({
  Login: {
    screen: LoginScene
  },
  List: {
    screen: ListScene
  },
  Detail: {
    screen: DetailScene
  },
  User: {
    screen: UserScene
  }
}, {
    initialRouteName: 'Login'
  });

const AppNavigator = createAppContainer(Scenes);

export default AppNavigator;
