import React, { useState, useEffect } from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    View,
    TextInput,
    Button
} from 'react-native';
import { login } from '../actions/userActions';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Loading } from './Loading';

export function Login(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const ifLogin = useSelector(state => state.user.login, shallowEqual);
    const loading = useSelector(state => state.user.loading, shallowEqual);

    useEffect(() => {
        if(ifLogin)
            props.navigation.navigate('Bookmarks');
    }, [ifLogin]);

    function onPressSubmit() {
        const loginInfo = {
            userName, password
        };
        login(dispatch, loginInfo);
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <TextInput placeholder="User Name" 
                        style={styles.textInput}
                        onChangeText={setUserName} />
                    <TextInput placeholder="Password" 
                        style={styles.textInput}
                        onChangeText={setPassword}
                        secureTextEntry={true} />
                    <View style={styles.btnContainer}>
                        <Button title="Submit" 
                            color="#58B9A1" 
                            onPress={onPressSubmit} />
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