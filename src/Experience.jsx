import { useMatcapTexture, Text3D, OrbitControls, Center } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32)
const material = new THREE.MeshMatcapMaterial()

export default function Experience()
{
  const donutsGroup = useRef()

  const [ matcapTexture ] = useMatcapTexture('7877EE_D87FC5_75D9C7_1C78C0', 256)

  useEffect(() => {
    matcapTexture.colorSpace = THREE.SRGBColorSpace
    matcapTexture.needsUpdate = true

    material.matcap = matcapTexture
    material.needsUpdate = true
  }, [])

  useFrame((state, delta) => {
    for(const donut of donutsGroup.current.children)
    {
      donut.rotation.y += delta * 0.5
      donut.rotation.x += delta * 0.2
    }
  })

  return <>
    <Perf position="top-left" />
    <OrbitControls makeDefault />

    <Center>
      <Text3D font="./fonts/helvetiker_regular.typeface.json"
        material={ material }
        size={ 0.75 }
        height={ 0.2 }
        curveSegments={ 12 }
        bevelEnabled
        bevelThickness={ 0.05 }
        bevelSize={ 0.02 }
        bevelOffset={ 0.02 }
        bevelSegments={ 5 }
        >
        Hello R3F
      </Text3D>
    </Center>
    <group ref={ donutsGroup }>
      {[...Array(100)].map((value, index) =>
        <mesh key={index}
          geometry={ torusGeometry }
          material={ material }
          position={[
            Math.random() * 10 - 5,
            Math.random() * 10 - 5,
            Math.random() * 10 - 5
          ]}
          scale={ 0.2 + Math.random() * 0.2 }
          rotation={[
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            0
          ]}
        />
      )}
    </group>
  </>
}
