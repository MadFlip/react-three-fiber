import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { StrictMode } from 'react'
import { Leva } from 'leva'

const root = ReactDOM.createRoot(document.querySelector('#root'))
// const created = ({ gl, scene }) => {
//   gl.setClearColor('red')
//   scene.background = new THREE.Color('blue')
// }

root.render(
  <StrictMode>
    <Canvas
      shadows
      camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-4, 3, 6]
      }}
      // onCreated={ created }
    >
      <Experience />
    </Canvas>
  </StrictMode>
)
