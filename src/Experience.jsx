import { shaderMaterial, Sparkles, useTexture, useGLTF, OrbitControls, Center, Sky } from '@react-three/drei'
import { useFrame, extend } from '@react-three/fiber'
import { useRef } from 'react'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'
import * as THREE from 'three'

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color('#fbeabb'),
    uColorEnd: new THREE.Color('#f8c73f'),
  },
  portalVertexShader,
  portalFragmentShader
)

extend({ PortalMaterial })

export default function Experience()
{
  const { nodes } = useGLTF('./model/portal.glb')
  const bakedTexture = useTexture('./model/baked.jpg')
  bakedTexture.flipY = false

  const portalMaterialRef = useRef()
  const portalMaterialRef2 = useRef()

  const baseHeight = 2.1

  useFrame((state, delta) => {
    portalMaterialRef.current.uTime += delta
    portalMaterialRef2.current.uTime += delta
  })

  return <>
    <color args={[ '#030202' ]} attach='background' />
    <Sky
      distance={ 4 }
      inclination={ 0.4 }
      azimuth={ 0.25 }
      rayleigh={ 10 }
      mieCoefficient={ 0.005 }
      mieDirectionalG={ 0.7 }
      turbidity={ 10 }
    />

    <OrbitControls makeDefault
      autoRotate
    />
    <Center>
      <mesh geometry={ nodes.baked.geometry }>
        <meshBasicMaterial map={ bakedTexture } />
      </mesh>

      <mesh position-y={ baseHeight * -1/2 - 0.0003 }>
        <boxGeometry args={[4, baseHeight, 4]} />
        <portalMaterial ref={ portalMaterialRef2 } uColorStart={ new THREE.Color('#ba9f34') } uColorEnd={ new THREE.Color('#ac7b1e') }  />
      </mesh>

      <mesh geometry={ nodes.poleLightA.geometry } position={ nodes.poleLightA.position }>
        <meshBasicMaterial color='#fbeabb' />
      </mesh>

      <mesh geometry={ nodes.poleLightB.geometry } position={ nodes.poleLightB.position }>
        <meshBasicMaterial color='#fbeabb' />
      </mesh>

      <mesh geometry={ nodes.portalLight.geometry } position={ nodes.portalLight.position } rotation={ nodes.portalLight.rotation }>
        <portalMaterial ref={ portalMaterialRef } />
      </mesh>
    
      <Sparkles
        size={ 6 }
        scale={[ 4, 2, 4 ]}
        position-y={ 1 }
        speed={ 0.2 }
        count={ 40 }
      />
    </Center>
  </>
}
