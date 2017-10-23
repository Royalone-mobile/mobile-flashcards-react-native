import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'

class Quiz extends Component {

  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params

    return {
      title: `Quiz`
    }
  }

  render() {
    return (
      <View>
        <Text>Quiz</Text>
      </View>
    )
  }
}

export default Quiz
