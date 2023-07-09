import { OrbitControls } from '@react-three/drei'
import { useControls, button } from 'leva'
import { Perf } from 'r3f-perf'

export default function Experience()
{
    const { perfVisible } = useControls('Performance', {
      perfVisible: false,
    })

    const { position, color, visible, choice } = useControls('Sphere',{
      position: {
        value: { x: -2, y: 0},
        x: { min: -5, max: 5, step: 0.1 },
        y: { min: 0, max: 5, step: 0.1 },
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

    return <>
        { perfVisible && <Perf openByDefault trackGPU={ true } position="bottom-right" /> }

        <OrbitControls makeDefault />

        <directionalLight position={[ 1, 2, 3 ]} intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <mesh position={[ position.x, position.y, 0 ]} scale={ choice }  visible={ visible }>
            <sphereGeometry />
            <meshStandardMaterial color={ color } />
        </mesh>

        <mesh position-x={ 2 } scale={ scale }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh position-y={ -1 } rotation-x={ -Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}
