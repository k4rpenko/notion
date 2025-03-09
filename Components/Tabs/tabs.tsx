import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Keyboard } from 'react-native';

import Home from '../../Pages/Home/Home';
import Archive from '../../Pages/Archive/Archive';
import SVG_home from '../../assets/SVG-TS/home';
import SVG_folder from '../../assets/SVG-TS/folder';
import SVG_home_fill from '../../assets/SVG-TS/home-fill';
import SVG_folder_fill from '../../assets/SVG-TS/folder-fill';
import Creat from '../../Pages/Creat/Creat';
import SVG_make from '../../assets/SVG-TS/make';
import SVG_make_fill from '../../assets/SVG-TS/make-fill';
import SVG_book_fill from '../../assets/SVG-TS/book-fill';
import SVG_book from '../../assets/SVG-TS/book';
import { Note } from '../../data/interface/Note.interface';
import Mockup from '../../Pages/Mockup/Mockup';
import stylesGlobal from '../../style/GlobalColor';


const Tab = createBottomTabNavigator();

const TabBarIcon = ({ route, focused }) => {
  const color = '#cccccc';
  if (route.name === 'Home') {
    return focused ? <SVG_home_fill color={color} /> : <SVG_home color={color} />;
  } else if (route.name === 'Mockup') {
    return focused ? <SVG_book_fill color={color} /> : <SVG_book color={color} />;
  } else if (route.name === 'Creat') {
    return focused ? <SVG_make_fill color={color} /> : <SVG_make color={color} />;
  } else if (route.name === 'Archive') {
    return focused ? <SVG_folder_fill color={color} /> : <SVG_folder color={color} />;
  }
  return null;
};

export default function TabView() {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
    });

    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: props => TabBarIcon({ route, ...props }),
          tabBarLabel: () => null,
          tabBarItemStyle: {
            paddingTop: "4%",
          },
          tabBarStyle: {
            position: 'absolute',
            height: 70,
            backgroundColor: stylesGlobal.Buttons.backgroundColor,
            borderColor: '#2b2b2b',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            display: isKeyboardVisible ? 'none' : 'flex',
            elevation: 0,
            shadowOpacity: 0,
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Mockup" component={Mockup} />
        <Tab.Screen name="Creat" component={Creat} initialParams={{type: 'Note'}}/>
        <Tab.Screen name="Archive" component={Archive} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}