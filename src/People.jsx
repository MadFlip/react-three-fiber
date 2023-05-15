import { useState, useEffect, useRef } from 'react'

export default function People() {
  const [people, setPeople] = useState([])

  const getPeople = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await response.json()
    setPeople(data)
  }

  useEffect(() => {
    getPeople()
  }, [])

  return (
    <div className="people">
      <h2>People</h2>
      { people.length > 0 && 
        <ul className='peopleList'>
          { people.map(person => {
            return <li key={ person.id }>{ person.name }</li>
          }) }
        </ul>
      }
    </div>
  )
}
