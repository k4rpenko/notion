import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SVG_folder_fill from '../../../assets/SVG-TS/folder-fill';

interface HeaderProps {
  Save: () => void;
  New: () => void;
  id?: number; 
}

export default function Header({ Save, New, id }: HeaderProps) {
  return (
    <View style={styles.Header}>
      <View style={styles.Folder_ButtonBox}>
        <View style={styles.Folder}>
          <TouchableOpacity style={styles.FolderSVG}>
            <SVG_folder_fill color="#cccccc" />
          </TouchableOpacity>
          <Text style={styles.FolderText}>Folder</Text>
        </View>
        <View style={styles.ButtonBox}>
          {id !== undefined && id !== 0 && (
            <TouchableOpacity style={styles.ButtonDone} onPress={New}>
              <Text>New notes</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.ButtonMenu}>
            <Text style={styles.ButtonMenuText}>●●●</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ButtonDone} onPress={Save}>
            <Text>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Header: {
    padding: 10,
  },
  Folder_ButtonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Folder: {
    padding: 10,
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  FolderSVG: {
    padding: 5,
    backgroundColor: '#212121',
    borderRadius: 10,
  },
  FolderText: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 15,
    color: '#cccccc',
  },
  ButtonBox: {
    gap: 20,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ButtonDone: {
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: '#cccccc',
    borderRadius: 20,
  },
  ButtonMenu: {
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  ButtonMenuText: {
    fontFamily: 'OpenSans-SemiBold',
    color: '#cccccc',
    fontSize: 9,
  },
});