import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Text,
  Keyboard,
} from 'react-native';
import { Svg } from '../utils/Svg';
import { eventLike, eventGoing, comments } from '../api';
import store from '../redux/store';

export interface Props {
  data: {},
  updateData: Function
}

interface State {
  atComment: boolean,
  keyboardShow: boolean,
  keyboardHeight: number,
  comment2User: {}
}

export class EventFoot extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      atComment: false,
      keyboardShow: false,
      keyboardHeight: 0,
      comment2User: {}
    }
  }


  commentText = ''

  ComponentWillMount() {

  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      this.setState({
        keyboardShow: true,
        keyboardHeight: e.endCoordinates.height
      })
    });
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', (e) => {
      this.setState({
        keyboardShow: false,
        keyboardHeight: 0
      })
    });

    store.subscribe(() => {
      let state = store.getState(),
          obj = {};
      if (state.comment.open) {
        obj.atComment = true;
        if (state.comment.type === 'toUser') {
          obj.comment2User = state.comment.info.user
        }
        this.setState(obj);
      }
    })
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  toggleLike = () => {
    if (this.props.data.me_likes) {
      eventLike(this.props.data.id, 'DELETE').then((res) => {
        this.props.updateData();
      });
    } else {
      eventLike(this.props.data.id, 'POST').then((res) => {
        this.props.updateData();
      });
    }
  }

  toggleGoing = () => {
    if (this.props.data.me_going) {
      eventGoing(this.props.data.id, 'DELETE').then((res) => {
        this.props.updateData();
      });
    } else {
      eventGoing(this.props.data.id, 'POST').then((res) => {
        this.props.updateData();
      });
    }
  }

  commentEvent = (user: undefined | {}) => {
    store.dispatch({
      type: 'COMMENT_STATUS_CHANGE',
      info: { open: true, type: 'toEvent', info: this.props.data }
    })
  }

  sendMsg = () => {
    if(this.commentText.trim().length===0){
      return
    }
    comments(this.props.data.id,'POST',this.commentText).then(res=>{
      if(res.status*1 === 200){
        this.refs.myInput.blur();
        this.refs.myInput.clear();
        this.context = '';
        store.dispatch({
          type: 'COMMENT_STATUS_CHANGE',
          info: { open: false, type: 'close' }
        });
      }
      
    })
    
  }

  cancleInput = () => {
    this.refs.myInput.blur();
    this.commentText = '';
    this.setState({
      atComment: false,
      comment2User:{}
    });
    store.dispatch({
      type: 'COMMENT_STATUS_CHANGE',
      info: { open: false, type: 'close' }
    })
  }



  render() {
    const opPanel = (
      <View style={styles.wrap}>
        <View style={styles.leftPart}>
          {/* Comment */}
          <TouchableWithoutFeedback onPress={this.commentEvent}>
            <View>
              <Svg icon='comment-single' size="24" color="#453257" />
            </View>
          </TouchableWithoutFeedback>
          {/* Like */}
          <TouchableWithoutFeedback onPress={this.toggleLike}>
            <View>
              <Svg
                icon={this.props.data.me_likes ? 'like' : 'like-outline'}
                size="24"
                color={this.props.data.me_likes ? '#FF5C5C' : '#453257'} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        {/* Join */}
        <TouchableWithoutFeedback onPress={this.toggleGoing}>
          <View style={styles.rightPart}>
            <Svg icon={this.props.data.me_going ? 'check' : 'check-outline'}
              size="24"
              color='#788C36' />
            <Text style={styles.joinText}>
              {this.props.data.me_going ? 'I am going' : 'Join'}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );

    const commentPanel = (
      <View style={styles.wrap}>
        <View style={styles.comLeft}>
          <TouchableWithoutFeedback onPress={this.cancleInput}>
            <View>
              <Svg icon='cross' size='18' color='#D5EF7F' />
            </View>
          </TouchableWithoutFeedback>

          <TextInput
            ref='myInput'
            style={styles.comInput}
            placeholder={this.state.comment2User.username ? '@' + this.state.comment2User.username : 'Write Your Comment!'}
            onChangeText={(text) => { this.commentText = text; }} />
        </View>
        <View style={styles.comRight}>
          <TouchableWithoutFeedback onPress={this.sendMsg}>
            <View>
              <Svg icon='send' size='28' color='#8560A9' />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )

    return (
      <View style={this.state.keyboardShow ?
        [styles.container, { position: 'absolute', bottom: this.state.keyboardHeight }] : styles.container}>
        {this.state.atComment ? commentPanel : opPanel}
      </View>

    )
  }
}


const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '100%'
  },
  wrap: {
    flexDirection: 'row',
    flex: 1
  },
  leftPart: {
    height: '100%',
    width: '56%',
    flex: 14,
    flexDirection: 'row',
    backgroundColor: '#8560A9',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  rightPart: {
    height: '100%',
    flex: 11,
    flexDirection: 'row',
    backgroundColor: '#D5EF7F',
    justifyContent: 'center',
    alignItems: 'center'
  },
  joinText: {
    color: '#788C36',
    fontSize: 14,
    marginLeft: 10
  },
  comLeft: {
    flexDirection: 'row',
    backgroundColor: '#8560A9',
    flex: 7,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  comInput: {
    backgroundColor: '#FFF',
    color: '#D3C1E5',
    paddingLeft: 19,
    borderRadius: 20,
    width: 207,
    height: 32
  },
  comRight: {
    flex: 2,
    backgroundColor: '#D5EF7F',
    justifyContent: 'center',
    alignItems: 'center'
  }
})