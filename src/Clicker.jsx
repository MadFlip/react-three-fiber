import { useState, useEffect } from 'react'

export default function Clicker() {
  const [count, setCount] = useState(localStorage.getItem('count') * 1 ?? 0)

  // if you want to run useEffect only once, pass an empty array as the second argument
  useEffect(() => {
    console.log('component mounted')

    return () => {
      console.log('component unmounted')
    }
  }, [])

  // if you want to run useEffect only when count changes, pass count as the second argument
  useEffect(() => {
    localStorage.setItem('count', count)
  }, [count])

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
