import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function SVG_folder_fill(props) {
  const { color } = props;
    return (
      <View>
        <Svg viewBox="0 0 64 64" width="35px" height="35px" fill={color}  {...props}>
          <Path d="M10 27h44v18c0 3.309-2.691 6-6 6H16c-3.309 0-6-2.691-6-6V27zM54 24H10v-5c0-3.309 2.691-6 6-6h3.896c1.81 0 3.585.623 4.998 1.753l1.713 1.37C27.312 16.689 28.199 17 29.104 17H48c3.309 0 6 2.691 6 6V24z"/>
        </Svg>
      </View>
    );
}
