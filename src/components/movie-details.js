import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Paragraph } from 'react-native-paper'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

function MovieDetails() {
  return (
    <View style={styles.container}>
      <Paragraph>This is the Movie Details screen</Paragraph>
    </View>
  )
}

export default MovieDetails
