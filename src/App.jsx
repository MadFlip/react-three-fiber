import { useState } from 'react'
import Clicker from './Clicker'

export default function App() {
  const [ hasClicker, setHasClicker ] = useState(true)
  const toggleClicker = () => {
    setHasClicker(hasClicker => !hasClicker)
  }

  return (
    <>
      <h1 className="title">React App</h1>
      <button className="button" onClick={ toggleClicker }>{ hasClicker ? 'Hide Clicker' : 'Show Clicker' }</button>
      { hasClicker && <Clicker /> }
    </>
  )
}
