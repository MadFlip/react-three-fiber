import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { RigidBody, Physics, CuboidCollider } from '@react-three/rapier'
import { useRef } from 'react' 

export default function Experience()
{
    const cube = useRef()

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
            <CuboidCollider mass={ 0.1 } args={[ 0.5, 0.5, 0.5 ]} />
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
        </Physics>
    </>
}
