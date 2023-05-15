import { useState, useEffect } from 'react'

// Clicker(props) === Clicker({ keyName }) - destructuring

export default function Clicker({ keyName, color }) {
  const [count, setCount] = useState(localStorage.getItem(keyName) * 1 ?? 0)
  // if you want to run useEffect only once, pass an empty array as the second argument
  // return a function from useEffect to run when the component unmounts
  useEffect(() => {
    return () => {
      localStorage.removeItem(keyName)
    }
  }, [])

  // if you want to run useEffect only when count changes, pass count as the second argument
  useEffect(() => {
    localStorage.setItem(keyName, count)
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
      <button className="button" onClick={ buttonClick } style={ {backgroundColor: color} }>Click Me</button><br /><br />
      {/* <button className="button" onClick={ resetClicks }>Reset Counter</button> */}
    </div>
  )
}
