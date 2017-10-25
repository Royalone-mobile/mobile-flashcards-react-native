import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, Easing } from 'react-native'
import { connect } from 'react-redux'
import TextButton from './TextButton'
import { white, red, green } from '../utils/colors'
import FlipView from 'react-native-flip-view-next'
import { NavigationActions } from 'react-navigation'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

// TODO: Edit and Delete Options
class Quiz extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false,
      score: 0,
      cardNo: 0,
      TotalCard: 0,
      currentCard: {},
    }
  }

  componentDidMount() {
    const { deck } = this.props

    // TODO: collect wrong and correct answer
    this.setState({
      isFlipped: false,
      score: 0,
      cardNo: 1,
      TotalCard: deck.cards.length,
      currentCard: deck.cards.length > 0 ? deck.cards[0] : {},
    })
  }

  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params

    return {
      title: `Quiz`
    }
  }

  correct = () => {

    this.next(1)
  }

  // TODO: collect wrong answer
  incorrect = () => {

    this.next(0)
  }

  next = (mark) => {

    if(this.state.cardNo >= this.state.TotalCard ){
      this.showScore(this.state.score + mark)
    }

    if(this.state.isFlipped){
      this.setState({
          ...this.state,
          isFlipped: false,
          currentCard: {},
        }, () => this.setNextState(mark) )

      return
    }

    this.setNextState(mark)

  }

  setNextState(mark){
    const { deck } = this.props

    this.setState({
      isFlipped: false,
      score: this.state.score + mark,
      cardNo: this.state.cardNo + 1,
      TotalCard: deck.cards.length,
      currentCard:  (this.state.cardNo+1) <= deck.cards.length ? deck.cards[this.state.cardNo] : {},
    })
  }

  // TODO: Show Score and correct and incorrect number without alert
  showScore = (score) => {
    const { TotalCard } = this.state
    alert(`👋 Your Total Score: ${score * 10}\n
          Correct: ${score}\n
          Incorrect: ${TotalCard - score}\n
          `)

    this.props.navigation.dispatch(NavigationActions.back())

    // set notification tomorrow
    clearLocalNotification()
      .then(setLocalNotification)
  }

  render() {
    const deck = this.props.decks[this.props.entryId]
    const { currentCard } = this.state

    _renderFront = () => {
      return (
        <View style={styles.infoContainer}>
         {_commonTop()}
         <Text style={styles.title}>{ currentCard.question}</Text>
          <TouchableOpacity onPress={_flip}>
            <Text style={styles.subTitle}>Answer</Text>
          </TouchableOpacity>
         {_commonBottom()}
        </View>
      )
    }

    _renderBack = () => {
      return (
        <View style={styles.infoContainer}>
          {_commonTop()}
          <Text style={styles.title}>{currentCard.answer}</Text>
          <TouchableOpacity onPress={_flip}>
            <Text style={styles.subTitle}>Question</Text>
          </TouchableOpacity>
          {_commonBottom()}
        </View>
      )
    }

    _commonTop = () => {
      return (
        <Text style={styles.questionsNum}>{this.state.cardNo}/{this.state.TotalCard}</Text>
      )
    }

    _commonBottom = () => {
      return (
        <View style={styles.buttonContainer}>
          <View style={{flex: 1}}>
            <TextButton  onPress={() => this.correct() }
              style={[styles.button, styles.correctButton]}>Correct</TextButton>
            <TextButton  onPress={() => this.incorrect() }
              style={[styles.button, styles.incorrectButton]}>Incorrect</TextButton>
          </View>
        </View>
      )
    }

    _flip = () => {
      this.setState({isFlipped: !this.state.isFlipped})
    }

    return (
        <FlipView style={styles.container}
           front={_renderFront()}
           back={_renderBack()}
           isFlipped={this.state.isFlipped}
           onFlipped={(val) => {console.log('Flipped: ' + val)}}
           flipAxis="y"
           flipEasing={Easing.out(Easing.ease)}
           flipDuration={500}
           perspective={1000}
          />

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
    marginTop: 5,
    marginBottom: 50,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 30,
  },
  questionsNum: {
    marginLeft: 15,
  },
  title: {
    marginTop: 50,
    justifyContent: 'center',
    fontSize: 50,
    textAlign: 'center',
  },
  subTitle: {
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: red,
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
  correctButton: {
    color: white,
    backgroundColor: green,
    borderStyle: 'solid',
    borderColor: green,
    borderWidth: 1,
  },
  incorrectButton: {
    color: white,
    backgroundColor: red,
    borderStyle: 'solid',
    borderColor: red,
    borderWidth: 1,
  }
})

function mapStateToProps(decks, { navigation }) {
  const { entryId,deck } = navigation.state.params
  return {
    deck,
    decks,
    entryId
  }
}

export default connect(mapStateToProps)(Quiz)
