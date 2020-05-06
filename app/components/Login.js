import React, { Component, useState } from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    View,
    Text,
    TextInput,
    Button
} from 'react-native';

export function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function onPressSubmit() {

    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <TextInput placeholder="Username" 
                        style={styles.textInput}
                        onChangeText={setUsername} />
                    <TextInput placeholder="Password" 
                        style={styles.textInput}
                        onChangeText={setPassword}
                        secureTextEntry={true} />
                    <View style={styles.btnContainer}>
                        <Button title="Submit" onPress={onPressSubmit} />
                    </View>

                    <View style={{ flex : 1 }} />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    inner: {
      padding: 24,
      flex: 1,
      justifyContent: "flex-end"
    },
    textInput: {
      height: 40,
      borderColor: "#000000",
      borderBottomWidth: 1,
      marginBottom: 36
    },
    btnContainer: {
      backgroundColor: "white",
      marginTop: 12
    }
  });