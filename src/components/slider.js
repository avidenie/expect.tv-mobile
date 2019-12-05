import { useQuery } from '@apollo/client'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Paragraph, Subheading } from 'react-native-paper'
import PosterCard from '../components/poster-card'
import useLayout from '../hooks/layout'

const Slider = ({ query, contentKey, title, subtitle, compact = false }) => {
  const { error, networkStatus, data, fetchMore } = useQuery(query, {
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
      <View style={styles.container} onLayout={onLayout}>
        {title && <Subheading>{title}</Subheading>}
        {subtitle && <Paragraph>{subtitle}</Paragraph>}
        {networkStatus === 1 && <Text>Loading...</Text>}
      </View>
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

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 16,
    paddingRight: 16
  },
  contentContainerStyle: {
    paddingLeft: 16,
    paddingRight: 16
  },
  separator: {
    width: 8
  }
})

export default Slider
