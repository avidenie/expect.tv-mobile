import React from 'react'
import { Text, View } from 'react-native'
import PopularMovies from '../components/popular-movies'
import styled from '@emotion/native'
import { Title, Subtitle } from '../styles/text'

const Container = styled.SafeAreaView`
  background-color: ${props => props.theme.background};
`
const Header = styled.View`
  padding-top: 4;
  padding-bottom: 4;
  padding-left: 16;
  padding-right: 16;
`

const App = () => (
  <Container>
    <Header>
      <Title>Most popular movies</Title>
      <Subtitle>List updates daily</Subtitle>
    </Header>
    <PopularMovies />
  </Container>
)

export default App
