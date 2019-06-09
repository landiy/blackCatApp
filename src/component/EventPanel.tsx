import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import { Svg } from '../utils/Svg';


export interface Props {
  clickPanel: Function
}

export class EventPanel extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      channelData: []
    }
  }

  emitClick(type: string) {
    this.props.clickPanel(type)
  }

  render() {
    return (
      <View style={styles.panel}>
        <TouchableWithoutFeedback
          onPress={this.emitClick.bind(this, 'details')}>
          <View style={styles.panelItemWrap}>
            <Svg icon='info-outline' size="23" color="#BABABA" />
            <Text style={styles.panelItemText}>Details</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={this.emitClick.bind(this, 'participants')}>
          <View style={styles.panelItemWrap}>
            <Svg icon='people-outline' size="23" color="#BABABA" />
            <Text style={styles.panelItemText}>Participants</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={this.emitClick.bind(this, 'comments')}>
          <View style={styles.panelItemWrap}>
            <Svg icon='comment-outline' size="23" color="#BABABA" />
            <Text style={styles.panelItemText}>Comments</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  panel: {
    flexDirection: 'row',
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  panelItemWrap: {
    flexDirection: 'row',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '33.3%',
    borderRightWidth: 1,
    borderRightColor: '#E8E8E8'
  },
  panelItemText: {
    fontSize: 12,
    color: '#8C8C8C',
    marginLeft: 6
  },
})


