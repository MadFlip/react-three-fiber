import { shaderMaterial, Sparkles, useTexture, useGLTF, OrbitControls, Center } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import portalVertexShader from './shaders/portal/vertex.glsl'
import portalFragmentShader from './shaders/portal/fragment.glsl'
import * as THREE from 'three'

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color('#ff7d46'),
    uColorEnd: new THREE.Color('#f9d423'),
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

  return <>
    <color args={[ '#030202' ]} attach='background' />

    <OrbitControls makeDefault />

    <Center>
      <mesh geometry={ nodes.baked.geometry }>
        <meshBasicMaterial map={ bakedTexture } />
      </mesh>

      <mesh geometry={ nodes.poleLightA.geometry } position={ nodes.poleLightA.position }>
        <meshBasicMaterial color='#ff7d46' />
      </mesh>

      <mesh geometry={ nodes.poleLightB.geometry } position={ nodes.poleLightB.position }>
        <meshBasicMaterial color='#ff7d46' />
      </mesh>

      <mesh geometry={ nodes.portalLight.geometry } position={ nodes.portalLight.position } rotation={ nodes.portalLight.rotation }>
        <portalMaterial />
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
