import React, { Component, useRef } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Dimensions, BackHandler, KeyboardAvoidingView, Text, Alert, Button, Platform, Appearance } from "react-native";
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview';

if(Platform.OS === 'android'){
  StatusBar.setBackgroundColor("transparent");
  StatusBar.setTranslucent(true);
  
}

StatusBar.setBarStyle("dark-content");

//const windowWidth = Dimensions.get('window').width;
//const windowHeight = Dimensions.get('window').height;
interface appProps{

}
interface appType {
  darkMode : any
}
class App extends Component <appProps, appType> {
  webView = React.createRef<WebView>();
  //webView = useRef();
  constructor(appProps : appProps){
    super(appProps);
    this.state = {
      darkMode : Appearance.getColorScheme() === 'dark',
    }
  }

  componentDidMount(): void {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
    //시스템 컬러 스키마 변경 리스너
    // Appearance.addChangeListener(({colorScheme}) => {
    //   this.setState({ darkMode: colorScheme === 'dark' });
    //   this.updateStatusBarStyle(colorScheme === 'dark');
    // });
    Appearance.addChangeListener(this.handleAppearanceChange);
  }
  componentWillUnmount(): void {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
    //Appearance.removeChangeListener(this.handleAppearanceChange);
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

  handleAppearanceChange = ( colorScheme : any ) => {
    this.setState({ darkMode: colorScheme === 'dark' });
  }
  
  handleWebViewMessage = (event : any) => {
    const message = JSON.parse(event.nativeEvent.data);
    if (message.isdarkTheme !== undefined) {
      this.setState({ darkMode: message.isdarkTheme });
      // 필요한 경우 StatusBar 스타일 변경
      StatusBar.setBarStyle(message.isdarkTheme ? 'light-content' : 'dark-content');
    }
  }

  updateStatusBarStyle = (_isDarkMode : any) => {
    StatusBar.setBarStyle(_isDarkMode ? "light-content" : "dark-content");
    StatusBar.setBackgroundColor(_isDarkMode ? "#1e1e1e" : "#ffc519");
  }

  handleExitButton = () => {
    BackHandler.exitApp();
  } 
  render() {
    const { darkMode } = this.state;
    // const injectedJavaScript = `
    //   document.body.classList.toggle('dark-mode', ${darkMode});
    // `;
    //this.updateStatusBarStyle(darkMode);
    StatusBar.setBarStyle(darkMode ? 'light-content' : 'dark-content');
    return (
      <SafeAreaView style={[styles.container, {backgroundColor: darkMode? '#1e1e1e' : '#ffc519'}]}>
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
              // injectedJavaScript={injectedJavaScript}
              onMessage={this.handleWebViewMessage}
            />
          </>
        </KeyboardAvoidingView>        
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container:{
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