import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import { useSpring, animated } from '@react-spring/three'

export default function Experience()
{
    const cube = useRef()
    const defaultColor = 'mediumpurple'
    const [clicked, setClicked] = useState(false)
    const [getScale, setScale] = useSpring(() => ({ scale: 1 }), [])
    const [getColor, setColor] = useSpring(() => ({ color: defaultColor }), [])

    useFrame((_, delta) =>
    {
        cube.current.rotation.y += delta * 0.2
    })

    useEffect(() => {
      setScale.start(clicked ?
        { scale: 2 } :
        { scale: 1 }
      )

      setColor.start(clicked ?
        { color: 'hotpink' } :
        { color: defaultColor }
      )
    }, [clicked])

    return <>
        <color args={[ '#333333' ]} attach="background" />
        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />

        <mesh position-x={ - 2 }
            onClick={(e) => {
              e.stopPropagation()
              setClicked(false)}
            }
            onPointerEnter={(e) => e.stopPropagation()}
            >
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <animated.mesh ref={ cube } position-x={ 2 } scale={ getScale.scale }
          onClick={() => {setClicked(!clicked)} }
          onPointerMissed={() => setClicked(false)}
          onPointerEnter={() => document.body.style.cursor = 'pointer'}
          onPointerLeave={() => document.body.style.cursor = ''}
          >
            <boxGeometry />
            <animated.meshStandardMaterial color={ getColor.color } />
        </animated.mesh>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}
