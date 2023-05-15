import { useState, useMemo } from 'react'
import Clicker from './Clicker'

export default function App({ clickersCount = 1 }) {
  const [ hasClicker, setHasClicker ] = useState(true)
  const [ count, setCount ] = useState(0)
  const toggleClicker = () => {
    setHasClicker(hasClicker => !hasClicker)
  }

  const incrementCount = () => {
    setCount(count => count + 1)
  }

  const colors = useMemo(() => {
    const colors = []
    for (let i = 0; i < clickersCount; i++) {
      colors.push(`hsl(${Math.round(Math.random() * 360)}, 100%, 50%)`)
    }
    return colors
  }, [])

  return (
    <>
      <h1 className="title">React App</h1>
      <div className="totalClicks">Total clicks: { count }</div><br />
      <button className="button" onClick={ toggleClicker }>{ hasClicker ? 'Hide Clicker' : 'Show Clicker' }</button><br /><br />
      { hasClicker && <>
        { [...Array(clickersCount)].map((item, index) => {
          return <Clicker increment={ incrementCount } key={ index } keyName={`count${index}`} color={colors[index]} />
        }) }
      </> }
    </>
  )
}
