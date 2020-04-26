import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput
  } from 'react-native';
import Hightlighter from 'react-native-highlight-words';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getBookmarks } from '../actions/bookmarkActions';

export function BookmarkSearch(props) {
    var bookmarks = useSelector(state => state.bookmarks.data, shallowEqual);
    const dispatch = useDispatch();
    const [filteredBookmarks, setFilteredBookmarks] = useState([]);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        getBookmarks(dispatch);
    }, []);

    function onPressBookmark(bookmark) {
        props.navigation.navigate('BookmarkPreview', {
            itemId: bookmark.id,
            itemLink: bookmark.link
        });
    }

    function onChangeSearchText(text) {
        setFilteredBookmarks(bookmarks.filter(bookmark => 
            bookmark.title.toLowerCase().includes(text.toLowerCase() ||
            bookmark.tag.toLowerCase().includes(text.toLowerCase()) )));
        setKeyword(text);
    }

    return (
        <View style={styles.mainView}>
            <View style={styles.searchView}>
                <Image style={styles.searchImage}
                    source={require('../assets/images/search_icon.png')}/>
                <TextInput style={styles.searchText} onChangeText={onChangeSearchText}/>
            </View>
            <ScrollView style={styles.scrollView}>
                {filteredBookmarks.map(bookmark => (
                    <TouchableOpacity key={bookmark.id}
                        style={styles.itemContiner}
                        onPress={() => onPressBookmark(bookmark)}>
                        <View>
                            <Hightlighter style={styles.itemTitle}
                                highlightStyle={{backgroundColor: 'yellow'}}
                                textToHighlight={bookmark.title} searchWords={[keyword]}/>
                            <View style={styles.itemTagView}>
                                <Hightlighter style={styles.itemTag}
                                    highlightStyle={{backgroundColor: 'yellow'}}
                                    textToHighlight={bookmark.tag} searchWords={[keyword]}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: '#EEF2F3',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20
    },
    searchView: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        fontSize: 15,
        height: 40,
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchText: {
        marginLeft: 10,
        marginRight: 10
    },
    searchImage: {
        width: 25,
        height: 25
    },
    scrollView: {
        marginTop: 20
    },
    itemContiner: {
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 15,
        paddingBottom: 15,
        marginBottom: 15,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 10
    },
    itemTitle: {
        textAlignVertical: 'center',
        marginLeft: 10,
        fontWeight: "bold",
        fontSize: 15
    },
    itemTagView: {
        textAlignVertical: 'center',
        marginLeft: 10,
        marginTop: 10,
        backgroundColor: '#58B9A1',
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 10,
        alignSelf:'flex-start'
    },
    itemTag: {
        color: '#FFFFFF',
        fontSize: 12
    }
  });