import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import TopHead from './component/TopHead'
import store from './redux/store';
import { Svg } from './utils/Svg';
import { userEvents, userDetail } from './api';
import { ListItem } from './component/ListItem'

export interface Props {
  navigation: {
    replace: Function
  },
}
interface State {
  eventList: [],
  activeTypeInd: number,
  likesCount: number,
  pastCount: number,
  goingCount: number,
  userInfo:{}
}

export class UserScene extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      likesCount: 0,
      pastCount: 0,
      goingCount: 0,
      activeTypeInd: 0,
      eventList: [],
      userInfo:{}
    };
  }

  activeType = ['liked', 'going', 'past'];

  static navigationOptions = {
    header: null
  };

  goBackHome = () => {
    this.props.navigation.replace('List')
  }

  getEvents = () => {
    userEvents(this.activeType[this.state.activeTypeInd]).then(res => {
      if (res.status * 1 === 200) {
        this.setState({ eventList: JSON.parse(res._bodyInit).events });
      }
    })
  }

  handleChangeType(typeInd: number) {
    this.setState({ activeTypeInd: typeInd });
    setTimeout(() => {
      this.getEvents();
    }, 0)
  }

  componentWillMount() {
    this.setState({userInfo: store.getState()});
    userDetail().then((res) => {
      if (res.status * 1 === 200) {
        let data = JSON.parse(res._bodyInit);
        this.setState({
          likesCount: data.likes_count,
          pastCount: data.past_count,
          goingCount: data.goings_count,
        })
      }
    });
    this.getEvents();
  }


  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <TopHead
          handleClickOpBtn={this.goBackHome}
          navigation={this.props.navigation} />
        <View style={styles.topWrap}>
          <Image
            style={styles.bigAvatar}
            source={{ uri: this.state.userInfo.info.avatar }} />
          <Text style={styles.bigName}>{this.state.userInfo.info.username}</Text>
          <View style={styles.emailWrap}>
            <Svg icon='email' size='20' color='#8560A9' />
            <Text style={styles.emailText}>{this.state.userInfo.info.email}</Text>
          </View>
        </View>

        <View style={styles.panel}>
          <TouchableWithoutFeedback onPress={this.handleChangeType.bind(this, 0)}>
            <View style={styles.panelItemWrap}>
              <Svg icon='like' size="16" color={this.state.activeTypeInd === 0 ? '#AECB4F' : '#BABABA'} />
              <Text style={this.state.activeTypeInd === 0 ? styles.panelItemHighlight : styles.panelItemText}>
                {this.state.likesCount} Likes
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.handleChangeType.bind(this, 1)}>
            <View style={styles.panelItemWrap}>
              <Svg icon='check' size="16" color={this.state.activeTypeInd === 1 ? '#AECB4F' : '#BABABA'} />
              <Text style={this.state.activeTypeInd === 1 ? styles.panelItemHighlight : styles.panelItemText}>
                {this.state.goingCount} Going
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.handleChangeType.bind(this, 2)}>
            <View style={styles.panelItemWrap}>
              <Svg icon='past-outline' size="16" color={this.state.activeTypeInd === 2 ? '#AECB4F' : '#BABABA'} />
              <Text style={this.state.activeTypeInd === 2 ? styles.panelItemHighlight : styles.panelItemText}>
                {this.state.pastCount} Past
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <FlatList
          data={this.state.eventList}
          keyExtractor={item => item.id + ''}
          renderItem={({ item }) => <ListItem data={item} showDetail={() => { }}></ListItem>}
        />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container:{
    flex:1
  },
  topWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30
  },
  bigAvatar: {
    width: 74,
    height: 74,
    borderRadius: 37,
    borderWidth: 3,
    borderColor: '#D3C1E5',
    marginVertical: 24
  },
  bigName: {
    fontSize: 24,
    color: '#67616D'
  },
  emailWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  emailText: {
    color: '#8560A9',
    fontSize: 14,
    marginLeft: 5
  },
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
  panelItemHighlight: {
    fontSize: 12,
    marginLeft: 6,
    color: '#AECB4F'
  }
})