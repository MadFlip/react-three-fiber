import { extend, useFrame, useThree } from "@react-three/fiber"
import { useRef } from "react"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import CustomObject from "./CustomObject"

extend({ OrbitControls })

export default function Experience() {
  const groupRef = useRef()
  const cubeRef = useRef()
  const { camera, gl } = useThree()

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 2
  })

  return <>
    <orbitControls args={[ camera, gl.domElement ]} />
    <directionalLight position={[ 1, 2, 3 ]} intensity={ 1.5 } />
    <ambientLight intensity={ 0.5 } />

    <mesh position-y={ -1 } rotation-x={ -Math.PI * 0.5 }>
      <planeGeometry args={[5, 5]} />
      <meshStandardMaterial color='#0f0'/>
    </mesh>

    <group ref={ groupRef }>
      <mesh position-x={ -2 }>
        <sphereGeometry args={[1, 16, 16]}/>
        <meshStandardMaterial color='#f00' />
      </mesh>
      <mesh ref={ cubeRef } rotation-y={ Math.PI * 0.25 } position-x={ 1.5 } scale={ 0.5 }>
        <boxGeometry args={[2, 2]} />
        <meshStandardMaterial color='#ff0' />
      </mesh>
    </group>

    <CustomObject />
  </>
}
