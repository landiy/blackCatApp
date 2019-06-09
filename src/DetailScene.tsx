import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList
} from 'react-native';
import TopHead from './component/TopHead';
import { EventDescription } from './component/EventDescription';
import { EventHead } from './component/EventHead';
import { EventPanel } from './component/EventPanel';
import { EventSpaceTime } from './component/EventSpaceTime';
import { EventInteractive } from './component/EventInteractive';
import { EventFoot } from './component/EventFoot';
import { CommentItem } from './component/CommentItem';
import { fetchDetail, comments } from './api';

export interface Props {
  navigation: {}
}

interface State {
  detailData: {},
  commentList: []
}

export class DetailScene extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      detailData: {},
      commentList: []
    }
  }

  static navigationOptions = {
    header: null
  };

  basicData = {};
  myScrollView = null;
  commentLayoutY = 0;
  eventHeadHeight = 0;

  getData = () => {
    fetchDetail(this.basicData.id).then(res => {
      if (res.status * 1 === 200) {
        setTimeout(() => {
          this.setState({ detailData: JSON.parse(res._bodyInit).event })
        }, 300)
      }
    })
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  jump2Part(type: string) {
    let y = 0;
    switch (type) {
      case 'details':
        y = this.refs.description.layoutY;
        break;
      case 'participants':
        y = this.refs.interactive.layoutY;
        break;
      case 'comments':
        y = this.commentLayoutY;
        break;
      default:
        y = 0
    };
    this.myScrollView.scrollTo({ x: 0, y: y, animate: true })
  }

  getComments() {
    comments(this.basicData.id, 'GET').then(res => {
      if (res.status * 1 === 200) {
        this.setState({ commentList: JSON.parse(res._bodyInit).comments })
      }
    })
  }

  handleScroll(e) {
    let y = e.nativeEvent.contentOffset.y;
    if (y < this.eventHeadHeight) {
      this.refs.topPart.setNativeProps({
        style: { top: 60 - y }
      });
      this.myScrollView.setNativeProps({
        style: { marginTop: this.eventHeadHeight + 50 - y }
      })
    } else {
      this.refs.topPart.setNativeProps({
        style: { top: 60 - this.eventHeadHeight }
      });
      this.myScrollView.setNativeProps({
        style: { marginTop: 48 }
      })
    }
  }

  componentWillMount() {
    this.basicData = this.props.navigation.getParam('data', {});
    this.getData();
    this.getComments();
  }

  componentDidMount() {
    setTimeout(() => {
      this.eventHeadHeight = this.refs.eventHead.layoutHeight;
      this.myScrollView.setNativeProps({
        style: { marginTop: this.eventHeadHeight + 60 }
      })
    }, 10)


  }

  render() {
    return (
      <View style={styles.container}>
        <TopHead
          handleClickOpBtn={this.goBack}
          navigation={this.props.navigation} />
        <View style={styles.topWrap} ref='topPart'>
          <EventHead data={this.basicData} ref='eventHead' />
          <EventPanel clickPanel={this.jump2Part.bind(this)} />
        </View>
        <ScrollView
          style={styles.scrollPartWrap}
          ref={(view) => { this.myScrollView = view; }}
          onScroll={this.handleScroll.bind(this)}
          scrollEventThrottle={20}>
          <EventDescription data={this.basicData} ref='description' />
          <EventSpaceTime data={this.basicData} />
          <EventInteractive data={this.basicData} ref='interactive' />
          <FlatList
            onLayout={event => { this.commentLayoutY = event.nativeEvent.layout.y }}
            style={styles.commentWrap}
            data={this.state.commentList}
            keyExtractor={item => item.id + ''}
            renderItem={({ item }) => <CommentItem data={item}></CommentItem>} />
        </ScrollView>
        {Object.keys(this.state.detailData).length ? <EventFoot data={this.state.detailData} updateData={this.getData} /> : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topWrap: {
    position: 'absolute',
    top: 60
  },
  commentWrap: {
    marginLeft: 16,
    marginTop: 20
  }
});


