import React, {useEffect, useState} from 'react';
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    Image
  } from 'react-native';

export function Bookmark(props) {
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        setBookmarks([{id: 1, title: "title1"}, {id: 2, title: "title2"}]);
    });

    return (
        <ScrollView>
            {bookmarks.map(bookmark => (
                <View key={bookmark.id} style={styles.itemContiner}>
                    <Image source={{uri: 'https://reactjs.org/logo-og.png'}}
                        style={{width: 50, height: 50}} />
                    <Text style={styles.itemText}>{bookmark.title}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    itemContiner: {
        height: 60,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        flexDirection: 'row'
    },
    itemText: {
        textAlignVertical: 'center',
        marginLeft: 10
    }
  });