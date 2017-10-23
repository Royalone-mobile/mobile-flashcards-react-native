import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, ScrollView } from 'react-native'
import { gray, purple, white } from '../utils/colors'
import Cards from './Cards'

class Decks extends Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.container}>

          <TouchableOpacity onPress={() => this.props.navigation.navigate(
              'Cards',
              { entryId: 'key'}
            )}
            style={styles.deck}>
              <Text style={styles.title}>Decks</Text>
              <Text style={styles.subTitle}>12 Cards</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between'
  },
  deck: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    }
  },
  title: {
    justifyContent: 'center',
    fontSize: 50,
    textAlign: 'center',
  },
  subTitle: {
    justifyContent: 'center',
    fontSize: 14,
    textAlign: 'center',
    color: gray,
  }
})


export default Decks
