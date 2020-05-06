import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    Alert
  } from 'react-native';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getBookmarks, deleteBookmark } from '../actions/bookmarkActions';
import { SwipeListView } from 'react-native-swipe-list-view';

export function Bookmarks(props) {
    const bookmarks = useSelector(state => state.bookmarks.data, shallowEqual);
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(false);
    const confirmDeleteAlert = (bookmark, rowMap) => {
        rowMap[bookmark.key].closeRow();
        Alert.alert(
            "",
            "Delete the selected bookmark?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => onPressDelete(bookmark.id)
                }
            ],
            
        )
    }

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

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

    function onPressDelete(Id) {
        deleteBookmark(dispatch, Id);
    }

    function onPressUpdate(bookmark, rowMap) {
        rowMap[bookmark.key].closeRow();
        props.navigation.navigate('BookmarkUpdate', {
            item: bookmark
        });
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        getBookmarks(dispatch).then(() => 
            setRefreshing(false));
    }, [refreshing]);

    const renderItem = data => (
        <View style={styles.itemContiner}
            key={data.item.id}>
            <TouchableOpacity 
                style={styles.itemFront}
                onPress={() => onPressBookmark(data.item)}>
                <Text style={styles.itemTitle} numberOfLines={1}>{data.item.title}</Text>
                <View style={styles.itemTagView}>
                    <Text style={styles.itemTag}>{data.item.tag}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );

    const renderHiddenItem = (data, rowMap) => (
        <View style={[styles.rowBack, styles.itemContiner]}>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => onPressUpdate(data.item, rowMap)}>
                <Text style={styles.backTextWhite}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => confirmDeleteAlert(data.item, rowMap)}>
                <Text style={styles.backTextWhite}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.mainView}>
            <TouchableWithoutFeedback onPress={onPressSearch}>
                <View style={styles.searchView}>
                    <Image style={styles.searchImage}
                        source={require('../assets/images/search_icon.png')}/>
                    <Text style={styles.searchText}>Search By Title, Tag or Content</Text>
                </View>
            </TouchableWithoutFeedback>
            <SwipeListView style={styles.scrollView}
                disableRightSwipe
                rightOpenValue={-150}
                data={bookmarks} 
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                onRefresh={onRefresh}
                refreshing={refreshing}
                onRowDidOpen={onRowDidOpen}
            />
            <TouchableOpacity onPress={onPressAdd} style={styles.addButton}>
                <Image source={require('../assets/images/add_icon.png')} style={styles.addImage}/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: '#EEF2F3',
        paddingTop: 20,
        paddingBottom: 20,
        height: '100%'
    },
    searchView: {
        marginLeft: 20,
        marginRight: 20,
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
    itemFront: {
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: '#FFFFFF',
        flex: 1,
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 10
    },
    itemContiner: {
        marginBottom: 15,
        flexDirection: 'row',
        backgroundColor: '#EEF2F3'
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
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
        borderRadius: 10
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
        borderRadius: 10
    }
  });