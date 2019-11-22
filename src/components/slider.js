import { useQuery } from '@apollo/client'
import styled from '@emotion/native'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import PosterCard from '../components/poster-card'
import useLayout from '../hooks/layout'
import { Subtitle, Title } from '../styles/text'

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingLeft: 16,
    paddingRight: 16
  },
  separator: {
    width: 8
  }
})

const Container = styled.View({
  paddingTop: 4,
  paddingBottom: 4,
  paddingLeft: 16,
  paddingRight: 16
})

const Slider = ({ query, contentKey, title, subtitle, compact = false }) => {
  const { loading, error, data } = useQuery(query)
  const [{ width }, onLayout] = useLayout()
  const columns = compact ? (width >= 600 ? 8 : 4) : width >= 600 ? 6 : 3
  const columnWidth = (width - 32 - (columns - 1) * 8) / columns

  if (error) {
    return (
      <Container>
        <Text>Error! {error.message}</Text>
      </Container>
    )
  }

  return (
    <>
      <Container onLayout={onLayout}>
        {title && <Title>{title}</Title>}
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        {loading && <Text>Loading...</Text>}
      </Container>
      {!loading && (
        <FlatList
          contentContainerStyle={styles.contentContainerStyle}
          data={data[contentKey]}
          horizontal={true}
          initialNumToRender={columns + 1}
          keyExtractor={item => item.tmdbId.toString()}
          renderItem={({ item }) => (
            <PosterCard item={item} width={columnWidth} />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </>
  )
}

export default Slider
