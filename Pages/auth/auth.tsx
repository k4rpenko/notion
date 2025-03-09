import React from 'react';
import { SafeAreaView } from 'react-native';
import Main from './main/main';
import stylesGlobal from '../../style/GlobalColor';

export default function Auth() {
  return (
    <SafeAreaView style={stylesGlobal.container}>
      <Main />
    </SafeAreaView>
  );
}
