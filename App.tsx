import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View, Dimensions } from "react-native";
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview';

StatusBar.setBackgroundColor("transparent");
StatusBar.setTranslucent(true);
StatusBar.setBarStyle("dark-content");

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class App extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar/>
        <View style={styles.scrollView}>
          <>
            <WebView 
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