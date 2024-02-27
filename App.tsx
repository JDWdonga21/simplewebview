import React, { Component, useRef } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Dimensions, BackHandler } from "react-native";
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
      this.webView.current.goBack();
      return true;
    }
    return false;
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar/>
        <View style={styles.scrollView}>
          <>
            <WebView 
              ref={this.webView}
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
    flex: 1
  },
  scrollView: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
})
export default App;