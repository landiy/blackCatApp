import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';

export interface Props {
  data: {}
}

export class EventHead extends React.Component<Props>{
  constructor(props: Props) {
    super(props);
  }
  
  layoutHeight = 0;

  getDayDiff(d1: Date, d2: Date) {
    let diff = new Date(d1.toLocaleDateString()).getTime() - new Date(d2.toLocaleDateString()).getTime();
    return Math.abs(diff) / (1000 * 60 * 60 * 24)
  }


  render() {
    return (
      <View
        style={styles.head}
        onLayout={(e) => { this.layoutHeight = e.nativeEvent.layout.height }}>
        <View style={styles.channelLine}>
          <Text style={styles.channelName}>{this.props.data.channel.name}</Text>
        </View>
        <Text style={styles.eventTitle}>{this.props.data.name}</Text>
        <View style={styles.userInfoWrap}>
          <Image
            source={{ uri: this.props.data.creator.avatar }}
            style={styles.userAvatar} />
          <View style={styles.usrInfo}>
            <Text style={styles.authorName}>{this.props.data.creator.username}</Text>
            <Text style={styles.authorTime}>Published {this.getDayDiff(new Date(), new Date(this.props.data.create_time))} days ago</Text>
          </View>
        </View>
      </View>)
  }
}

const styles = StyleSheet.create({
  head: {
    paddingHorizontal: 16,
  },
  channelLine: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  channelName: {
    lineHeight: 20,
    fontSize: 12,
    color: '#8560A9',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#D3C1E5'
  },
  eventTitle: {
    color: '#453257',
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 28
  },
  userInfoWrap: {
    marginVertical: 30,
    flexDirection: 'row',
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18
  },
  usrInfo: {
    marginLeft: 12,
    height: 36,
    justifyContent: 'space-between'
  },
  authorName: {
    color: '#67616D',
    fontSize: 14
  },
  authorTime: {
    color: '#BABABA',
    fontSize: 12
  }

});


