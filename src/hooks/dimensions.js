import { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'

const window = Dimensions.get('window')
const screen = Dimensions.get('screen')

export default function useDimensions() {
  const [dimensions, setDimensions] = useState({
    window,
    screen
  })

  const onChange = event => {
    setDimensions({ window: event.window, screen: event.screen })
  }

  useEffect(() => {
    Dimensions.addEventListener('change', onChange)

    return () => Dimensions.removeEventListener('change', onChange)
  }, [])

  return dimensions
}
