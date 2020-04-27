import React, { useEffect } from 'react';
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image
  } from 'react-native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getBookmarks } from '../actions/bookmarkActions';

export function Bookmarks(props) {
    const bookmarks = useSelector(state => state.bookmarks.data, shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        getBookmarks(dispatch);
    }, []);

    function onPressBookmark(bookmark) {
        props.navigation.navigate('BookmarkPreview', {
            itemId: bookmark.id,
            itemLink: bookmark.link
        });
    }
    
    function onPressSearch() {
        props.navigation.navigate('BookmarkSearch');
    }

    function onPressAdd() {
        props.navigation.navigate('BookmarkAdd');
    }

    return (
        <View style={styles.mainView}>
            <TouchableWithoutFeedback onPress={onPressSearch}>
                <View style={styles.searchView}>
                    <Image style={styles.searchImage}
                        source={require('../assets/images/search_icon.png')}/>
                    <Text style={styles.searchText}>Search By Title, Tag or Content</Text>
                </View>
            </TouchableWithoutFeedback>
            <ScrollView style={styles.scrollView}>
                {bookmarks.map(bookmark => (
                    <TouchableOpacity key={bookmark.id}
                        style={styles.itemContiner}
                        onPress={() => onPressBookmark(bookmark)}>
                        <View>
                            <Text style={styles.itemTitle} numberOfLines={1}>{bookmark.title}</Text>
                            <View style={styles.itemTagView}>
                                <Text style={styles.itemTag}>{bookmark.tag}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <TouchableOpacity onPress={onPressAdd} style={styles.addButton}>
                <Image source={require('../assets/images/add_icon.png')} style={styles.addImage}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: '#EEF2F3',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        height: '100%'
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
        marginRight: 10,
        color: '#c6c6c6'
    },
    searchImage: {
        width: 25,
        height: 25,
        zIndex: 1
    },
    scrollView: {
        marginTop: 20
    },
    addButton: {
        position: "absolute",
        right: 25,
        bottom: 25
    },
    addImage: {
        width: 25,
        height: 25
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