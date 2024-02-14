import { OrbitControls, useGLTF } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { RigidBody, Physics, CuboidCollider, CylinderCollider, InstancedRigidBodies } from '@react-three/rapier'
import { useRef, useState, useMemo } from 'react' 
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Experience()
{
    const [ hitSound ] = useState(() => new Audio('./hit.mp3'))
    const cube = useRef()
    const twister = useRef()
    const hambuger = useGLTF('./hamburger.glb')
    // const cubes = useRef()

    const cubeJump = () => {
      const mass = cube.current.mass()

      cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 })
      cube.current.applyTorqueImpulse({ 
        x: Math.random() - 0.5,
        y: Math.random() - 0.5,
        z: Math.random() - 0.5
      })
    }

    useFrame((state) => {
      const time = state.clock.getElapsedTime()
      const eulerRotation = new THREE.Euler(0, time * 10, 0)
      const quaternionRotation = new THREE.Quaternion()
      quaternionRotation.setFromEuler(eulerRotation)
      twister.current.setNextKinematicRotation(quaternionRotation)

      const angle = time * 0.5
      const x = Math.cos(angle) * 2
      const z = Math.sin(angle) * 2
      twister.current.setNextKinematicTranslation({ x, y: -0.8, z })
    })

    const collisionEnter = () => {
      // hitSound.currentTime = 0
      // hitSound.volume = Math.random()
      // hitSound.play()
    }

    // useEffect(() => {
    //   for (let i = 0; i < cubesCount; i++) {
    //     const matrix = new THREE.Matrix4()
    //     matrix.compose(
    //       new THREE.Vector3(i * 2, 0, 0),
    //       new THREE.Quaternion(),
    //       new THREE.Vector3(1, 1, 1)
    //     )
    //     cubes.current.setMatrixAt(i, matrix) 
    //   }
    // }, [])

    const cubesCount = 25
    const cubeIntances = useMemo(() => {
      const instances = []
      for (let i = 0; i < cubesCount; i++) {
        instances.push({
          key: 'cube_' + i,
          position: [
            (Math.random() - 0.5) * 7,
            10 + i * 0.5,
            (Math.random() - 0.5) * 7 ],
          rotation: [
            Math.random(),
            Math.random(),
            Math.random(),
          ],
        })
      }

      return instances
    }, [])

    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />
        
        <Physics
          debug={ false }
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
            onCollisionEnter={ collisionEnter }
            // onCollisionExit={ () => console.log('Exit') }
            // onSleep={ () => console.log('Sleep') }
            // onWake={ () => console.log('Wake') }
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

          <RigidBody type="fixed">
            <CuboidCollider args={[ 5, 5, 0.5 ]} position={[ 0, 3, 5.25 ]} />
            <CuboidCollider args={[ 5, 5, 0.5 ]} position={[ 0, 3, -5.25 ]} />
            <CuboidCollider args={[ 0.5, 5, 5 ]} position={[ 5.25, 3, 0 ]} />
            <CuboidCollider args={[ 0.5, 5, 5 ]} position={[ -5.25, 3, 0 ]} />
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

          {/* <RigidBody colliders={ false }>
            <primitive object={ hambuger.scene } scale={ 0.25 } />
            <CylinderCollider mass={ 0.1 } args={[ 0.5, 1.25 ]} />
          </RigidBody> */}

          <InstancedRigidBodies instances={ cubeIntances }>
            <instancedMesh castShadow args={[ null, null, cubesCount ]}>
              <boxGeometry />
              <meshStandardMaterial color="tomato" />
            </instancedMesh>
          </InstancedRigidBodies>
        </Physics>
    </>
}
