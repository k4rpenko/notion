import React, { useState, useEffect } from 'react';
import { Alert, SafeAreaView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Main from './main/main';
import stylesGlobal from '../../style/GlobalColor';
import Header from './header/header';
import { getLastId, saveToStorage } from '../../data/Memory/Memory';

import NoteCache from '../../data/Cache/NoteCache';
import ToDo from '../../Components/Creat/To_do/ToDo';
import { NoteFolder } from '../../data/interface/NoteFolder.interface';
import { ToDoContent, ToDoFolder } from '../../data/interface/ToDoFolder.interface';
import ToDoCache from '../../data/Cache/ToDoCache';

type RootStackParamList = {
  Creat: { id?: number; type?: string };
};

export default function Creat() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'Creat'>>();
  const { id, type } = route.params ?? {};
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [publicNote, setPublicNote] = useState(false);
  const [openNote, setOpenNote] = useState<NoteFolder | null>(null);
  const [ToDoContent, setToDoContent] = useState<ToDoContent[]>([]);
  const [openToDo, setOpenToDo] = useState<ToDoFolder | null>(null);

  useEffect(() => {
    if (id !== undefined) {
      const existingNote = NoteCache.GetId(id);
      if (existingNote) {
        setOpenNote(existingNote);
        setTitle(existingNote.title);
        setNote(existingNote.content);
      }
      const updateNotes = (updatedNotes: NoteFolder[]) => {
        const noteToUpdate = updatedNotes.find(note => note.id === id);
        if (noteToUpdate) {
          setOpenNote(noteToUpdate);
          setTitle(noteToUpdate.title);
          setNote(noteToUpdate.content);
        }
      };
      NoteCache.AddListener(updateNotes);
      return () => {
        NoteCache.RemoveListener(updateNotes);
      };
    } else {
      setTitle('');
      setNote('');
      setOpenNote(null);
      navigation.setParams({ id: undefined, type: type });
    }
  }, [id]);


  const Save = async () => {
    try {
      if(type === "Note"){
        if (note !== '' || title !== '') {
          let Note: NoteFolder;
          let lastId = await getLastId() + 1;
          if (openNote === null) {
            Note = {
              type: 'Note',
              folder: 'Main',
              id: lastId,
              title: title === '' ? 'New page' : title,
              content: note,
              public: publicNote,
              created_at: new Date(),
              update_at: new Date(),
            };
          } else {
            Note = {
              type: 'Note',
              folder: 'Main',
              id: openNote.id,
              title: title === '' ? openNote.title : title,
              content: note,
              public: publicNote,
              update_at: new Date(),
            };
          }
          setTitle('');
          setNote('');
          await saveToStorage(Note);
          if (openNote === null) {
            NoteCache.Add(Note);
          } else {
            NoteCache.Change(Note);
          }
          navigation.navigate('Home');
        }
      }
      else if (type === 'ToDo'){
        navigation.navigate('Home');
        const filteredToDoContent = ToDoContent.filter(u => u.Text !== '' && u.id !== 0);
        if(filteredToDoContent.length >= 1 && filteredToDoContent[0].Text != ''){
          let ToDo: ToDoFolder;
          let lastId = await getLastId() + 1;
          if (openToDo === null) {
            ToDo = {
              type: 'ToDo',
              folder: 'Main',
              id: lastId,
              ToDo: filteredToDoContent,
              public: publicNote,
              created_at: new Date(),
              update_at: new Date(),
            };
            ToDoCache.Add(ToDo);
          } else {
            ToDo = {
              type: 'ToDo',
              folder: 'Main',
              id: openToDo!.id,
              ToDo: filteredToDoContent,
              public: publicNote,
              update_at: new Date(),
            };
            ToDoCache.Change(ToDo);
          }
          await saveToStorage(ToDo);
          setToDoContent([]);
          setOpenToDo(null);
        }
      }
    } catch (error) {
      Alert.alert("Error", "Something happened while saving");
    }
  }


  const New = () => {
    setTitle('');
    setNote('');
    setOpenNote(null);
    navigation.setParams({ id: undefined, type: 'Note' });
  };

  const renderMainComponent = () => {
    switch (type) {
      case 'Note':
        return <Main title={title} setTitle={setTitle} note={note} setNote={setNote} />;
      case 'ToDo':
        return <ToDo ToDoContent={ToDoContent} setToDoContent={setToDoContent}/>;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={stylesGlobal.container}>
      <Header Save={Save} New={New} id={openNote?.id} />
      {renderMainComponent()}
    </SafeAreaView>
  );
}