import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  FlatList,
  Dimensions
} from 'react-native';
import { Svg } from '../utils/Svg';
import { eventLike, eventGoing } from '../api';
const { width } = Dimensions.get('window');

export interface Props {
  data: {
    id: number,
    likes_count: number,
    goings_count: number
  }
}

interface State {
  likeList: [],
  goingList: [],
  goingShowAll: boolean,
  likeShowAll: boolean,
}

export class EventInteractive extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      likeList: [],
      goingList: [],
      goingShowAll: this.props.data.goings_count <= this.avatarCountPerRow,
      likeShowAll: this.props.data.likes_count <= this.avatarCountPerRow,
    }
  }

  avatarCountPerRow = Math.floor((width - 80 - 16) / 31);
  layoutY = 0;

  toggleShowAll(type: string) {
    let stateName = type + 'ShowAll',
      newStatus = !this.state[stateName],
      obj = {};
    obj[stateName] = newStatus;
    this.setState(obj);
  }

  componentWillMount() {
    eventLike(this.props.data.id, 'GET').then(res => {
      this.setState({ likeList: JSON.parse(res._bodyInit).users })
    });
    eventGoing(this.props.data.id, 'GET').then(res => {
      this.setState({ goingList: JSON.parse(res._bodyInit).users })
    });
  }

  render() {
    const renderLikeList = this.state.likeList.map((item, ind) => {
      return <Image style={styles.avatars} key={item.id} source={{ uri: item.avatar }} />
    });
    const renderGoingList = this.state.goingList.map((item, ind) => {
      return <Image style={styles.avatars} key={item.id} source={{ uri: item.avatar }} />
    });

    return (
      <View onLayout={event => { this.layoutY = event.nativeEvent.layout.y }}>
      <View style={styles.likeGoWrap}>
        <View style={[styles.lineWrap, styles.topLineWrap]}>
          <View style={styles.countWrap}>
            <Svg icon='check-outline' size="12" color="#AC8EC9" />
            <Text style={styles.countText}>{this.props.data.goings_count} going</Text>
          </View>
          <TouchableWithoutFeedback onPress={this.toggleShowAll.bind(this, 'going')}>
            <View style={[styles.avatarList, { width: (width - 115) }]}>
              {this.state.goingShowAll ? renderLikeList : renderLikeList.slice(0, this.avatarCountPerRow - 2)}
              {this.state.goingShowAll ? null : (
                <TouchableWithoutFeedback onPress={this.toggleShowAll.bind(this, 'going')}>
                  <View style={styles.dropBtn}>
                    <Text style={styles.dropBtnIcon}>∨</Text>
                  </View>
                </TouchableWithoutFeedback>)}
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.lineWrap}>
          <View style={styles.countWrap}>
            <Svg icon='like-outline' size="12" color="#AC8EC9" />
            <Text style={styles.countText}>{this.props.data.likes_count} likes</Text>
          </View>
          <TouchableWithoutFeedback onPress={this.toggleShowAll.bind(this, 'like')}>
            <View style={[styles.avatarList, { width: (width - 115) }]}>
              {this.state.likeShowAll ? renderLikeList : renderLikeList.slice(0, this.avatarCountPerRow - 2)}
              {this.state.likeShowAll ? null : (
                <TouchableWithoutFeedback onPress={this.toggleShowAll.bind(this, 'like')}>
                  <View style={styles.dropBtn}>
                    <Text style={styles.dropBtnIcon}>∨</Text>
                  </View>
                </TouchableWithoutFeedback>)}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  likeGoWrap: {
    paddingTop: 11,
    paddingBottom: 18,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  lineWrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingRight: 16,
    marginLeft: 16,
    paddingTop: 13,
    paddingBottom: 6
  },
  topLineWrap: {
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1
  },
  countWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
    width: 80,
  },
  countText: {
    marginLeft: 6,
    color: '#67616D',
    fontSize: 12,
    marginRight: 17
  },
  avatarList: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  avatars: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 7,
    marginBottom: 7
  },
  dropBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#AC8EC9',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dropBtnIcon: {
    color: '#AC8EC9',
    fontSize: 10
  },
})