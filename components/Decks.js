import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'

import { gray, purple, white } from '../utils/colors'
import { fetchDecks } from '../utils/helpers'
import { receiveDecks } from '../actions'
import Cards from './Cards'

class Decks extends Component {

  componentDidMount() {
    const { dispatch } = this.props

    fetchDecks()
      .then((decks) => {
        alert(JSON.stringify(decks))
        dispatch(receiveDecks(decks))
      } )
  }

  render() {
    const { decks } = this.props

    return (
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.container}>
          {Object.keys(decks).map((key) => {
            return(
              <TouchableOpacity key={key} onPress={() => this.props.navigation.navigate(
                  'Cards',
                  { entryId: key, title: decks[key].title}
                )}
                style={styles.deck}>
                  <Text style={styles.title}>{decks[key].title}</Text>
                  <Text style={styles.subTitle}>
                    {decks[key].cards !== undefined
                      ? decks[key].cards.length
                      : 0 } Cards
                  </Text>
              </TouchableOpacity>
            )
          })}

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

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Decks)
