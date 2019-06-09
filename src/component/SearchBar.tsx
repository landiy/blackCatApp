import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from 'react-native';

import { fetchChannels } from './../api';
import { Svg } from '../utils/Svg';

export interface Props {
  clickSearch: Function
}

interface State {
  channelData: [],
  chosenDate: { name: string, value: [number, number] },
  chosenChannelList: [],
  dateRange: [string, string]
}

export class SearchBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      channelData: [],
      chosenDate: { name: '', value: [this.now, this.now] },
      chosenChannelList: [],
      dateRange: [(new Date()).toLocaleDateString(), (new Date()).toLocaleDateString()]
    }
  }


  today = new Date();
  now = this.today.getTime();
  todayEnd = new Date(new Date(this.today.toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1).getTime();
  tomorrowStart = this.todayEnd + 1;
  tomorrowEnd = this.tomorrowStart + 24 * 60 * 60 * 1000 - 1;
  weekEnd = this.todayEnd + (7 - (this.today.getDay())) * 24 * 60 * 60 * 1000;
  monthEnd = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 1).getTime() - 1;


  dateTypes = [
    { name: 'ANYTIME', value: ['', ''] },
    { name: 'TODAY', value: [this.now, this.todayEnd] },
    { name: 'TOMORROW', value: [this.tomorrowStart, this.tomorrowEnd] },
    { name: 'THIS WEEK', value: [this.now, this.weekEnd] },
    { name: 'THIS MONTH', value: [this.now, this.monthEnd] },
    { name: 'LATER', value: [] }
  ];

  handleClickDate(date: {}) {
    if (this.state.chosenDate.name !== date.name) {
      this.setState({ chosenDate: date });
    }
  }

  handleClickChannel(channel: {}) {
    let temp = [...this.state.chosenChannelList],
      ind = temp.findIndex((item) => { return item.id * 1 === channel.id });
    if (ind === -1) {
      temp.push(channel);
      this.setState({ chosenChannelList: temp });
    } else {
      temp.splice(ind, 1);
      this.setState({ chosenChannelList: temp });
    }
  }

  handleSearch() {
    if (this.state.chosenChannelList.length === 0 && !this.state.chosenDate.name) {
      return
    }
    let params = {
      date: [this.now, this.now],
      channels: this.state.chosenChannelList,
    }
    if (this.state.chosenDate.name === 'LATER') {
      params.date = [new Date(this.state.dateRange[0]).getTime(), new Date(this.state.dateRange[1]).getTime()]
    } else {
      params.date = this.state.chosenDate.value
    }
    this.props.clickSearch(params)
  }

  renderSearchBtn() {
    const choseNoting = (this.state.chosenChannelList.length === 0 && !this.state.chosenDate.name);
    return (
      <TouchableOpacity
        style={choseNoting ? styles.botBtnWrapUnable : styles.botBtnWrap}
        onPress={this.handleSearch.bind(this)}>
        <View style={styles.botBtn}>
          <View style={styles.searchBtnName}>
            <Svg icon='search' size='15' color={choseNoting ? '#666666' : '#453257'} />
            <Text style={[styles.searchWord, { color: choseNoting ? '#666666' : '#453257', }]}>SEARCH</Text>
          </View>
          {choseNoting ? null :
            (<Text>
              <Text style={styles.subSearchWord}>
                {this.state.chosenChannelList.length ? this.state.chosenChannelList.map((item) => { return item.name }).join(', ') : 'All'}
              </Text>
              <Text style={styles.subSearchWord}> activities </Text>
              <Text style={styles.subSearchWord}>{this.state.chosenDate.name === 'LATER' ? ('from ' + this.state.dateRange[0] + ' to ' + this.state.dateRange[1]) : ''}</Text>
            </Text>)}
        </View>
      </TouchableOpacity>
    )
  }

  renderDateRange() {
    return (
      <View style={styles.dateRangeWrap}>
        <TextInput
          style={styles.dateRangeInput}
          placeholder={'benginTime'}
          defaultValue={this.state.dateRange[0]}
          onChangeText={(time) => {
            let temp = this.state.dateRange;
            temp[0] = time;
            this.setState({ dateRange: temp })
          }}
          onFocus={() => {
            // this.setState({ focusInputType: 'userName' })
          }} />
        <Text style={styles.dateRangeLink}>-</Text>
        <TextInput
          style={styles.dateRangeInput}
          placeholder={'endTime'}
          defaultValue={this.state.dateRange[1]}
          onChangeText={(time) => {
            let temp = this.state.dateRange;
            temp[1] = time;
            this.setState({ dateRange: temp })
          }}
          onFocus={() => {
            // this.setState({ focusInputType: 'userName' })
          }} />
      </View>
    )
  }

  clearAll() {
    this.setState({
      chosenDate: { name: '', value: [this.now, this.now] },
      chosenChannelList: [],
    })
  }

  componentWillMount() {
    fetchChannels().then(res => {
      if (res.status * 1 === 200) {
        this.setState({ channelData: JSON.parse(res._bodyInit).channels })
      }
    })
  }

  render() {
    const dateTabs = this.dateTypes.map((item) => {
      const isActive = (this.state.chosenDate.name === item.name);
      return (
        <TouchableOpacity
          style={isActive ? styles.dateItemActive : styles.dateItem}
          key={item.name}
          onPress={this.handleClickDate.bind(this, item)}
        >
          <Text style={isActive ? styles.dateTextActive : styles.dateText}>
            {item.name}
          </Text>
        </TouchableOpacity>
      )
    });

    const channelTabs = this.state.channelData.map((item) => {
      const isActive = (this.state.chosenChannelList.findIndex(c => { return c.id == item.id }) !== -1);
      return (
        <TouchableOpacity
          onPress={this.handleClickChannel.bind(this, item)}
          key={item.id}
          style={isActive ? styles.channelItemActive : styles.channelItem}>
          <Text style={isActive ? styles.channelTextActive : styles.channelText}>
            {item.name}
          </Text>
        </TouchableOpacity>
      )
    });

    return (
      <View style={styles.wrap}>
        <View style={styles.main}>
          <View style={styles.blockWrap}>
            <View>
              <Text style={styles.blockTitle}>DATE</Text>
              <View style={styles.titleUnderline}></View>
            </View>
            <View style={styles.dateItemWrap}>
              {dateTabs}
            </View>
            {this.state.chosenDate.name === 'LATER' ? this.renderDateRange() : null}
          </View>
          <View style={styles.blockWrap}>
            <View>
              <Text style={styles.blockTitle}>CHANNEL</Text>
              <View style={styles.titleUnderline}></View>
            </View>
            <View style={styles.channelItemWrap}>
              {channelTabs}
            </View>
          </View>
        </View>
        {this.renderSearchBtn()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 22,
    backgroundColor: '#453257'
  },
  main: {
    flex: 1,
    paddingHorizontal: 16
  },
  blockTitle: {
    color: '#AC8EC9',
    fontWeight: 'bold',
    fontSize: 12,
  },
  titleUnderline: {
    height: 1,
    backgroundColor: '#8560A9',
    marginTop: 5
  },
  blockWrap: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 24
  },
  dateItemWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 20
  },
  dateText: {
    fontSize: 14,
    color: '#e8e8e8',
    lineHeight: 24,
    paddingHorizontal: 6,
  },
  dateTextActive: {
    fontSize: 14,
    color: '#453257',
    lineHeight: 24,
    paddingHorizontal: 6,
  },
  dateItem: {
    marginBottom: 9,
    borderRadius: 12,
    marginRight: 5
  },
  dateItemActive: {
    marginBottom: 9,
    borderRadius: 12,
    backgroundColor: '#E5F7A9',
    marginRight: 5
  },
  channelItemWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 9,
  },
  channelItem: {
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D3C1E5',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  channelItemActive: {
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#E5F7A9',
    marginHorizontal: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  channelText: {
    paddingHorizontal: 6,
    color: '#FFF',
    fontSize: 12
  },
  channelTextActive: {
    paddingHorizontal: 6,
    color: '#453257',
    fontSize: 12
  },
  botBtnWrap: {
    height: 64,
    width: '100%',
    backgroundColor: '#D5EF7F',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5
  },
  botBtnWrapUnable: {
    height: 64,
    width: '100%',
    backgroundColor: '#BABABA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchWord: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold'
  },
  subSearchWord: {
    color: '#8560A9',
    fontSize: 10
  },
  searchBtnName: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  dateRangeInput: {
    backgroundColor: '#E5F7A9',
    color: '#8560A9',
    paddingHorizontal: 3
  },
  dateRangeWrap: {
    backgroundColor: '#FFF',
    height: 35,
    width: 208,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  dateRangeLink: {
    color: '#8560A9',
    fontSize: 20
  }
})