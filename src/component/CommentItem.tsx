import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import store from '../redux/store';
import { Svg } from '../utils/Svg';

export interface Props {
  data: {
    create_time: string,
    comment: string,
    user: {
      avatar: string,
    }
  },
  onReply: Function
}

export class CommentItem extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  replySomeone = () => {
    store.dispatch({
      type: 'COMMENT_STATUS_CHANGE',
      info: { open: true, type: 'toUser', info:this.props.data }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.leftWrap}>
          <Image style={styles.avatars} source={{ uri: this.props.data.user.avatar }} />
        </View>

        <View style={styles.rightWrap}>
          <View style={styles.titleWrap}>
            <Text style={styles.titleUser}>{this.props.data.user.username}</Text>
            <Text style={styles.titleTime}>
              {Math.floor((new Date().getTime() - new Date(this.props.data.create_time).getTime()) / (1000 * 60 * 60))}&nbsp;
              hours ago
            </Text>
          </View>
          <Text style={styles.commentText}>
            {this.props.data.comment}
          </Text>
        </View>

        <View style={styles.replyIconWrap}>
          <TouchableWithoutFeedback style={styles.replyIcon} onPress={this.replySomeone}>
            <View><Svg icon='reply' size="17" color="#D5EF7F" /></View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  leftWrap: {
    flex: 1
  },
  avatars: {
    width: 32,
    height: 32,
    borderRadius: 16,

  },
  rightWrap: {
    marginLeft: 12,
    paddingRight: 30,
    flex: 8
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  titleUser: {
    color: '#8560A9',
    fontSize: 12,
    marginRight: 12
  },
  titleTime: {
    color: '#BABABA',
    fontSize: 10,
    paddingBottom: 1
  },
  replyIcon: {
    width: 16,
    height: 16,
  },
  replyIconWrap: {
    position: 'absolute',
    right: 16,
    top: 0
  },
  commentText: {
    color: '#666666',
    fontSize: 14
  }
})