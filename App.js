import React, { useRef } from "react";
import { WebView } from "react-native-webview";
import { View, TouchableOpacity, Text, Alert, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const WebViewScreen = ({ }) => {
  // 웹뷰에서 데이터 받기
  const onMessage = (e) => {
    storeData(e.nativeEvent.data);
    //Alert.alert(e.nativeEvent.data);
  };

  // RN에서 웹뷰로 데이터 보내기
  const webViewRef = useRef()

  const sendMessage = (e) => {
    webViewRef.current.postMessage('RN에서 데이터 전송');
  };

  return (
    <View style={styles.container}>
        <WebView
            ref={webViewRef}
            source={{uri: 'http://localhost:8080/webview'}}
            onMessage={onMessage}
        />
        <View style={styles.container}>
            <TouchableOpacity onPress={sendMessage}>
                <Text>RN에서 데이터 전송</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.container}>
            <TouchableOpacity onPress={getData}>
                <Text>AsyncStorage에서 key 값 꺼내기</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};
export default WebViewScreen;

// 저장
const storeData = async data => {
  try {
    await AsyncStorage.setItem('key', JSON.stringify(data));
    Alert.alert(data);
  } catch (e) {
    // saving error
  }
}

// 불러오기
const getData = async () => {
  try {
    const loadedData = await AsyncStorage.getItem('key');
    Alert.alert(JSON.parse(loadedData));
  } catch(e) {
    // error reading value
  }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
    }
})