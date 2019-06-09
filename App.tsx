import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

import AppNavigator from './src/AppNavigator'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
          <AppNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
});

export default App;
