import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function SVG_make_fill(props) {
  const { color } = props;
    return (
      <View>
        <Svg
          viewBox="0 0 24 24"
          width="25px"
          height="25px"
          fill={color}
        >
          <Path d="M18,19v4.7a4.968,4.968,0,0,0,1.879-1.164l2.656-2.658A4.954,4.954,0,0,0,23.7,18H19A1,1,0,0,0,18,19Z"/>
          <Path d="M7.172,13.828A4,4,0,0,0,6,16.657V18H7.343a4,4,0,0,0,2.829-1.172L21.5,5.5a2.121,2.121,0,0,0-3-3Z"/>
          <Path d="M24,4.952a4.087,4.087,0,0,1-1.08,1.962L11.586,18.243A5.961,5.961,0,0,1,7.343,20H6a2,2,0,0,1-2-2V16.657a5.957,5.957,0,0,1,1.758-4.242L17.086,1.086A4.078,4.078,0,0,1,19.037,0c-.013,0-.024,0-.037,0H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H16V19a3,3,0,0,1,3-3h5V5C24,4.984,24,4.969,24,4.952Z"/>
        </Svg>
      </View>
    );
}
