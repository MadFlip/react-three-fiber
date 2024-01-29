import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Bloom, Glitch, Noise, ToneMapping, Vignette, EffectComposer } from '@react-three/postprocessing'
import { GlitchMode, BlendFunction } from 'postprocessing'

export default function Experience()
{
  return <>
    <color args={ [ '#333' ] } attach='background' />
    <EffectComposer disableNormalPass>
      {/* <Vignette 
        offset={ 0.3 }
        darkness={ 0.8 }
        blendFunction={ BlendFunction.NORMAL }
        /> */}
        {/* <Glitch 
          delay={ [0.5, 1] }
          duration={ [0.1, 0.3] }
          strength={ [0.2, 0.4] }
          mode={ GlitchMode.CONSTANT_WILD }
        /> */}
        {/* <Noise 
          premultiply
          blendFunction={ BlendFunction.SCREEN }
        /> */}
        <Bloom 
          intensity={ 0.1 }
          mipmapBlur 
          luminanceThreshold={ 0 } />
      <ToneMapping />
    </EffectComposer>


    <Perf position="top-left" />
    <OrbitControls makeDefault />

    <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
    <ambientLight intensity={ 1.5 } />

    <mesh castShadow position-x={ - 2 }>
      <sphereGeometry />
      <meshBasicMaterial color={ [0, 1.25 * 5, 1.12 * 5] } />
    </mesh>

    <mesh castShadow position-x={ 2 } scale={ 1.5 }>
      <boxGeometry />
      <meshBasicMaterial color={ [1.5, 1, 4] } />
    </mesh>

    {/* <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
      <planeGeometry />
      <meshStandardMaterial color="greenyellow" />
    </mesh> */}
  </>
}
