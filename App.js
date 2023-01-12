import React, { useRef } from "react";
import { WebView } from "react-native-webview";
import { View, TouchableOpacity, Text, Alert } from "react-native";

const WebViewScreen = ({ }) => {
  //웹뷰에서 데이터 받기
  const onMessage = (e) => {
    console.log(e.nativeEvent.data);
    Alert.alert(e.nativeEvent.data);
  };

  //RN에서 웹뷰로 데이터 보내기
  const webViewRef = useRef()

  const sendMessage = (e) => {
    webViewRef.current.postMessage('RN에서 데이터 전송');
  };

  return (
    <View style={{flex: 1}}>
        <WebView
            ref={webViewRef}
            source={{uri: 'http://localhost:8480/webview'}}
            onMessage={onMessage}
        />
        <View style={{flex: 1}}>
            <TouchableOpacity onPress={sendMessage}>
                <Text>RN에서 데이터 전송</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default WebViewScreen;