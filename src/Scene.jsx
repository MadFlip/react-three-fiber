import * as THREE from 'three'
import React, { Suspense, useEffect, useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Environment, MeshDistortMaterial, ContactShadows } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { animated } from '@react-spring/three'
import Dots from './Dots'
import WireframeMesh from './Wireframe'
import ChristmasThree from './ChristmasTree'
import { useControls, folder } from 'leva'

// React-spring animates native elements, in this case <mesh/> etc,
// but it can also handle 3rd–party objs, just wrap them in "a".
const AnimatedMaterial = animated(MeshDistortMaterial)

export default function Scene({ setBg }) {
  const sphere = useRef()
  const light = useRef()
  const [mode, setMode] = useState(false)
  const [down, setDown] = useState(false)
  const [hovered, setHovered] = useState(false)
  
  const bubbleControls = useControls({
    'Bubble': folder({
      scaleDefault: {
        value: 0.8,
        min: 0.1,
        max: 2,
        step: 0.1,
      },
      scaleOnHover: {
        value: 0.9,
        min: 0.1,
        max: 2,
        step: 0.1,
      },
      colorDefault: '#ffffff',
      colorOnHover: '#36d0b4',
      colorOnDark: '#1954ed',
      distortDefault: {
        value: 0.3,
        min: 0,
        max: 1,
        step: 0.01,
      },
      distortOnHover: {
        value: 0.75,
        min: 0,
        max: 1,
        step: 0.01,
      },
      speedDefault: {
        value: 1,
        min: 0,
        max: 5,
        step: 0.01,
      },
      speedOnHover: {
        value: 2.5,
        min: 0,
        max: 5,
        step: 0.01,
      },
      clearcoat: {
        value: 0,
        min: 0,
        max: 1,
        step: 0.01,
      },
      clearcoatRoughness: {
        value: 0,
        min: 0,
        max: 1,
        step: 0.01,
      },
      metalness: {
        value: 0.1,
        min: 0,
        max: 1,
        step: 0.01,
      },
      envMapIntensity: {
        value: 0.8,
        min: 0,
        max: 1,
        step: 0.01,
      },
    })
  })

  const bgControls = useControls({
    'Background': folder({
      light: '#f3f6fe',
      dark: '#0a2caf',
    }),
  })

  const lightControls = useControls({
    'Light': folder({
      ambientIntensity: {
        value: 0.02,
        min: -1,
        max: 2,
        step: 0.01,
      },
      pointLightColor: '#36d0b4',
      pointLightIntensity: {
        value: 1,
        min: 0,
        max: 2,
        step: 0.01,
      }
    })
  })

  const otherControls = useControls({
    'Other Elements': folder({
      cursorColor: '#36d0b4',
      enableWireframe: false,
      enableDotsRipple: false,
      christmasMode: false,
    })
  })

  // Change cursor on hovered state
  useEffect(() => {
    document.body.style.cursor = hovered
      ? 'none'
      : `url('data:image/svg+xml;base64,${btoa(
          '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="10" fill="' + otherControls.cursorColor + '"/></svg>'
        )}'), auto`
  }, [hovered])

  // Make the bubble float and follow the mouse
  // This is frame-based animation, useFrame subscribes the component to the render-loop
  useFrame((state) => {
    light.current.position.x = state.mouse.x * 50
    light.current.position.y = state.mouse.y * 50

    // if (sphere.current) {
      // Rotate the bubble
      // sphere.current.rotation.x = THREE.MathUtils.lerp(hovered ? state.mouse.x * 5 : sphere.current.rotation.x, THREE.MathUtils.degToRad(hovered ? 90 : 0), 0.05)
      // sphere.current.rotation.y = THREE.MathUtils.lerp(hovered ? state.mouse.y * 5 : sphere.current.rotation.y, THREE.MathUtils.degToRad(hovered ? 90 : 0), 0.05)
    // }
  })

  // Springs for color and overall looks, this is state-driven animation
  // React-spring is physics based and turns static props into animated values
  const [{ wobble, coat, color, wireframeScale }] = useSpring(
    {
      wobble: down ? bubbleControls.scaleOnHover + 0.2 : hovered ? bubbleControls.scaleOnHover : bubbleControls.scaleDefault,
      coat: mode && !hovered ? bubbleControls.clearcoat : 0,
      color: hovered ? bubbleControls.colorOnHover : mode ? bubbleControls.colorOnDark : bubbleControls.colorDefault,
      wireframeScale: hovered ? bubbleControls.scaleOnHover + 0.2 : bubbleControls.scaleDefault + 0.2,
      config: (n) => n === 'wobble' && hovered && { mass: 2, tension: 1000, friction: 10 }
    },
    [mode, hovered, down]
  )

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={75}>
        <animated.ambientLight intensity={lightControls.ambientIntensity} />
        <animated.pointLight ref={light} position-z={-15} intensity={hovered ? 0 : lightControls.pointLightIntensity} color={lightControls.pointLightColor}/>
      </PerspectiveCamera>
      <Suspense fallback={null}>
        {!otherControls.christmasMode && <animated.mesh
          ref={sphere}
          scale={wobble}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onPointerDown={() => setDown(true)}
          onPointerUp={() => {
            setDown(false)
            // Toggle mode between dark and bright
            setMode(!mode)
            setBg({ background: !mode ? bgControls.dark : bgControls.light })
          }}>
          <sphereBufferGeometry args={[1, 64, 64]} />
          <AnimatedMaterial 
            distort={hovered ? bubbleControls.distortOnHover : bubbleControls.distortDefault}
            speed={hovered ? bubbleControls.speedOnHover : bubbleControls.speedDefault}
            color={color}
            envMapIntensity={bubbleControls.envMapIntensity}
            clearcoat={coat}
            clearcoatRoughness={bubbleControls.clearcoatRoughness}
            metalness={bubbleControls.metalness}
          />
        </animated.mesh>}
        {otherControls.enableDotsRipple && <Dots color={hovered ? '#36d0b4' : mode ? '#1954ed' : '#f3f6fe'} />}
        {otherControls.enableWireframe && <WireframeMesh color={color} scale={wireframeScale} />}
        {otherControls.christmasMode && <ChristmasThree />}
        <Environment files={ 'hdri/my-dawn.hdr' } />
        <ContactShadows
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, -1.6, 0]}
          opacity={mode ? 0.8 : 0.4}
          width={15}
          height={15}
          blur={2.5}
          far={1.6}
        />
      </Suspense>
    </>
  )
}
