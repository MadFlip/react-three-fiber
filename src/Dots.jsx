import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { animated } from '@react-spring/three'

const roundedSquareWave = (t, delta, a, f) => {
  return ((2 * a) / Math.PI) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta)
}

export default function Dots({color, radius, dotsCount, dotsRotation, dotsScale, hovered}) {
  const ref = useRef()
  const dc = dotsCount
  const r = radius
  const { vec, transform, positions, distances } = useMemo(() => {
    const vec = new THREE.Vector3()
    const transform = new THREE.Matrix4()

    // Precompute randomized initial positions
    const positions = [...Array(dc)].map((_, i) => {
      const position = new THREE.Vector3()
      // Place in a grid
      // position.x = (i % 50) - 25
      // position.y = Math.floor(i / 50) - 25

      // Place loop line into circle
      const radius = r
      const theta = 2 * Math.PI * (i / dc)
      position.x = radius * Math.cos(theta)
      position.y = radius * Math.sin(theta)

      // Offset every other column (hexagonal pattern)
      // position.y += (i % 2) * 0.5


      // Add some noise
      // position.x += Math.random() * 0.3
      // position.y += Math.random() * 0.3
      return position
    })

    // Precompute initial distances with octagonal offset
    const right = new THREE.Vector3(1, 0, 0)
    const distances = positions.map((pos) => {
      return pos.length() + Math.sin(pos.angleTo(right))
    })
    return { vec, transform, positions, distances }
  }, [])
  useFrame(({ clock }) => {
    for (let i = 0; i < dc; ++i) {
      const dist = distances[i]

      // Distance affects the wave phase
      const t = clock.elapsedTime - dist / 5

      // Oscillates between -0.4 and +0.4
      const wave = roundedSquareWave(t, hovered ? 0.75 : 0.95 + (0.2 * dist) / 72, hovered ? 0.2 : 0.05, 2 / 6.8)

      // Scale initial position by our oscillator
      vec.copy(positions[i]).multiplyScalar(wave + 1)

      // Apply the Vector3 to a Matrix4
      transform.setPosition(vec)

      // Update Matrix4 for this instance
      ref.current.setMatrixAt(i, transform)
    }
    ref.current.instanceMatrix.needsUpdate = true
  })

  return (
    <animated.instancedMesh ref={ref} args={[null, null, dc]} position={[0, 0, -1]} scale={dotsScale} rotation-x={dotsRotation}>
      <circleBufferGeometry args={[0.02]} />
      <meshBasicMaterial color={color}/>
    </animated.instancedMesh>
  )
}
