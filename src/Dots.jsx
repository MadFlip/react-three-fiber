import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const roundedSquareWave = (t, delta, a, f) => {
  return ((2 * a) / Math.PI) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta)
}

export default function Dots({color}) {
  const ref = useRef()
  const { vec, transform, positions, distances } = useMemo(() => {
    const vec = new THREE.Vector3()
    const transform = new THREE.Matrix4()

    // Precompute randomized initial positions
    const positions = [...Array(2000)].map((_, i) => {
      const position = new THREE.Vector3()
      // Place in a grid
      // position.x = (i % 50) - 25
      // position.y = Math.floor(i / 50) - 25

      // Place in a sphere
      const radius = 7
      const theta = 2 * Math.PI * Math.random()
      const phi = Math.acos(2 * Math.random() - 1)
      position.x = radius * Math.sin(phi) * Math.cos(theta)
      position.y = radius * Math.sin(phi) * Math.sin(theta)
  

      // Offset every other column (hexagonal pattern)
      // position.y += (i % 2) * 0.5

      // // Add some noise
      // position.x += Math.random() * 0.3
      // position.y += Math.random() * 0.3
      return position
    })

    // Precompute initial distances with octagonal offset
    const right = new THREE.Vector3(1, 0, 0)
    const distances = positions.map((pos) => {
      return pos.length() + Math.cos(pos.angleTo(right) * 1) * 0.5
    })
    return { vec, transform, positions, distances }
  }, [])
  useFrame(({ clock }) => {
    for (let i = 0; i < 2000; ++i) {
      const dist = distances[i]

      // Distance affects the wave phase
      const t = clock.elapsedTime - dist / 3

      // Oscillates between -0.4 and +0.4
      const wave = roundedSquareWave(t, 0.15 + (0.2 * dist) / 72, 0.1, 1 / 6.8)

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
    <instancedMesh ref={ref} args={[null, null, 2000]} position={[0, 0, -1]} scale={0.5}>
      <circleBufferGeometry args={[0.02]} />
      <meshBasicMaterial color={color}/>
    </instancedMesh>
  )
}
