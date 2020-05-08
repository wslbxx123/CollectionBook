/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';
import { Provider } from 'react-redux';
import { RootSiblingParent } from 'react-native-root-siblings'
import configureStore from './app/store/store';

const store = configureStore();

const RNRedux = () => {
    const Wrapper = Platform.OS === 'ios' ? React.Fragment : RootSiblingParent;
    return (
    <Provider store = { store }>
        <Wrapper>
            <App />
        </Wrapper>
    </Provider>
    );
};

AppRegistry.registerComponent(appName, () => RNRedux);
