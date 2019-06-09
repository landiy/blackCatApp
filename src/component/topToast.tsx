import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions
} from 'react-native';

const {width}  = Dimensions.get('window');

export interface Props {
  text:any
}

export class TopToast extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.wrap}>
        <Text style={styles.contentText}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    position:'absolute',
    width:width,
    top:60,
    zIndex:2,
    backgroundColor:'rgba(229, 247, 169, 0.8)',
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:7
  },
  contentText:{
    color:'#8560A9',
    fontSize:14,
    fontWeight:'bold'
  }
});