import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function SVG_lock(props) {
  const { color, size } = props;
    return (
      <View>
        <Svg
          viewBox="0 0 512.000000 512.000000"
            width={size}
            height={size}
            fill={color}
        >
          <Path d="M405.333,179.712v-30.379C405.333,66.859,338.475,0,256,0S106.667,66.859,106.667,149.333v30.379 c-38.826,16.945-63.944,55.259-64,97.621v128C42.737,464.214,90.452,511.93,149.333,512h213.333 c58.881-0.07,106.596-47.786,106.667-106.667v-128C469.278,234.971,444.159,196.657,405.333,179.712z M277.333,362.667 c0,11.782-9.551,21.333-21.333,21.333c-11.782,0-21.333-9.551-21.333-21.333V320c0-11.782,9.551-21.333,21.333-21.333 c11.782,0,21.333,9.551,21.333,21.333V362.667z M362.667,170.667H149.333v-21.333c0-58.91,47.756-106.667,106.667-106.667 s106.667,47.756,106.667,106.667V170.667z"/>
        </Svg>
      </View>
    );
}
