import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Glitch, ToneMapping, Vignette, EffectComposer } from '@react-three/postprocessing'
import { GlitchMode, BlendFunction } from 'postprocessing'

export default function Experience()
{
  return <>
    <color args={ [ '#fff' ] } attach='background' />
    <EffectComposer disableNormalPass>
      {/* <Vignette 
        offset={ 0.3 }
        darkness={ 0.8 }
        blendFunction={ BlendFunction.NORMAL }
        /> */}
        <Glitch 
          delay={ [0.5, 1] }
          duration={ [0.1, 0.3] }
          strength={ [0.2, 0.4] }
          mode={ GlitchMode.CONSTANT_WILD }
        /> 
      <ToneMapping />
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
