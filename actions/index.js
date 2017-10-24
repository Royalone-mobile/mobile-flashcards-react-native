export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const RECEIVE_DECKS = 'RECEIVE_DECKS'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function addDeck (deck, deckId) {
  return {
    type: ADD_DECK,
    deck,
    deckId,
  }
}

export function addCard (card, deck, deckId) {
  return {
    type: ADD_CARD,
    card,
    deck,
    deckId,
  }
}
