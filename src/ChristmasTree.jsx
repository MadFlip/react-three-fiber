import { animated } from '@react-spring/three'
import { MeshDistortMaterial } from '@react-three/drei'

const DistortMaterial = animated(MeshDistortMaterial)

export default function ChristmasThree() {
  return (
    <animated.group>
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 1, 32]}/>
        <DistortMaterial
          distort={0.5}
          speed={1}
          color={'#b77356'} 
          clearcoatRoughness={0}
          metalness={0.1}
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <coneBufferGeometry args={[1.2, 1.2, 32]}/>
        <DistortMaterial
          distort={0.5}
          speed={1}
          color={'#159d1d'} 
          clearcoatRoughness={0}
          metalness={0.1}
        />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <coneBufferGeometry args={[1, 1, 32]}/>
        <DistortMaterial
          distort={0.5}
          speed={1}
          color={'#159d1d'} 
          clearcoatRoughness={0}
          metalness={0.1}
        />
      </mesh>
      <mesh position={[0, 1, 0]}>
        <coneBufferGeometry args={[0.8, 0.8, 32]}/>
        <DistortMaterial
          // wireframe
          distort={0.5}
          speed={1}
          color={'#159d1d'} 
          clearcoatRoughness={0}
          metalness={0.1}
        />
      </mesh>
    </animated.group>

  )
}
