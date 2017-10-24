import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { white, gray, black, purple } from '../utils/colors'
import AddCard from './AddCard'
import Quiz from './Quiz'

class Cards extends Component {

  static navigationOptions = ({ navigation }) => {
    const { entryId, title } = navigation.state.params

    return {
      title: `${title}`
    }
  }

  render() {
    const deck = this.props.decks[this.props.entryId]
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.subTitle}>{deck.cards !== undefined
            ? deck.cards.length
            : 0 } Cards</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={{flex: 1}}>
            <TextButton  onPress={() => this.props.navigation.navigate(
                'AddCard',
                {
                  entryId: this.props.entryId,
                  deck: deck,
                }
              )}
              style={[styles.button, styles.addButton]}>Add Card</TextButton>
            <TextButton  onPress={() => this.props.navigation.navigate(
                'Quiz',
                {
                  entryId: this.props.entryId,
                  deck: deck,
                }
              )} style={[styles.button, styles.quizButton]}>Start Quiz</TextButton>
          </View>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
  infoContainer: {
    flex: 1,
    backgroundColor: white,
    marginTop: 50,
    marginBottom: 50,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 30,
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
  },
  button: {
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 10,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 5,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    }
  },
  addButton: {
    color: purple,
    backgroundColor: white,
    borderStyle: 'solid',
    borderColor: purple,
    borderWidth: 1,
  },
  quizButton: {
    color: white,
    backgroundColor: purple
  }
})

function mapStateToProps(decks, { navigation }) {
  const { entryId } = navigation.state.params
  return {
    decks,
    entryId
  }
}

export default connect(mapStateToProps)(Cards)
