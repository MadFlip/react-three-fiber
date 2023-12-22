import React from 'react'
import { Canvas } from '@react-three/fiber'
// import { OrbitControls } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { animated } from '@react-spring/web'
import Scene from './Scene'

export default function App() {
  // This spring controls the background and the svg fill (text color)
  const [{ background }, set] = useSpring({ background: '#f3f6fe' }, [])
  return (
    <animated.main style={{ background }}>
      <Canvas className="canvas" dpr={[1, 2]}>
        <Scene setBg={set} />
        {/* <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} /> */}
      </Canvas>
    </animated.main>
  )
}
