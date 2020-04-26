import * as React from 'react';
import { WebView } from 'react-native-webview';

export function BookmarkPreview(props) {
    const { itemLink } = props.route.params;

    return (
        <WebView
            source={{uri: itemLink}}
            style={{marginTop: 20}}
        />
    );
}