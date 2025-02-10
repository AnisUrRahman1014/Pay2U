import { View, Text } from 'react-native'
import React from 'react'
import styles from './Styles'

const TextWrapper = ({title, desc, priority = 1}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title(priority)}>{title}</Text>
      <Text style={styles.desc(priority)}>{desc}</Text>
    </View>
  )
}

export default TextWrapper