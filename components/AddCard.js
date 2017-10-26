import React, { Component } from 'react'
import { View, TouchableOpacity, TextInput, StyleSheet, Platform } from 'react-native'
import TextButton from './TextButton'
import { addCardToDeck } from '../utils/helpers'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { NavigationActions } from 'react-navigation'

class AddCard extends Component {

    state = {
      question: '',
      answer: ''
    }

  static navigationOptions = ({ navigation }) => {
    // const { entryId } = navigation.state.params

    return {
      title: `Add Card`
    }
  }

  submit = () => {
    const { entryId, deck } = this.props

    let card = {
      question: this.state.question,
      answer: this.state.answer
    }

    this.props.dispatch(addCard(card, deck, entryId))

    addCardToDeck(card, deck, entryId)

    this.props.navigation.dispatch(NavigationActions.back())
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={(question) => this.setState({question})}
          value={this.state.question}
          placeholder={'Question'}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(answer) => this.setState({answer})}
          multiline={true}
          value={this.state.answer}
          placeholder={'Answer'}
        />
        <TextButton  onPress={this.submit} style={[styles.button]}>Submit</TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    marginTop: 50,
  },
  textInput: {
    height: 40,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 10,
    marginLeft: 70,
    marginRight: 70,
    marginTop: 30,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    }
  }
})

function mapStateToProps(decks, { navigation }) {
  const { entryId, deck } = navigation.state.params
  return {
    deck,
    decks,
    entryId,
  }
}

export default connect(mapStateToProps)(AddCard)
