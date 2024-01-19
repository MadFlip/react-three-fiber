import { useMatcapTexture, Text3D, OrbitControls, Center, Instances, Instance } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useState } from 'react'

export default function Experience()
{
  const [ torusGeometry, setTorusGeometry ] = useState()
  const [ material, setMaterial ] = useState()

  const [ matcapTexture ] = useMatcapTexture('7877EE_D87FC5_75D9C7_1C78C0', 256)

  return <>
    <Perf position="top-left" />
    <OrbitControls makeDefault />

    <torusGeometry ref={ setTorusGeometry } args={[1, 0.6, 16, 32]}/>
    <meshMatcapMaterial ref={ setMaterial } matcap={ matcapTexture }/>

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
  </>
}
