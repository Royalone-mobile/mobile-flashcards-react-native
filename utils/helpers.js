import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

export const FLASHCARDS_STORAGE_KEY = 'Flashcards:data:dev:1'
const FLASHCARDS_NOTIFICATION_KEY = 'Flashcards:notifications'

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

export function clearLocalNotification () {
  return AsyncStorage.removeItem(FLASHCARDS_NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: '👋 Study Time!',
    body:  '👋 don\'t forget to study with flashcard today',
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(FLASHCARDS_NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if(data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
               createNotification(),
               {
                 time: tomorrow,
                 repeat: 'day',
               }
              )

              AsyncStorage.setItem(FLASHCARDS_NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
