import React from 'react';
import { SafeAreaView, View} from 'react-native';
import Main from './main/main';
import stylesGlobal from '../../style/GlobalColor';

export default function Archive() {
  return (
    <SafeAreaView style={stylesGlobal.container}>
      <Main />
    </SafeAreaView>
  );
}
