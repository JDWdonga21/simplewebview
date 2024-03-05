import React, { Component, useRef } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Dimensions, BackHandler, TouchableOpacity, Text, Alert, Button } from "react-native";
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview';

StatusBar.setBackgroundColor("transparent");
StatusBar.setTranslucent(true);
StatusBar.setBarStyle("dark-content");

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class App extends Component {
  webView = React.createRef<WebView>();
  //webView = useRef();

  componentDidMount(): void {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
  }
  componentWillUnmount(): void {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
  }

  handleBackButton = () =>{
    if(this.webView.current && this.webView.current.goBack){
      console.log("웹 뒤로가기");
      Alert.alert(
        "<종료>", 
        "정말로 종료하시겠습니까?",
        [
          {
            text: "아니요",
            onPress: () => {},
            style: 'cancel'
          },
          {
            text: "예",
            onPress: this.handleExitButton,
          }],
          {cancelable: false}
      )
      this.webView.current.goBack();
      return true;
    }
    return false;
  }

  handleExitButton = () => {
    BackHandler.exitApp();
  } 
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar/>
        <View style={styles.scrollView}>
          {/* 앱 종료 버튼
          <TouchableOpacity style={styles.exitButton} onPress={this.handleExitButton}>
            <Text style={styles.exitButtonText} > 앱 종료 </Text>
          </TouchableOpacity> */}
          <>
            <WebView 
              ref={this.webView}
              style={{borderWidth: 0, borderColor: 'transparent'}}
              source={{ uri: 'https://webnotice.netlify.app/' }} 
            />
          </>
        </View>        
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0,
  },
  scrollView: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    borderWidth: 0,
    backgroundColor: 'red',
  },
  exitButton: {
    backgroundColor: 'red',
    padding: 10,
    margin: 10,
    alignItems: 'center',
  },
  exitButtonText: {
    color: 'white',
  }
})
export default App;