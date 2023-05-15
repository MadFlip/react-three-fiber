import { useState, useEffect } from 'react'

export default function Clicker() {
  const [count, setCount] = useState(0)

  // if you want to run useEffect only once, pass an empty array as the second argument
  useEffect(() => {
    console.log('useEffect called') 
  }, [])

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
