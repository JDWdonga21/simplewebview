import React, { Component } from 'react';
import { SafeAreaView, StatusBar } from "react-native";
import {SafeAreaProvider} from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview';

class App extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar/>
        <WebView 
          source={{ uri: 'https://webnotice.netlify.app/' }} 
        />
      </SafeAreaView>
    );
  }
}
export default App;