import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

function TvShowDetails() {
  return (
    <View style={styles.container}>
      <Text>This is the TV Show Details screen</Text>
    </View>
  )
}

export default TvShowDetails
