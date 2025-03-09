import React, { useState } from 'react';
import { StyleSheet, Image, TextInput, View, TouchableOpacity, Text, Platform } from 'react-native';

export default function Header() {
  const [note, setNote] = useState('');

  return (
    <View style={styles.Header}>
      <View style={styles.Find}>
        <TouchableOpacity style={styles.MenuButton}>
          <Text style={Platform.select({
            ios: styles.MenuTextIos,
            android: styles.MenuTextAndroid,
          })}>●●●</Text>
        </TouchableOpacity>
        
        {/* Вертикальна риска */}
        <View style={styles.Divider} />
        
        <TextInput
          style={Platform.select({
            ios: styles.TextInputIos,
            android: styles.TextInputAndroid,
          })}
          multiline
          placeholder="Search"
          placeholderTextColor={'#cccccc'}
          textAlignVertical="center"
          value={note}
          onChangeText={setNote}
        />

        {/* Вертикальна риска */}
        <View style={styles.Divider} />

        <TouchableOpacity style={styles.UserBox}>
          <Image
            source={{
              uri: 'https://54hmmo3zqtgtsusj.public.blob.vercel-storage.com/avatar/Logo-yEeh50niFEmvdLeI2KrIUGzMc6VuWd-a48mfVnSsnjXMEaIOnYOTWIBFOJiB2.jpg',
            }}
            style={styles.User_Image}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Header: {
    height: 80,
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  Find: {
    backgroundColor: '#242424',
    gap: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 7,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  Divider: {
    width: 1,
    height: '50%',
    backgroundColor: '#353535',
    alignSelf: 'center',
  },
  MenuTextIos: {
    color: '#cccccc',
    fontSize: 8,
  },
  MenuTextAndroid: {
    color: '#cccccc',
    fontSize: 13,
  },
  MenuButton: {
    width: 40,
    height: '100%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextInputIos: {
    height: '100%',
    flex: 1,
    color: '#cccccc',
    paddingTop: '3%',
  },
  TextInputAndroid: {
    flex: 1,
    height: '100%',
    color: '#cccccc',
  },
  UserBox: {
    borderRadius: 25,
    width: 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  User_Image: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
  },
});
