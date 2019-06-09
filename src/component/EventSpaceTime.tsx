import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import { Svg } from '../utils/Svg';

export interface Props {
  data: {
    begin_time: string,
    end_time: string,
    location: string,
    location_detail: string
  }
}

export class EventSpaceTime extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const beginDate = new Date(this.props.data.begin_time),
      endDate = new Date(this.props.data.end_time);
    return (
      <View>

        <View style={styles.panel}>
          <View style={styles.titleWrap}>
            <View style={styles.title}>
              <View style={styles.titleLine}></View>
              <Text style={styles.titleText}>When</Text>
            </View>
          </View>
          <View style={styles.blockWrap}>
            <View style={[styles.block, styles.leftBlock]}>
              <View style={styles.blockTitle}>
                <Svg icon="date-from" size="16" color="#D5EF7F" />
                <Text style={styles.blockTitleText}>
                  {beginDate.getDate()}&nbsp;
                  {beginDate.toDateString().split(' ')[1]}&nbsp;
                  {beginDate.getFullYear()}
                </Text>
              </View>
              <View style={styles.blockTime}>
                <Text style={styles.blockTimeNum}>
                  {this.props.data.begin_time.slice(11, 13) * 1 % 12}:{this.props.data.begin_time.slice(14, 16)}
                </Text>
                <Text style={styles.blockTimeType}>{this.props.data.begin_time.slice(11, 13) * 1 > 12 ? 'pm' : 'am'}</Text>
              </View>
            </View>
            <View style={styles.block}>
              <View style={styles.blockTitle}>
                <Svg icon="date-to" size="16" color="#D5EF7F" />
                <Text style={styles.blockTitleText}>
                  {endDate.getDate()}&nbsp;
                  {endDate.toDateString().split(' ')[1]}&nbsp;
                  {endDate.getFullYear()}
                </Text>
              </View>
              <View style={styles.blockTime}>
                <Text style={styles.blockTimeNum}>
                  {this.props.data.end_time.slice(11, 13) * 1 % 12}:{this.props.data.end_time.slice(14, 16)}
                </Text>
                <Text style={styles.blockTimeType}>
                  {this.props.data.end_time.slice(11, 13) * 1 > 12 ? 'pm' : 'am'}
                </Text>
              </View>
            </View>
          </View>

        </View>

        <View style={styles.panel}>
          <View style={styles.titleWrap}>
            <View style={styles.title}>
              <View style={styles.titleLine}></View>
              <Text style={styles.titleText}>Where</Text>
            </View>
          </View>
          <View>
            <Text style={styles.locationMain}>{this.props.data.location}</Text>
            <Text style={styles.locationSub}>{this.props.data.location_detail}</Text>
            <Image source={require('../../assets/gmap.png')} style={styles.mapImg} />

          </View>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  panel: {
    marginLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    borderTopColor: '#E8E8E8',
    borderTopWidth: 1,
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  title: {
    height: 25,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  titleLine: {
    width: 4,
    height: 18,
    backgroundColor: '#8560A9',
    borderRadius: 2
  },
  titleText: {
    color: '#8560A9',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
    marginBottom: 10
  },
  blockWrap: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'center'
  },
  block: {
    width: '50%',
    height: 74,
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftBlock: {
    borderRightWidth: 1,
    borderRightColor: "#E8E8E8",
  },
  blockTitle: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  blockTitleText: {
    fontSize: 16,
    color: '#67616D',
    paddingLeft: 5,
  },
  blockTime: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginVertical: 5,
    marginLeft: 20
  },
  blockTimeNum: {
    fontSize: 32,
    color: '#AECB4F'
  },
  blockTimeType: {
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 8,
    color: '#AECB4F'
  },
  locationMain: {
    color: '#67616D',
    fontSize: 14,
    fontWeight: 'bold'
  },
  locationSub: {
    color: '#67616D',
    fontSize: 14,
    lineHeight: 24
  },
  mapImg: {
    marginTop: 8,
    borderRadius: 8,
    width: '100%',
    height: 88
  }
});


