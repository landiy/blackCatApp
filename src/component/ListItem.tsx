import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { Svg } from '../utils/Svg';
import DateUtil from '../utils/DateUtil';
import { eventGoing } from '../api';
import { eventLike } from '../api';

export interface Props {
  data: {
    id: string,
    creator: {
      avatar: string,
      username: string,
    },
    channel: {
      name: string
    },
    name: string,
    begin_time: string,
    end_time: string,
    description: string,
    me_likes: boolean,
    me_going: boolean
  },
  showDetail: Function,
}

interface State {
  meLike: boolean,
  meGoing: boolean
}

export class ListItem extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      meLike: this.props.data.me_likes,
      meGoing: this.props.data.me_going
    }
  }

  handleClickItem = () => {
    this.props.showDetail(this.props.data);
  }

  handleClickLike = () => {
    if (this.state.meLike) {
      this.setState({ meLike: false });
      eventLike(this.props.data.id, 'DELETE').then((res) => {})
    } else {
      this.setState({ meLike: true });
      eventLike(this.props.data.id, 'POST').then((res) => {})
    }
  }

  handleClickGoing = () => {
    if (this.state.meGoing) {
      this.setState({ meGoing: false });
      eventGoing(this.props.data.id, 'DELETE').then((res) => {})
    } else {
      this.setState({ meGoing: true });
      eventGoing(this.props.data.id, 'POST').then((res) => {})
    }
  }

  render() {
    return (

      <View style={styles.wrap} >
        <View style={styles.barWrap}>
          <View style={styles.usrInfo}>
            <Image source={{ uri: this.props.data.creator.avatar }} style={styles.userAvatar} />
            <Text style={styles.usrName}>{this.props.data.creator.username}</Text>
          </View>
          <Text style={styles.channelName}>{this.props.data.channel.name}</Text>
        </View>
        <TouchableWithoutFeedback
          onPress={this.handleClickItem}>
          <View>
            <View>
              <Text style={styles.title}>
                {this.props.data.name}
              </Text>
              <View style={styles.timeWrap}>
                <Svg icon="clock" size="12" color="#8560A9" />
                <Text style={styles.tiemText}>
                  {DateUtil.formatDate(this.props.data.begin_time, 'yyyy MM dd hh:mm')}
                  &nbsp;-&nbsp;
              {DateUtil.formatDate(this.props.data.end_time, 'yyyy MM dd hh:mm')}
                </Text>
              </View>
            </View>

            <Text style={styles.bodyText}>
              {this.props.data.description.toString().length > 300 ?
                (this.props.data.description.toString().slice(0, 300) + '...') : (this.props.data.description)}
            </Text>

          </View>

        </TouchableWithoutFeedback>
        <View style={styles.footWrap}>
          <TouchableWithoutFeedback onPress={this.handleClickGoing}>
            <View style={styles.footItem}>
              <Svg icon={this.state.meGoing ? 'check' : 'check-outline'} size="10" color={this.state.meGoing ? '#AECB4F' : '#AC8EC9'} />
              <Text style={styles.footText}>
                {this.state.meGoing ? 'I am going' : this.props.data.goings_count + ' Going'}
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={this.handleClickLike}>
            <View style={styles.footItem}>
              <Svg icon={this.state.meLike ? 'like' : 'like-outline'} size="10" color={this.state.meLike ? '#FF5C5C' : '#AC8EC9'} />
              <Text style={styles.footText}>
                {this.state.meLike ? 'I like it' : this.props.data.likes_count + ' Likes'}
              </Text>
            </View>
          </TouchableWithoutFeedback>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    justifyContent: 'flex-start',
    borderBottomWidth: 2,
    borderBottomColor: '#E8E8E8',
    paddingRight: 16,
    marginLeft: 16,
    paddingTop: 8
  },
  barWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10

  },
  usrInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  usrName: {
    fontSize: 12,
    color: '#67616D',
    marginLeft: 10
  },
  channelName: {
    fontSize: 12,
    color: '#8560A9',
    lineHeight: 20,
    paddingHorizontal: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#8560A9',
  },
  title: {
    fontSize: 18,
    color: '#453257',
    fontWeight: 'bold'
  },
  timeWrap: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center'
  },
  tiemText: {
    fontSize: 12,
    color: '#8560A9',
    marginLeft: 6
  },
  bodyText: {
    color: '#67616D',
    fontSize: 14
  },
  footWrap: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 45
  },
  footItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30
  },
  footText: {
    fontSize: 12,
    color: '#453257',
    marginLeft: 8
  },
  userAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10
  }
});
