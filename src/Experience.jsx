import { Lightformer, Environment, OrbitControls, useHelper } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls, button } from 'leva'
import { Perf } from 'r3f-perf'
import { useRef } from 'react'
import * as THREE from 'three'

export default function Experience()
{
    const { perfVisible } = useControls('Performance', {
      perfVisible: false,
    })

    const { position, color, visible, choice } = useControls('Sphere',{
      position: {
        value: { x: -2, y: 0.2},
        x: { min: -5, max: 5, step: 0.1 },
        y: { min: 0.2, max: 5, step: 0.1 },
        joystick: 'invertY'
      },
      color: 'white',
      visible: true,
      myInterval: {
        min: 0,
        max: 10,
        value: [ 4, 5 ],
      },
      clickMe: button(() => console.log('clicked')),
      choice: { label: 'scale', options: [ 1, 1.5, 2 ], value: 1}
    })

    const { scale } = useControls('Box', {
      scale: {
        value: 1,
        min: 0,
        max: 2,
        step: 0.1,
      }
    })

    const { shadowColor, shadowOpacity, shadowBlur, shadowPosition } = useControls('ControlShadows',{
      shadowOpacity: {
        value: 0.5,
        min: 0,
        max: 1,
        step: 0.1,
      },
      shadowColor: '#211614',
      shadowBlur: {
        value: 1,
        min: 0,
        max: 10,
        step: 0.1,
      },
      shadowPosition: {
        value: { x: 0, y: 0},
        x: { min: -5, max: 5, step: 0.1 },
        y: { min: -5, max: 5, step: 0.1 },
        joystick: 'invertY'
      },
    })

    const { envMapIntensity } = useControls('Environment', {
      envMapIntensity: {
        value: 1,
        min: 0,
        max: 10,
        step: 0.1,
      },
    })

    const cube = useRef()

    useFrame((state, delta) => {
      cube.current.rotation.y += delta * 0.2
    })

    return <>
        {/* <BakeShadows />
        <SoftShadows frustum={ 3.75 }
          size={ 50 }
          near={ 9.5 }
          samples={ 17 }
          rings={ 11 }
        /> */}
        <Environment 
          background
          preset='sunset'
          resolution={ 32 }
        >
          <color args={ ['blue'] } attach="background" />
          <Lightformer position={ -5 }
            scale={ 5 }
            color={ 'red' }
            intensity={ 10 }
            form="ring"
          ></Lightformer>
          {/* <mesh position-z={ -5 } scale={ 10 }> 
            <planeGeometry/>
            <meshBasicMaterial color={ [ 10, 0, 0 ] }/>
          </mesh> */}
        </Environment>

        
        
        <color args={[ 'ivory' ]} attach="background" />

        { perfVisible && <Perf openByDefault trackGPU={ true } position="bottom-right" /> }
        <OrbitControls makeDefault />

        {/* <ContactShadows
          position={[ shadowPosition.x, -0.99, shadowPosition.y ]}
          scale={ 10 }
          resolution={ 512 }
          far={ 5 }
          color = { shadowColor }
          opacity = { shadowOpacity }
          blur = { position.y }
          frames={ 1 }
        /> */}
    

        <mesh castShadow position={[ position.x, position.y, 0 ]} scale={ choice }  visible={ visible }>
            <sphereGeometry />
            <meshStandardMaterial color={ color } envMapIntensity={ envMapIntensity }/>
        </mesh>

        <mesh ref={ cube } castShadow position-x={ 2 } scale={ scale }>
            <boxGeometry />
            <meshStandardMaterial color="white"  envMapIntensity={ envMapIntensity }/>
        </mesh>

        <mesh position-y={ -1 } rotation-x={ -Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow"  envMapIntensity={ envMapIntensity }/>
        </mesh>

    </>
}
