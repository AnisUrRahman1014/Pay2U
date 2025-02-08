import { View, Text } from 'react-native'
import React from 'react'
import styles from './Styles'

const TextWrapper = ({title, desc}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{desc}</Text>
    </View>
  )
}

export default TextWrapper