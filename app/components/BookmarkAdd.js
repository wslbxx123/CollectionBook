import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Button,
    Text,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    SafeAreaView
  } from 'react-native';
import { getLinkPreview } from 'link-preview-js';
import { addBookmark } from '../actions/bookmarkActions';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

export function BookmarkAdd(props) {
    const [link, setLink] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('');
    const dispatch = useDispatch();
    var error = useSelector(state => state.bookmarks.error, shallowEqual);

    function onPressExtract() {
        getLinkPreview(link)
            .then((data) => {
                setTitle(data.title);
                setDescription(data.description);
            });
    }

    function onPressAdd() {
        const bookmark = {
            title, description, tag, link
        }
        addBookmark(dispatch, bookmark).then(() => {
            props.navigation.navigate('Bookmarks', {
                message: error
            });
        });
    }

    return (
        <KeyboardAvoidingView style={styles.mainView}
            behavior={Platform.OS === "ios" ? "padding" : null}>
            <SafeAreaView style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        <View style={styles.addLinkView}>
                            <Button color="#58B9A1" title="Extract" onPress={onPressExtract}/>
                            <TextInput style={styles.linkText}
                                onChangeText={setLink}
                                placeholder="Copy link here"
                                value={link} />
                        </View>

                        <View style={styles.textInputView}>
                            <Text>Title: </Text>
                            <TextInput style={styles.textInput}
                                onChangeText={setTitle}
                                value={title} />
                        </View>

                        <View style={styles.textInputView}>
                            <Text>Description: </Text>
                            <TextInput multiline
                                style={styles.textInput}
                                onChangeText={setDescription}
                                value={description} />
                        </View>

                        <View style={styles.textInputView}>
                            <Text>Tag: </Text>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={setTag}
                                value={tag} />
                        </View>

                        <View style={styles.addButtonView}>
                            <Button color="#58B9A1"
                                title="Add" onPress={onPressAdd} />
                        </View>

                        <View style={{ flex : 1 }} />
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        flex: 1,
        justifyContent: "flex-end",
    },
    mainView: {
        backgroundColor: '#EEF2F3',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        flexDirection: "column",
        flex: 1
    },
    addLinkView: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        width: '100%',
        height: 40
    },
    linkText: {
        backgroundColor: '#FFFFFF',
        marginRight: 10,
        flex: 1
    },
    textInputView: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginTop: 10,
        height: 40
    },
    textInput: {
        backgroundColor: '#FFFFFF',
        marginLeft: 10,
        flex: 1,
        borderRadius: 10
    },
    addButtonView: {
       marginTop: 10
    }
  });