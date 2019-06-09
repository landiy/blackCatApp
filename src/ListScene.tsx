import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  Text
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import { SearchBar } from './component/SearchBar';
import TopHead from './component/TopHead';
import { ListItem } from './component/ListItem';
import { fetchEvents } from './api';
import { Svg } from './utils/Svg';
import { SearchTip } from './component/SearchTip';
const { width } = Dimensions.get('window');

export interface Props {
  navigation: {}
}

interface State {
  searchOpen: boolean,
  listData: [],
  searchTipShow: boolean
}

export class ListScene extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchOpen: false,
      listData: [],
      searchTipShow: false,
    }
  }
  static navigationOptions = {
    header: null
  };

  itemOffset = 0;
  pageVol = 25;
  firstLoad = true;
  searchData = {};

  async getEventList(option: {}) {
    //数据库只有6-1到6-2号的数据
    let list = await fetchEvents(option).then(res => {
      if (res.status * 1 === 200) {
        return JSON.parse(res._bodyInit).events;
      } else {
        return []
      }
    }).catch(err => {
      return []
    })
    return list;
  }

  handleSearch = (obj: { date: [], channels: any }) => {
    this.searchData = obj;
    this.firstLoad = false;
    this.itemOffset = 0;
    let option = {
      after: obj.date[0],
      before: obj.date[1],
      channels: obj.channels.map(item => { return item.id }).join(','),
      offset: 0,
      limit: this.pageVol
    };
    this.getEventList(option).then(list => {
      this.setState({
        listData: list,
        searchOpen: false,
        searchTipShow: true,
      })
    })

  }

  handleEndReached = () => {
    this.itemOffset += this.pageVol;
    let option = {
      offset: this.itemOffset,
      limit: this.pageVol
    }
    this.getEventList(option).then(list => {
      let newList = [...this.state.listData, ...list];
      this.setState({ listData: newList })
    })
  }

  openSearch = () => {
    this.setState({ searchOpen: true })
  }

  jump2Detail = (data) => {
    this.props.navigation.push('Detail', { data: data })
  }

  clearSearch = () => {
    this.setState({ searchTipShow: false });
    this.refs.searchBar.clearAll()
  }

  componentWillMount() {
    this.getEventList().then(list => {
      this.setState({ listData: list });
    });
  }

  render() {
    const menu = <SearchBar clickSearch={this.handleSearch} ref="searchBar" />;
    const eventList = (
      <FlatList
        style={styles.main}
        data={this.state.listData}
        onEndReachedThreshold={0.1}   //是一个百分比
        onEndReached={this.handleEndReached}
        keyExtractor={item => item.id + ''}
        renderItem={({ item }) => <ListItem data={item} showDetail={this.jump2Detail}></ListItem>}
      />);
    const nothing = (
      <View style={styles.emptyWrap}>
        <Svg icon='no-activity' size='60' color='#D3C1E5' />
        <Text style={styles.emptyText}>No activity found</Text>
      </View>
    );
    const whitePage = (<View style={styles.emptyWrap}></View>);
    const searchTip = (
      <SearchTip
        count={this.state.listData.length}
        data={this.searchData}
        clearSearch={this.clearSearch} />)

    return (
      <SideMenu
        menu={menu}                    //抽屉内的组件
        isOpen={this.state.searchOpen}     //抽屉打开/关闭
        openMenuOffset={3 * width / 4}     //抽屉的宽度
        hiddenMenuOffset={0}          //抽屉关闭状态时,显示多少宽度 默认0 抽屉完全隐藏
        edgeHitWidth={100}              //距离屏幕多少距离可以滑出抽屉,默认60
        disableGestures={false}        //是否禁用手势滑动抽屉 默认false 允许手势滑动
        menuPosition={'left'}     //抽屉在左侧还是右侧
        autoClosing={true}         //如果为false,可能导致关闭不生效
      >
        <View style={styles.container}>
          <TopHead handleClickOpBtn={this.openSearch}
            navigation={this.props.navigation}
            type='home' />
          {this.state.searchTipShow ? searchTip : null}
          {(this.state.listData.length) ? (eventList) : (this.firstLoad ? whitePage : nothing)}


        </View>
      </SideMenu>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  main: {
    flex: 1,
    paddingTop: 5
  },
  emptyWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    marginTop: 14,
    fontSize: 14,
    color: '#BABABA'
  }
});