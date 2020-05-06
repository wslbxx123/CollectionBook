import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { Bookmarks } from './Bookmarks';
import { BookmarkPreview } from './BookmarkPreview';
import { BookmarkSearch } from './BookmarkSearch';
import { BookmarkAdd } from './BookmarkAdd';
import { BookmarkUpdate } from './BookmarkUpdate';

const Stack = createStackNavigator();

export function PageStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Bookmarks">
                <Stack.Screen name="Bookmarks" component={Bookmarks}/>
                <Stack.Screen name="BookmarkPreview" component={BookmarkPreview} />
                <Stack.Screen name="BookmarkSearch" component={BookmarkSearch} />
                <Stack.Screen name="BookmarkAdd" component={BookmarkAdd} />
                <Stack.Screen name="BookmarkUpdate" component={BookmarkUpdate} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}