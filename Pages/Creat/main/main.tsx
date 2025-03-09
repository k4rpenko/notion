import React, { useState } from 'react';
import {StyleSheet, TextInput, View } from 'react-native';

export default function Main({ title, setTitle, note, setNote }) {
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);


    return (
        <View style={styles.Main}>
            <View style={styles.TextInputView}>
                <TextInput
                style={styles.TextInputTitle}
                multiline
                placeholder="New page"
                value={title}
                onChangeText={setTitle}
                onFocus={() => setIsKeyboardVisible(true)}
                onBlur={() => setIsKeyboardVisible(false)}
                />
                <TextInput
                style={styles.TextInput}
                multiline
                placeholder=""
                value={note}
                onChangeText={setNote}
                onFocus={() => setIsKeyboardVisible(true)}
                onBlur={() => setIsKeyboardVisible(false)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Main: {
        flex: 1,
    },
    TextInputView: {
        flex: 1,
    },
    TextInputTitle: {
        fontFamily: 'Inter-Bold',
        color: '#cccccc',
        fontSize: 25,
        padding: 10,
    },
    TextInput: {
        fontFamily: 'InterDisplay-Regular',
        color: '#cccccc',
        height: '83%',
        width: '100%',
        borderColor: 'transparent',
        borderWidth: 1,
        padding: 10,
        fontSize: 18,
        textAlignVertical: 'top',
    },
});
