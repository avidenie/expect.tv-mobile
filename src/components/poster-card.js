import styled from '@emotion/native'
import React, { useState } from 'react'

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

const LoadingCard = ({ item }) => {
  return (
    <FallbackContainer>
      <Title>{item.title}</Title>
    </FallbackContainer>
  )
}

const FallbackCard = ({ item }) => {
  const [isError, setIsError] = useState(false)
  return (
    <FallbackContainer>
      {(!item.images.logo || isError) && <Title>{item.title}</Title>}
      {item.images.logo && !isError && (
        <Logo
          source={{
            uri: item.images.logo
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

  return (
    <Container width={width}>
      {item.images.poster && !isError && !isLoaded && (
        <LoadingCard item={item} />
      )}
      {item.images.poster && !isError && (
        <PosterImage
          source={{ uri: item.images.poster }}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsError(true)}
        />
      )}
      {(!item.images.poster || isError) && <FallbackCard item={item} />}
    </Container>
  )
}

export default PosterCard
