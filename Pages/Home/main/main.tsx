import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Sound from 'react-native-sound';

import { deleteDataById } from '../../../data/Memory/Memory';
import SVG_folder_fill from '../../../assets/SVG-TS/folder-fill';
import SVG_unlock from '../../../assets/SVG-TS/unlock';
import SVG_lock from '../../../assets/SVG-TS/lock';
import SVG_note_fill from '../../../assets/SVG-TS/note-fill';
import NoteCache from '../../../data/Cache/NoteCache';
import { NoteFolder } from '../../../data/interface/NoteFolder.interface';
import ToDoCache from '../../../data/Cache/ToDoCache';
import stylesGlobal from '../../../style/GlobalColor';
import { ToDoFolder } from '../../../data/interface/ToDoFolder.interface';

export default function Main() {
  const navigation = useNavigation();
  const [ToDo, setToDo] = useState(ToDoCache.ToDos);
  const [LastToDo, setLastToDo] = useState(ToDoCache.ToDo);
  const [IdToDo, setIdToDo] = useState<ToDoFolder | null>(null);

  const [notes, setNotes] = useState(NoteCache.Notes);

  const [sound, setSound] = useState(null);
  const [audioList, setAudioList] = useState([
    { id: 1, title: 'Audio File 1', file: require('../../../assets/Audio/test.mp3') },
  ]);

  useEffect(() => {
    const updateNotes = (updatedNotes: NoteFolder[]) => setNotes(updatedNotes);
    const updateToDo = (updatedToDo: ToDoFolder[]) => setToDo(updatedToDo);
    const updateToDoSingle = (updatedToDoSingle: ToDoFolder | null) => setLastToDo(updatedToDoSingle);
  
    if (notes.length <= 0) {
      NoteCache.AddListener(updateNotes);
    }
    if (ToDo.length <= 0) {
      ToDoCache.AddListener(updateToDo);
    }
    if (LastToDo === null) {
      ToDoCache.AddSingleListener(updateToDoSingle);
    }

    Sound.setCategory('Playback');
  

    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, [notes, ToDo, LastToDo]);

  


  const playSound = (file) => {
    const soundInstance = new Sound(file, (error) => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }

      soundInstance.play((success) => {
        if (success) {
          console.log('Sound played successfully');
        } else {
          console.log('Playback failed due to audio decoding errors');
        }

        soundInstance.release();
      });
    });
  };

  const renderAudioItem = ({ item }) => (
    <View style={styles.audioItemContainer}>
      <Text style={styles.audioTitle}>{item.title}</Text>
      <TouchableOpacity style={styles.playButton} onPress={() => playSound(item.file)}>
        <Text style={styles.playButtonText}>Play</Text>
      </TouchableOpacity>
    </View>
  );

  const [tags, setTags] = useState([
    { id: 0, name: 'All notes', selected: true },
    { id: 1, name: 'Notes', selected: false },
    { id: 2, name: 'To do list', selected: false },
    { id: 3, name: 'Audio', selected: false },
  ]);

  const [dataBox, setDataBox] = useState([
    { id: 0, name: 'To do List', show: true, folder: "Last List", data: undefined },
    { id: 1, name: 'Audio', show: true, folder: "Last Audio", data: undefined },
    { id: 2, name: 'Picture', show: true, folder: "Last Picture", data: undefined },
  ]);


  const DeleteNote = (data: NoteFolder) => {
    deleteDataById(data.folder, data.id);
    NoteCache.Delete(data.id);
  };

  const toggleTag = (id: number) => {
    setTags((prevTags) => {
      if (id === 0) {
        return prevTags.map((tag) =>
          tag.id === 0
            ? { ...tag, selected: !tag.selected }
            : { ...tag, selected: false }
        );
      } else {
        return prevTags.map((tag) =>
          tag.id === id
            ? { ...tag, selected: !tag.selected }
            : tag.id === 0
              ? { ...tag, selected: false }
              : tag
        );
      }
    });
  };

  const ToggleDone = (id: number) => {
    setLastToDo((prevDoList) => {
      if (!prevDoList) return prevDoList;
      return {
        ...prevDoList,
        ToDo: prevDoList.ToDo.map((item) =>
          item.id === id ? { ...item, done: !item.done } : item
        ),
      };
    });
  };

  const OpenNote = (id: number) => {
    const type: string = 'Note';
    navigation.navigate('Creat', { id, type });
  };

  const renderTag = ({ item }) => (
    <TouchableOpacity style={[styles.tagButton, item.selected && styles.tagButtonSelected]} onPress={() => toggleTag(item.id)}>
      <Text style={[styles.tagText, item.selected && styles.tagTextSelected]}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderDoList = ({ item }) => (
    <TouchableOpacity style={[styles.doListItem, item.done && styles.doListItemDone]} onPress={() => ToggleDone(item.id)}>
      <View style={styles.doListItemContent}>
        <View style={[styles.doListCircle, item.done && styles.doListCircleDone]} />
        <Text style={[styles.doListText, item.done && styles.doListTextDone]}>{item.Text}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderDataBox = ({ item }) => (
    <View style={styles.DataBox}>
      <View style={styles.BoxHeader}>
        <View style={styles.BoxHeader_Folder}>
          <TouchableOpacity style={styles.BoxHeader_FolderOpen}><SVG_folder_fill color="#cccccc" /></TouchableOpacity>
          <Text style={styles.BoxHeader_FolderName}>{item.folder}</Text>
        </View>
        <TouchableOpacity style={styles.BoxHeader_Add}><Text style={styles.BoxHeader_AddText}>+</Text></TouchableOpacity>
      </View>
      {item.id === 0 && ToDo && (
        <FlatList
          data={LastToDo ? LastToDo.ToDo : []}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderDoList}
          contentContainerStyle={styles.TodoList}
        />
      )}
      {item.id === 1 && (
        <FlatList
          data={audioList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderAudioItem}
        />
      )}
      {/*item.id === 2 && (
        <FlatList
          data={pictureList} // Замініть на ваш список зображень
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPictureItem} // Замініть на вашу функцію рендеру зображень
          contentContainerStyle={styles.PictureList}
        />
      )*/}
    </View>
  );

  const renderHiddenItem = (data) => (
    <View style={styles.rowBack}>
      <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={() => console.log('More')}>
        <Text style={styles.backTextWhite}>More</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={() => DeleteNote(data)}>
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const renderNotes = ({ item, index }) => {
    if (index === 10) {
      return (
        <View style={styles.noteCardContainer}>
          <TouchableOpacity
            style={styles.noteCard}
            activeOpacity={1}
            onPress={() => {}}
          >
            <Text style={styles.noteTitle}>View more...</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <GestureHandlerRootView>
        <View style={styles.noteCardContainer}>
          <SwipeListView
            data={[item]}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.noteCard} activeOpacity={1} onPress={() => OpenNote(item.id)}>
                <View style={styles.noteCardButton}>
                  <View style={styles.noteCardContent}>
                    <SVG_note_fill color="#cccccc" size={'20px'} />
                    <Text style={styles.noteTitle}>{item.title}</Text>
                  </View>
                  <View style={styles.noteCardContent}>
                    <Text style={styles.noteTitle}>status</Text>
                    {item.public ? <SVG_unlock color="#cccccc" size="20px" /> : <SVG_lock color="#cccccc" size="20px" />}
                  </View>
                </View>
              </TouchableOpacity>
            )}
            renderHiddenItem={({ item }) => renderHiddenItem(item)}
            leftOpenValue={0}
            rightOpenValue={-115}
            stopRightSwipe={-115}
            stopLeftSwipe={0.000001}
          />
        </View>
      </GestureHandlerRootView>
    );
  };
  const notesToRender = notes.slice(0, 10);

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.Main}>
        <View style={styles.TopNotes_tegs}>
          <FlatList
            data={tags}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderTag}
            contentContainerStyle={styles.TegNotes}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
          <FlatList
            data={dataBox}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderDataBox}
            contentContainerStyle={styles.DataBoxs}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
          <View style={styles.NotesBox}>
            <Text style={styles.NotesBox_title}>Your Notes</Text>
            <FlatList
              data={notesToRender}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderNotes}
              contentContainerStyle={styles.NotesDataBox}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  Main: {
    flex: 1,
    paddingVertical: '3%',
  },
  TopNotes_tegs: {
    gap: 20,
  },

  // Tag
  TegNotes: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    gap: 10,
  },
  tagButton: {
    backgroundColor: '#212121',
    padding: 10,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#353535',
  },
  tagButtonSelected: {
    backgroundColor: '#3063E8',
  },
  tagText: {
    color: '#fff',
    fontFamily: 'InterDisplay-Medium',
    fontWeight: '500',
  },
  tagTextSelected: {
    fontFamily: 'InterDisplay-Medium',
    fontWeight: '700',
    color: '#fff',
  },

  // Box
  DataBoxs: {
    paddingHorizontal: 10,
    gap: 20,
  },
  DataBox: {
    gap: 25,
    padding: 10,
    backgroundColor: stylesGlobal.DataBox.backgroundColor,
    borderRadius: 15,
    height: 270,
  },
  BoxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 100,
  },
  BoxHeader_Folder: {
    gap: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },

  BoxHeader_FolderOpen: {
    padding: 5,
    backgroundColor: stylesGlobal.Buttons.backgroundColor,
    borderRadius: 12,
  },
  BoxHeader_FolderName: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 15,
    color: '#cccccc',
  },
  BoxHeader_Add: {
    paddingHorizontal: 13,
    paddingVertical: 7,
    backgroundColor: stylesGlobal.Buttons.backgroundColor,
    borderRadius: 12,
  },
  BoxHeader_AddText: {
    color: '#cccccc',
    fontFamily: 'Inter-Bold',
    fontWeight: 'bold',
    fontSize: 15,
  },
  TodoList: {

  },

  // DoList
  doListItem: {
    backgroundColor: stylesGlobal.Buttons.backgroundColor,
    padding: 8,
    borderRadius: 12,
    marginVertical: 5,
    flexDirection: 'row',
  },
  doListItemDone: {
    opacity: 0.5,
  },
  doListItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doListCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  doListCircleDone: {
    backgroundColor: '#fff',
  },
  doListIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  doListText: {
    color: '#cccccc',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  doListTextDone: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: '#888888',
  },

  NotesBox: {
    paddingBottom: 80,
    paddingHorizontal: 10,
    gap: 10,
    marginTop: '10%',
  },
  NotesBox_title: {
    color: '#cccccc',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
  },
  NotesDataBox: {
    gap: 5,
    width: '100%',
  },
  noteCardContainer: {
    marginVertical: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  noteCard: {
    backgroundColor: stylesGlobal.Buttons.backgroundColor,
    paddingVertical: 15,
    paddingHorizontal: 13,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  noteCardButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  noteCardContent: {
    flexDirection: 'row',
    gap: 10,
  },
  noteTitle: {
    color: '#cccccc',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
  },

  //rowBack
  rowBack: {
    height: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 60,
  },
  backRightBtnLeft: {
    backgroundColor: '#313131',
    right: 60,
  },
  backRightBtnRight: {
    backgroundColor: 'rgb(199,78,78)',
    right: 0,
  },
  backTextWhite: {
    color: '#FFF',
  },

  // Audio Item styles
  audioItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: stylesGlobal.Buttons.backgroundColor,
    borderRadius: 12,
    marginVertical: 5,
  },
  audioTitle: {
    color: '#cccccc',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  playButton: {
    backgroundColor: '#446AEF',
    padding: 10,
    borderRadius: 12,
  },
  playButtonText: {
    color: '#fff',
    fontFamily: 'Inter-Bold',
    fontWeight: 'bold',
    fontSize: 14,
  },
});