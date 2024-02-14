import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { RigidBody, Physics, CuboidCollider } from '@react-three/rapier'
import { useRef } from 'react' 
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Experience()
{
    const cube = useRef()
    const twister = useRef()

    const cubeJump = () => {
      const mass = cube.current.mass()
      console.log('Cube mass:', mass)

      cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 })
      cube.current.applyTorqueImpulse({ 
        x: Math.random() - 0.5,
        y: Math.random() - 0.5,
        z: Math.random() - 0.5
      })
    }

    useFrame((state) => {
      const time = state.clock.getElapsedTime()
      const eulerRotation = new THREE.Euler(0, time * 4, 0)
      const quaternionRotation = new THREE.Quaternion()
      quaternionRotation.setFromEuler(eulerRotation)
      twister.current.setNextKinematicRotation(quaternionRotation)

      const angle = time * 0.5
      const x = Math.cos(angle) * 2
      const z = Math.sin(angle) * 2
      twister.current.setNextKinematicTranslation({ x, y: -0.8, z })
    })

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />
        
        <Physics
          debug
          gravity={ [ 0, -9.81, 0 ] }
        >
          <RigidBody colliders="ball" restitution={ 0.8 }>
            <mesh castShadow position={ [ -1.5, 2, 0 ] }>
              <sphereGeometry />
              <meshStandardMaterial color="orange" />
            </mesh>
          </RigidBody>
          {/* colliders 'ball' wraps the mesin in a sphere */}
          {/* colliders 'hull' wraps the mesh like a coat */}
          {/* colliders 'trimesh' wraps more precisely, including cavities and holes */}

          <RigidBody ref={ cube } position={[ 1.5, 2, 0 ]} 
            gravityScale={ 0.8 } 
            restitution={ 0.8 }
            friction={ 0 }
            colliders={ false }
            >
            <mesh castShadow
              onClick={ cubeJump }
              >
              <boxGeometry />
              <meshStandardMaterial color="mediumpurple" />
            </mesh>
            {/* To control mass we need to use custom collider */}
            <CuboidCollider mass={ 1 } args={[ 0.5, 0.5, 0.5 ]} />
          </RigidBody>

          <RigidBody type="fixed" 
            // restitution={ 1 }
            friction={ 1 }
            >
            <mesh receiveShadow position-y={ - 1.25 }>
              <boxGeometry args={ [ 10, 0.5, 10 ] } />
              <meshStandardMaterial color="greenyellow" />
            </mesh>
          </RigidBody>

          <RigidBody
            ref={ twister }
            position={[ 0, -0.8, 0 ]}
            friction={ 0 }
            type="kinematicPosition"
            >
            <mesh castShadow scale={[ 0.4, 0.4, 3 ]}>
              <boxGeometry />
              <meshStandardMaterial color="red" />
            </mesh>
          </RigidBody>
        </Physics>
    </>
}
