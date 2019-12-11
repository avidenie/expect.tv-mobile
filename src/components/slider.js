import { useQuery } from '@apollo/client'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Caption, Title } from 'react-native-paper'
import { useSafeArea } from 'react-native-safe-area-context'
import PosterCard from '../components/poster-card'
import useLayout from '../hooks/layout'

const PADDING_LEFT = 16
const PADDING_RIGHT = 40
const SEPARATOR_WIDTH = 12

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    paddingBottom: 4
  },
  separator: {
    width: SEPARATOR_WIDTH
  }
})

const Slider = ({
  query,
  contentKey,
  title,
  subtitle,
  onPress,
  compact = false
}) => {
  // paddings
  const insets = useSafeArea()
  const paddingLeft = PADDING_LEFT + insets.left
  const paddingRight = PADDING_RIGHT + insets.right
  const paddings = {
    paddingLeft,
    paddingRight
  }

  // columns
  const [{ width }, onLayout] = useLayout()
  const columns = compact ? (width >= 600 ? 8 : 4) : width >= 600 ? 6 : 3
  const columnWidth =
    (width - (paddingLeft + paddingRight) - (columns - 1) * SEPARATOR_WIDTH) /
    columns

  // query
  const { error, networkStatus, data, fetchMore } = useQuery(query, {
    notifyOnNetworkStatusChange: true,
    variables: {
      page: 1
    }
  })

  // basic error handling
  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error! {error.message}</Text>
      </View>
    )
  }

  return (
    <>
      <View style={[styles.container, paddings]} onLayout={onLayout}>
        {title && <Title>{title}</Title>}
        {subtitle && <Caption>{subtitle}</Caption>}
        {networkStatus === 1 && <Text>Loading...</Text>}
      </View>
      {networkStatus !== 1 && (
        <FlatList
          contentContainerStyle={paddings}
          data={data[contentKey].results}
          decelerationRate="fast"
          horizontal={true}
          initialNumToRender={columns + 1}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyExtractor={item => item.tmdbId.toString()}
          renderItem={({ item }) => (
            <PosterCard item={item} width={columnWidth} onPress={onPress} />
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
