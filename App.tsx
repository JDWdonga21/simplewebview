import React, { Component, useRef } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Dimensions, BackHandler, KeyboardAvoidingView, Text, Alert, Button, Platform } from "react-native";
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview';

if(Platform.OS === 'android'){
  StatusBar.setBackgroundColor("transparent");
  StatusBar.setTranslucent(true);
  
}

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
        <KeyboardAvoidingView 
          style={styles.flexContainer}
          behavior={Platform.OS === "ios" ? "padding" : "padding"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
          enabled
        >
          <>
            <WebView 
              ref={this.webView}
              style={{borderWidth: 0, borderColor: 'transparent'}}
              source={{ uri: 'https://webnotice.netlify.app/' }} 
            />
          </>
        </KeyboardAvoidingView>        
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0,
  },
  flexContainer: {
    flex: 1,
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