import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'
import store from './../redux/store';
import { Svg } from '../utils/Svg';

interface Props {
  type: string | undefined,
  handleClickOpBtn: Function,
  navigation: {}
}

export default class TopHead extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  opBtnIcon = this.props.type === 'home' ? 'search' : 'home';

  jump2User = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'User' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <View style={styles.wrap}>
        <TouchableOpacity onPress={this.props.handleClickOpBtn}>
          <Svg icon={this.opBtnIcon} size="20" color="#453257" />
        </TouchableOpacity>

        <Svg icon="logo-cat" size="20" color="#D5EF7F" />
        <TouchableWithoutFeedback onPress={this.jump2User}>
          <Image source={{ uri: store.getState().avatar }}
            style={styles.avatar} />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    height: 60,
    width: '100%',
    backgroundColor: '#8560A9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 19,
    zIndex:99
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12
  }
});