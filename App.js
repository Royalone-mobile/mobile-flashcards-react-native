import React from 'react'
import { Text, View, Platform } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

import { purple } from './utils/colors'
import AppStatusBar from './components/AppStatusBar'
import { setLocalNotification } from './utils/helpers'
import { MainNavigator } from './navigation'

export default class App extends React.Component {

  componentDidMount () {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex:1}}>
          <AppStatusBar backgroundColor={purple} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
