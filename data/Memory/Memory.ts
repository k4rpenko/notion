import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { NoteFolder } from '../interface/NoteFolder.interface';
import { ToDoFolder } from '../interface/ToDoFolder.interface';
type TYPE = NoteFolder | ToDoFolder;

export const saveToStorage = async (data: TYPE) => {
    try {
        const key = `${data.folder}/${data.id}`;
        await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        Alert.alert("Error saving data", "Something happened while saving the data. It is recommended to restart the program.");
    }
};


export const getData = async (folder: string, id: number): Promise<any | null> => {
    try {
        const key = `${folder}/${id}`;
        const data = await AsyncStorage.getItem(key);
        return data !== null ? data : null;
    } catch (e) {
        Alert.alert("Error retrieving data", "Something happened while retrieving the data. It is recommended to restart the program.");
        return null;
    }
};


export const getAllDataFromFolder = async (folder: string): Promise<TYPE[]> => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const folderKeys = keys.filter(key => key.startsWith(`${folder}/`));
        const dataList: TYPE[] = [];
        for (const key of folderKeys) {
            const dataString = await AsyncStorage.getItem(key);
            if (dataString != null) {
                const data = JSON.parse(dataString);
                dataList.push(data);
            }
        }
        return dataList;
    } catch (e) {
        Alert.alert("Error retrieving data", "Something happened while retrieving the data. It is recommended to restart the program.");
        return [];
    }
};

export const getAllData = async (): Promise<TYPE[]> => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const dataList: TYPE[] = [];
        for (const key of keys) {
            const dataString = await AsyncStorage.getItem(key);
            if (dataString != null) {
                const data = JSON.parse(dataString);
                dataList.push(data);
            }
        }
        return dataList;
    } catch (e) {
        Alert.alert("Error retrieving data", "Something happened while retrieving the data. It is recommended to restart the program.");
        return [];
    }
};

export const getLastId = async (): Promise<number> => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const ids = keys
            .map((key) => parseInt(key.split('/')[1]))
            .filter((id) => !isNaN(id));
        return ids.length > 0 ? Math.max(...ids) : 0;
    } catch (e) {
        Alert.alert(
            "Error retrieving last ID",
            "Something happened while retrieving the last ID. It is recommended to restart the program."
        );
        return -1;
    }
};



export const deleteDataById = async (folder: string, id: number) => {
    try {
        const key = `${folder}/${id}`;
        await AsyncStorage.removeItem(key);
    } catch (e) {
        Alert.alert("Error deleting data", "Something happened while deleting the data. It is recommended to restart the program.");
    }
};

export const deleteAllData = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
    } catch (e) {
        Alert.alert(
            "Error deleting data",
            "Something happened while deleting the data. It is recommended to restart the program."
        );
    }
};
