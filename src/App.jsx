import { useState } from 'react'
import Clicker from './Clicker'

export default function App() {
  const [ hasClicker, setHasClicker ] = useState(true)
  const toggleClicker = () => {
    setHasClicker(hasClicker => !hasClicker)
  }

  console.log(`hsl(${Math.round(Math.random() * 360)}, 100%, 50%)`)

  return (
    <>
      <h1 className="title">React App</h1>
      <button className="button" onClick={ toggleClicker }>{ hasClicker ? 'Hide Clicker' : 'Show Clicker' }</button><br /><br />
      { hasClicker && <>
        <Clicker keyName="countA" color={ `hsl(${Math.round(Math.random() * 360)}, 100%, 50%)` } />
        <Clicker keyName="countB" color={ `hsl(${Math.round(Math.random() * 360)}, 100%, 50%)` } />
        <Clicker keyName="countC" color={ `hsl(${Math.round(Math.random() * 360)}, 100%, 50%)` } />
      </> }
    </>
  )
}
