import React, { useRef, useEffect } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, View, TouchableOpacity, FlatList } from 'react-native';
import SVG_lock from '../../../assets/SVG-TS/lock';
import { ToDoContent } from '../../../data/interface/ToDoFolder.interface';
import { getLastId } from '../../../data/Memory/Memory';


export default function ToDo({ ToDoContent, setToDoContent }) {
  const textInputRefs = useRef<Map<number, TextInput>>(new Map());

  useEffect(() => {
    const hasNonZeroId = ToDoContent.some(u => u.id !== 0);
    if (!hasNonZeroId && ToDoContent.length === 0) {
        const initialToDo: ToDoContent = {
            id: 0,
            ColorCircle: '',
            Text: '',
            done: false,
        };
        setToDoContent([initialToDo]);
    }
}, [ToDoContent]);

  const createToDo = () => {
    const newToDo: ToDoContent = {
      id: ToDoContent.length,
      ColorCircle: '#cccccc',
      Text: '',
      done: false,
    };

    setToDoContent((prevArray) => [newToDo, ...prevArray]);

    setTimeout(() => {
      const newToDoRef = textInputRefs.current.get(newToDo.id);
      if (newToDoRef) {
        newToDoRef.focus();
      }
    }, 100);
  };

  const renderToDoList = ({ item }: { item: ToDoContent }) => (
    <View>
      {item.id === 0 ? (
        <TouchableOpacity
          style={[styles.doListItem, { opacity: 0.6, paddingVertical: 18, paddingHorizontal: 15 }]}
          onPress={createToDo}
        >
          <View style={styles.doListItemContent}>
            <View style={[styles.doListCircle, { backgroundColor: '#cccccc', borderColor: '#cccccc' }]} />
            <Text style={[styles.doListText, { paddingHorizontal: 5 }]}>Your to do</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.doListItem}>
          <View style={styles.doListItemContent}>
            <View
              style={[styles.doListCircle, { backgroundColor: item.ColorCircle, borderColor: item.ColorCircle }]}
            />
            <TextInput
              ref={(ref) => {
                if (ref) {
                  textInputRefs.current.set(item.id, ref);
                } else {
                  textInputRefs.current.delete(item.id);
                }
              }}
              style={styles.doListText}
              value={item.Text}
              onChangeText={(text) =>
                setToDoContent((prevArray) =>
                  prevArray.map((todo) => (todo.id === item.id ? { ...todo, Text: text } : todo))
                )
              }
              placeholder="Type your task here"
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.Header}>
        <TouchableOpacity style={styles.HeaderStatus}>
          <Text style={styles.HeaderText}>Status </Text>
          <SVG_lock size={25} color="#cccccc" />
        </TouchableOpacity>
      </View>
      <View style={styles.Main}>
        <FlatList
          data={ToDoContent}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderToDoList}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
  },
  listContainer: {
    paddingBottom: 110,
  },

  text: {
    fontSize: 25,
  },
  Header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  HeaderText: {
    color: '#cccccc',
    fontSize: 17,
    fontFamily: 'OpenSans-SemiBold',
  },
  HeaderStatus: {
    alignItems: 'center',
    padding: 5,
    flexDirection: 'row',
  },
  HeaderAdded: {
    padding: 5,
  },
  Main: {
    marginTop: 20,
  },

  // DoList
  doListItem: {
    backgroundColor: '#212121',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
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
    marginRight: 20,
    backgroundColor: 'transparent',
  },
  doListIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  doListText: {
    width: '100%',
    color: '#cccccc',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  doListTextDone: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: '#888888',
  },
});
