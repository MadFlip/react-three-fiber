import './style.css'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.querySelector('#root'))
const toto = 0

root.render(
  <>
    <h1 className="title" style={
      {
        color: 'var(--color-primary)',
        fontSize: '42px',
        textTransform: 'uppercase'
      }
    }>Hello { toto ? toto : 'empty' }</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit <br />Blanditiis corrupti deserunt consectetur aut, quo ad molestiae, a incidunt, repudiandae ea sapiente impedit inventore ex similique at? Consequuntur adipisci voluptate recusandae?</p>
    <input type="checkbox" id="test" />
    <label htmlFor="test">That checkbox</label>
  </>
)
