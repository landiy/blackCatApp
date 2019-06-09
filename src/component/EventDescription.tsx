import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo';

export interface Props {
  data: {
    description: string
  }
}

interface State {
  showAll: boolean
}

export class EventDescription extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showAll: this.props.data.description.length < 300,
    }
  }

  layoutY = 0;

  render() {
    const mask = (
      <LinearGradient
        colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 1)']}
        style={styles.eventTextMask}>
        <View style={styles.viewAllWrap}>
          <TouchableWithoutFeedback onPress={() => { this.setState({ showAll: true }) }}>
            <Text style={styles.viewAll}>VIEW ALL</Text>
          </TouchableWithoutFeedback>
        </View>
      </LinearGradient>);

    const imgsList = this.props.data.images.map((item,ind) => {
      return <Image
        source={{ uri: item }}
        style={styles.imgItem}
        key={ind}/>
    })

    return (
      <View 
      style={styles.container}
      onLayout={event => { this.layoutY = event.nativeEvent.layout.y }}>
        <ScrollView
          style={styles.imgsWrap}
          horizontal={true} // 横向
          showsHorizontalScrollIndicator={false}
        >
          {imgsList}
        </ScrollView>
        <View>
          <TouchableWithoutFeedback onPress={() => { this.setState({ showAll: false }) }}>
            <Text style={styles.eventText}>
              {this.state.showAll ? this.props.data.description : this.props.data.description.slice(0, 300)}
            </Text>
          </TouchableWithoutFeedback>

          {this.state.showAll ? null : mask}
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  imgsWrap: {
    flexDirection: 'row',
    paddingTop: 16
  },
  imgItem: {
    width: 180,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor:'#E8E8E8'
  },
  eventText: {
    marginTop: 14,
    color: '#67616D',
    fontSize: 14
  },
  eventTextMask: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 57,
  },
  viewAllWrap: {
    position: 'absolute',
    right: 20,
    bottom: 0,
    width: 66,
    height: 24,
    backgroundColor: '#D5EF7F',
    borderRadius: 12
  },
  viewAll: {
    lineHeight: 24,
    color: '#67616D',
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold'
  }
})
