import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { RigidBody, Physics } from '@react-three/rapier'

export default function Experience()
{
    return <>

        <Perf position="top-left" />

        <OrbitControls makeDefault />

        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />
        
        <Physics 
        // debug
        >
          <RigidBody colliders="ball">
            <mesh castShadow position={ [ 0, 3, 0.5 ] }>
              <sphereGeometry />
              <meshStandardMaterial color="orange" />
            </mesh>
          </RigidBody>
          {/* colliders 'ball' wraps the mesin in a sphere */}
          {/* colliders 'hull' wraps the mesh like a coat */}
          {/* colliders 'trimesh' wraps more precisely, including cavities and holes */}

          <RigidBody colliders="trimesh">
            <mesh castShadow position={[ 0, 1, 0 ]} rotation={[ Math.PI * 0.1, 0, 0 ]}>
              <torusGeometry args={[ 1, 0.5, 16, 32 ]} />
              <meshStandardMaterial color="mediumpurple" />
            </mesh>
          </RigidBody>

          <RigidBody type="fixed">
            <mesh receiveShadow position-y={ - 1.25 }>
              <boxGeometry args={ [ 10, 0.5, 10 ] } />
              <meshStandardMaterial color="greenyellow" />
            </mesh>
          </RigidBody>
        </Physics>
    </>
}
