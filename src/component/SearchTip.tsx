import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';

export interface Props {
  count: number,
  data: {},
  clearSearch: Function
}

export class SearchTip extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  emitClearSearch = () => {
    this.props.clearSearch()
  }

  render() {
    const channelRender = this.props.data.channels.map(item => { return item.name }).join(',');
    const timeRender = (
      <Text>
        from {new Date(this.props.data.date[0]).toLocaleDateString()} to {new Date(this.props.data.date[1]).toLocaleDateString()}
      </Text>
    );
    return (
      <View style={styles.container}>
        <Text style={styles.resultCount}>{this.props.count} Results</Text>
        <Text style={styles.info}>
          Searched for {channelRender.length ? channelRender : null} Activities &nbsp;
          {this.props.data.date[0] ? timeRender : null}
        </Text>
        <View style={styles.opBtn}>
          <TouchableWithoutFeedback
            onPress={this.emitClearSearch}>
            <Text style={styles.opBtnText}>CLEAR SEARCH</Text>
          </TouchableWithoutFeedback>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FAF9FC',
    paddingVertical: 12,
    paddingHorizontal: 27
  },
  resultCount: {
    fontSize: 16,
    color: '#8560A9'
  },
  info: {
    color: '#67616D',
    fontSize: 12,
    marginTop: 10,
  },
  opBtn: {
    position: 'absolute',
    top: 12,
    right: 15,
    height: 24,
    paddingHorizontal: 10,
    backgroundColor: '#D5EF7F',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  opBtnText: {
    fontSize: 10,
    color: '#67616D'
  }
});