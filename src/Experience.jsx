import { ContactShadows, OrbitControls, Sky, useHelper } from '@react-three/drei'
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
      color: 'tomato',
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

    const { sunPosition } = useControls('Sky', {
      sunPosition: {
        value: [ 1, 2, 3]
      },
    })

    const directionalLight = useRef()
    const cube = useRef()
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)

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
        
        <color args={[ 'ivory' ]} attach="background" />

        { perfVisible && <Perf openByDefault trackGPU={ true } position="bottom-right" /> }
        <OrbitControls makeDefault />

        <ContactShadows
          position={[ shadowPosition.x, -0.99, shadowPosition.y ]}
          scale={ 10 }
          resolution={ 512 }
          far={ 5 }
          color = { shadowColor }
          opacity = { shadowOpacity }
          blur = { position.y }
          frames={ 1 }
        />
        
        <directionalLight ref={ directionalLight }
          castShadow 
          shadow-mapSize={ [1024, 1024] }
          shadow-camera-top={ 3 }
          shadow-camera-right={ 3 }
          shadow-camera-bottom={ -3 }
          shadow-camera-left={ -3 }
          shadow-camera-near={ 0.1 }
          shadow-camera-far={ 10 }
          position={ sunPosition } 
          intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />
        <Sky sunPosition={ sunPosition } />

        <mesh castShadow position={[ position.x, position.y, 0 ]} scale={ choice }  visible={ visible }>
            <sphereGeometry />
            <meshStandardMaterial color={ color } />
        </mesh>

        <mesh ref={ cube } castShadow position-x={ 2 } scale={ scale }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh position-y={ -1 } rotation-x={ -Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}
