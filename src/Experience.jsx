import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { EffectComposer, ToneMapping } from '@react-three/postprocessing'
import Drunk from './Drunk'
import { useRef } from 'react'
import { BlendFunction } from 'postprocessing'

export default function Experience()
{
  const drunkRef = useRef()
  return <>
    <color args={ [ '#fff' ] } attach='background' />
    <EffectComposer disableNormalPass>
      <ToneMapping />
      <Drunk 
        ref={ drunkRef }
        frequency={ 500}
        amplitude={ 0.01 }
      />
    
    </EffectComposer>


    <Perf position="top-left" />
    <OrbitControls makeDefault />

    <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
    <ambientLight intensity={ 1.5 } />

    <mesh castShadow position-x={ - 2 }>
      <sphereGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>

    <mesh castShadow position-x={ 2 } scale={ 1.5 }>
      <boxGeometry />
      <meshStandardMaterial color="mediumpurple" />
    </mesh>

    <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
      <planeGeometry />
      <meshStandardMaterial color="greenyellow" />
    </mesh>
  </>
}
