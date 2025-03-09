import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function SVG_multiple(props) {
  const { color, size } = props;
    return (
      <View>
        <Svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill={color}
        >
            <Path d="m15,0H5C2.243,0,0,2.243,0,5v10c0,2.757,2.243,5,5,5h10c2.757,0,5-2.243,5-5V5c0-2.757-2.243-5-5-5Zm-1,11h-3v3c0,.552-.448,1-1,1s-1-.448-1-1v-3h-3c-.552,0-1-.448-1-1s.448-1,1-1h3v-3c0-.552.448-1,1-1s1,.448,1,1v3h3c.552,0,1,.448,1,1s-.448,1-1,1Zm5,13H7c-.552,0-1-.448-1-1s.448-1,1-1h12c1.654,0,3-1.346,3-3V7c0-.552.448-1,1-1s1,.448,1,1v12c0,2.757-2.243,5-5,5Z"/>
        </Svg>
      </View>
    );
}
