import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Main from './main/main';
import stylesGlobal from '../../style/GlobalColor';

const MockupMain = () => {
  return (
    <SafeAreaView style={stylesGlobal.container}>
      <Main />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MockupMain;
