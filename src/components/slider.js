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
  const { loading, error, networkStatus, data, fetchMore } = useQuery(query, {
    notifyOnNetworkStatusChange: true,
    variables: {
      page: 1
    }
  })
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
        {networkStatus === 1 && <Text>Loading...</Text>}
      </Container>
      {networkStatus !== 1 && (
        <FlatList
          contentContainerStyle={styles.contentContainerStyle}
          data={data[contentKey].results}
          decelerationRate="fast"
          horizontal={true}
          initialNumToRender={columns + 1}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyExtractor={item => item.tmdbId.toString()}
          renderItem={({ item }) => (
            <PosterCard item={item} width={columnWidth} />
          )}
          showsHorizontalScrollIndicator={false}
          snapToInterval={columnWidth + 8}
          onEndReachedThreshold={0.4}
          onEndReached={() => {
            const maxPage = Math.min(5, data[contentKey].pageInfo.totalPages)
            if (
              networkStatus !== 3 &&
              data[contentKey].pageInfo.page < maxPage
            ) {
              fetchMore({
                variables: {
                  page: data[contentKey].pageInfo.page + 1
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult) {
                    return prev
                  } else {
                    return {
                      ...prev,
                      [contentKey]: {
                        ...prev[contentKey],
                        results: [
                          ...prev[contentKey].results,
                          ...fetchMoreResult[contentKey].results
                        ],
                        pageInfo: fetchMoreResult[contentKey].pageInfo
                      }
                    }
                  }
                }
              })
            }
          }}
        />
      )}
    </>
  )
}

export default Slider
