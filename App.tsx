import React, { useEffect } from 'react';
import { StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import ImmersiveMode from 'react-native-immersive-mode';
import TabView from './Components/Tabs/tabs';
import Auth from './Pages/auth/auth';
import NoteCache from './data/Cache/NoteCache';
import { deleteAllData, getAllData } from './data/Memory/Memory';
import ToDoCache from './data/Cache/ToDoCache';
import stylesGlobal from './style/GlobalColor';

ImmersiveMode.setBarColor(stylesGlobal.Buttons.backgroundColor);
StatusBar.setBackgroundColor(stylesGlobal.Topcontainer.color);
StatusBar.setBarStyle('light-content');

function App(): React.JSX.Element {

  useEffect(() => {
    const GetNotes = async () => {
      let AllNote = await getAllData();
      AllNote.forEach(element => {
        if(element.type === 'Note'){
          NoteCache.Add(element);
        }
        else if(element.type === 'ToDo'){
          ToDoCache.Add(element);
        }
      });
      //await deleteAllData();
    };
    GetNotes();
  }, []);
  
  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'background' || nextAppState === 'inactive') {
      NoteCache.Notes = [];
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <Auth />
      {/*<TabView />*/}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;