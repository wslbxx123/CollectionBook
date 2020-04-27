import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Button,
    Text
  } from 'react-native';
import { getLinkPreview } from 'link-preview-js';
import { addBookmark } from '../actions/bookmarkActions';
import { useDispatch } from 'react-redux';

export function BookmarkAdd() {
    const [link, setLink] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tag, setTag] = useState('');
    const dispatch = useDispatch();

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
        addBookmark(dispatch, bookmark);
    }

    return (
        <View style={styles.mainView}>
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
        height: '100%',
        flexDirection: "column"
    },
    addLinkView: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        width: '100%'
    },
    linkText: {
        backgroundColor: '#FFFFFF',
        marginRight: 10,
        flexGrow: 1
    },
    textInputView: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginTop: 10
    },
    textInput: {
        backgroundColor: '#FFFFFF',
        marginLeft: 10,
        flexGrow: 1
    },
    addButtonView: {
       marginTop: 10
    }
  });