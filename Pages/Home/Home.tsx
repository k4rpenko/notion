import React from 'react';
import {SafeAreaView, View} from 'react-native';
import Header from './header/header';
import Main from './main/main';
import stylesGlobal from '../../style/GlobalColor';

export default function Home() {
  return (
    <SafeAreaView style={stylesGlobal.container}>
      <Header />
      <Main />
    </SafeAreaView>
  );
}
