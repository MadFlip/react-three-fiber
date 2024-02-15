import * as THREE from 'three'
import { RigidBody } from '@react-three/rapier'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const floor1Material = new THREE.MeshStandardMaterial({ color: 'limegreen' })
const floor2Material = new THREE.MeshStandardMaterial({ color: 'greenyellow' })
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' })
const wallMaterial = new THREE.MeshStandardMaterial({ color: 'slategrey' })

function BlockStart ({ position = [0, 0, 0] }) {
  return <group position={ position }>
    {/* Floor */}
    <mesh geometry={ boxGeometry } material={ floor1Material } position-y={ 0 }
      scale={[ 4, 0.2, 4 ]} receiveShadow />
  </group>
}

function BlockSpinner ({ position = [0, 0, 0] }) {
  const obstacle = useRef()
  const [ speed ] = useState(() => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1))

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()

    const euler = new THREE.Euler(0, time * speed, 0)
    const quaternion = new THREE.Quaternion().setFromEuler(euler)

    obstacle.current.setNextKinematicRotation(quaternion)
  })

  return <group position={ position }>
    {/* Floor */}
    <mesh geometry={ boxGeometry } material={ floor2Material } position-y={ -0.1 }
      scale={[ 4, 0.2, 4 ]} receiveShadow />
    {/* Obstacle  */}
    <RigidBody ref={ obstacle } type="kinematicPosition" position={[ 0, 0.3, 0 ]} restitution={ 0.2 } friction={ 0 }>
      <mesh geometry={ boxGeometry } material={ obstacleMaterial }
        scale={[ 3.5, 0.3, 0.3 ]} receiveShadow castShadow />
    </RigidBody>
  </group>
}

function BlockLimbo ({ position = [0, 0, 0] }) {
  const obstacle = useRef()
  const [ timeOffset ] = useState(() => Math.random() * Math.PI * 2)

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    const y = Math.sin(time + timeOffset) + 1.25
    obstacle.current.setNextKinematicTranslation({ x: position[0], y: position[1] + y, z: position[2] })
  })

  return <group position={ position }>
    {/* Floor */}
    <mesh geometry={ boxGeometry } material={ floor2Material } position-y={ -0.1 }
      scale={[ 4, 0.2, 4 ]} receiveShadow />
    {/* Obstacle  */}
    <RigidBody ref={ obstacle } type="kinematicPosition" position={[ 0, 0.3, 0 ]} restitution={ 0.2 } friction={ 0 }>
      <mesh geometry={ boxGeometry } material={ obstacleMaterial }
        scale={[ 3.5, 0.3, 0.3 ]} receiveShadow castShadow />
    </RigidBody>
  </group>
}

function BlockAxe ({ position = [0, 0, 0] }) {
  const obstacle = useRef()
  const [ timeOffset ] = useState(() => Math.random() * Math.PI * 2)

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    const x = Math.sin(time + timeOffset) * 1.25
    obstacle.current.setNextKinematicTranslation({ x: position[0] + x, y: position[1] + 0.75, z: position[2] })
  })

  return <group position={ position }>
    {/* Floor */}
    <mesh geometry={ boxGeometry } material={ floor2Material } position-y={ -0.1 }
      scale={[ 4, 0.2, 4 ]} receiveShadow />
    {/* Obstacle  */}
    <RigidBody ref={ obstacle } type="kinematicPosition" position={[ 0, 0.3, 0 ]} restitution={ 0.2 } friction={ 0 }>
      <mesh geometry={ boxGeometry } material={ obstacleMaterial }
        scale={[ 1.5, 1.3, 0.3 ]} receiveShadow castShadow />
    </RigidBody>
  </group>
}

function BlockEnd ({ position = [0, 0, 0] }) {
  return <group position={ position }>
    {/* Floor */}
    <mesh geometry={ boxGeometry } material={ floor1Material } position-y={ 0 }
      scale={[ 4, 0.2, 4 ]} receiveShadow />
  </group>
}

export default function Level()
{
  return <>
    <BlockStart position={[0, 0, 20]} />
    <BlockSpinner position={[0, 0, 16]} />
    <BlockLimbo position={[0, 0, 12]} />
    <BlockLimbo position={[0, 0, 8]} />
    <BlockAxe position={[0, 0, 4]} />
    <BlockEnd position={[0, 0, 0]} />
  </>
}
