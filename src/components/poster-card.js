import styled from '@emotion/native'
import qs from 'querystringify'
import React, { useState } from 'react'
import { PixelRatio } from 'react-native'

const Container = styled.View(
  {
    aspectRatio: 1000 / 1426,
    elevation: 2,
    marginBottom: 1,
    marginTop: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41
  },
  props => ({
    width: props.width
  })
)
const PosterImage = styled.Image({
  flex: 1,
  borderRadius: 5,
  resizeMode: 'cover'
})
const FallbackContainer = styled.View({
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
})
const Title = styled.Text({
  padding: 4,
  color: '#FFF',
  fontWeight: 'bold',
  textAlign: 'center'
})
const Logo = styled.Image({
  width: '80%',
  aspectRatio: 80 / 31,
  resizeMode: 'cover'
})

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

const LoadingCard = ({ item }) => {
  return (
    <FallbackContainer>
      <Title>{item.title}</Title>
    </FallbackContainer>
  )
}

const FallbackCard = ({ item, width }) => {
  const [isError, setIsError] = useState(false)
  const logoWidth = getImageWidth(width, 0.8)
  return (
    <FallbackContainer>
      {(!item.images.logo || isError) && <Title>{item.title}</Title>}
      {item.images.logo && !isError && (
        <Logo
          source={{
            uri: getImageUrl(item.images.logo, {
              w: logoWidth,
              h: Math.ceil(logoWidth * 31 / 80)
            })
          }}
          onError={() => setIsError(true)}
        />
      )}
    </FallbackContainer>
  )
}

const PosterCard = ({ item, width }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)
  const imageWidth = getImageWidth(width)

  return (
    <Container width={width}>
      {item.images.poster && !isError && !isLoaded && (
        <LoadingCard item={item} />
      )}
      {item.images.poster && !isError && (
        <PosterImage
          source={{ uri: getImageUrl(item.images.poster, {
            w: imageWidth,
            h: Math.ceil(imageWidth * 1.426),
            fit: 'cover'
          }) }}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsError(true)}
        />
      )}
      {(!item.images.poster || isError) && <FallbackCard item={item} width={width} />}
    </Container>
  )
}

export default PosterCard
