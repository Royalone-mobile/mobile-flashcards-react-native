import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { white, purple } from '../utils/colors'

export default function TextButton({ children, onPress, style = {}}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.default, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  default: {
    textAlign: 'center',
    color: white,
    backgroundColor: purple,
    borderWidth: 1,
  }
})
