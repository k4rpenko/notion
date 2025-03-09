import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

export default function Header() {
  return (
    <View style={styles.Header}>
      <Text>Header</Text>
    </View>
  );
}


const styles = StyleSheet.create({
    Header: {
        flex: 1,
        backgroundColor: '#212121',
    },
});
