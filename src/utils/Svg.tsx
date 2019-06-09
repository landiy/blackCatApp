import React, { Component } from 'react';
import {
  ViewStyle,
} from 'react-native'
import SvgUri from 'react-native-svg-uri';
import svgs from '../../assets/svgs';

export interface Props {
  icon: string,
  color: string|undefined,
  size: string|undefined,
  style: string|undefined
}

export class Svg extends Component<Props>{
  render() {
    const {
      icon,
      color,
      size,
      style,
    } = this.props;

    let svgXmlData = svgs[icon];

    if (!svgXmlData) {
      let err_msg = `没有"${icon}"这个icon，请下载最新的icomoo并 npm run build-js`;
      throw new Error(err_msg);
    }
    return (
      <SvgUri
        width={size}
        height={size}
        svgXmlData={svgXmlData}
        fill={color}
        style={style}
      />
    )
  }
}
