import { AsyncStorage } from 'react-native'

export const FLASHCARDS_STORAGE_KEY = 'Flashcards:data:dev:1'

export function  generateId(Id = '') {
  Id = Id.replace(/\W/g, '_')
  Id = Id + (new Date).getTime()
  return Id
}

export function fetchDecks () {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((data) => (JSON.parse(data)) )
}

export function setDeck(deck, id = null) {
  if(id === null) id = generateId(deck.title)
  AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [id]: deck,
  }))
  return id
}

// {
//   title: 'name',
//   cards: [
//     {
//       question: "?",
//       answer: 'ans'
//     },
//     {
//       question: "?",
//       answer: 'ans'
//     }
//   ]
// }


export function addCardToDeck (card, deck, id) {
  // console.warn(JSON.stringify(deck))
  deck.cards = deck.cards.concat(card)

  AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [id]: deck,
  }))
}
