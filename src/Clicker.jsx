import { useState } from 'react'

export default function Clicker() {
  const countState = useState(0)
  const count = countState[0]
  const setCount = countState[1]

  const buttonClick = () => {
    setCount(count => count + 1)
  }

  const resetClicks = () => {
    setCount(0)
  }

  return (
    <div className="clicker">
      <div className="clicks">Clicks: { count }</div>
      <button className="button" onClick={ buttonClick }>Click Me</button><br /><br />
      <button className="button" onClick={ resetClicks }>Reset Counter</button>
    </div>
  )
}
