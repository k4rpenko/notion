import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Find() {
  const navigation = useNavigation();


  const OpenToDo = () => {
    const type: string = 'ToDo';
    navigation.navigate('Creat', { type });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.ExampleButton} onPress={OpenToDo}>
        <Text style={styles.ExampleText}>To do list</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.ExampleButton}>
        <Text style={styles.ExampleText}>Voice</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.ExampleButton}>
        <Text style={styles.ExampleText}>Paint</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 10,
    padding: Platform.OS !== 'ios' ? 15 : 0,
    height: '90%',
  },
  ExampleButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#212121',
    borderRadius: 10,
  },
  ExampleText: {
    color: '#FFFFFF',
  },
});
