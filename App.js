import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Record from './components/exercises/reps';
import ExercisePage from './components/exercises/exercise'


// type Props = {};
export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ExercisePage />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F5FCFF',
  }
});
