import qs from 'querystringify'
import React, { useState } from 'react'
import {
  Image,
  PixelRatio,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'

/**
 * styling
 */

const styles = {
  container: {
    aspectRatio: 1000 / 1426,
    elevation: 2,
    marginBottom: 1,
    marginTop: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41
  },
  posterImage: {
    flex: 1,
    borderRadius: 5,
    resizeMode: 'cover'
  },
  fallbackContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    backgroundColor: '#121212',
    borderRadius: 5,
    justifyContent: 'flex-end',
    paddingBottom: 8
  },
  title: {
    padding: 4,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  logo: {
    width: '80%',
    aspectRatio: 80 / 31,
    resizeMode: 'cover'
  }
}

/**
 * helpers
 */

function getImageWidth(width, scale = 1) {
  const imageWidths = [240, 480, 720, 1200, 1440, 1680, 1920]
  const pixelWidth = PixelRatio.getPixelSizeForLayoutSize(width) * scale
  let imageWidth = imageWidths.find(imageWidth => pixelWidth < imageWidth)
  if (imageWidth === -1) {
    imageWidth = 1920
  }
  return imageWidth
}

function getImageUrl(imageUrl, imageParams = {}) {
  const params = {
    url: imageUrl,
    ...imageParams
  }
  return `https://images.weserv.nl/${qs.stringify(params, true)}`
}

/**
 * components
 */

function LoadingCard({ item }) {
  return (
    <View style={styles.fallbackContainer}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  )
}

function FallbackCard({ item, width }) {
  const [isError, setIsError] = useState(false)
  const logoWidth = getImageWidth(width, 0.8)
  return (
    <View style={styles.fallbackContainer}>
      {(!item.images.logo || isError) && <Title>{item.title}</Title>}
      {item.images.logo && !isError && (
        <Image
          style={styles.logo}
          source={{
            uri: getImageUrl(item.images.logo, {
              w: logoWidth,
              h: Math.ceil((logoWidth * 31) / 80)
            })
          }}
          onError={() => setIsError(true)}
        />
      )}
    </View>
  )
}

function PosterCard({ item, width, onPress }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)
  const imageWidth = getImageWidth(width)

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, { width }]}>
        {item.images.poster && !isError && !isLoaded && (
          <LoadingCard item={item} />
        )}
        {item.images.poster && !isError && (
          <Image
            style={styles.posterImage}
            source={{
              uri: getImageUrl(item.images.poster, {
                w: imageWidth,
                h: Math.ceil(imageWidth * 1.426),
                fit: 'cover'
              })
            }}
            onLoad={() => setIsLoaded(true)}
            onError={() => setIsError(true)}
          />
        )}
        {(!item.images.poster || isError) && (
          <FallbackCard item={item} width={width} />
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default PosterCard
