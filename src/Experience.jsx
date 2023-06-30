import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

export default function Experience() {
  const groupRef = useRef()
  const cubeRef = useRef()

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 2
    cubeRef.current.rotation.y += delta * 2
  })

  return <>
    <mesh position-y={ -1 } rotation-x={ -Math.PI * 0.5 }>
      <planeGeometry args={[5, 5]} />
      <meshBasicMaterial color='#0f0'/>
    </mesh>
    <group ref={ groupRef }>
      <mesh position-x={ -2 }>
        <sphereGeometry args={[1, 16, 16]}/>
        <meshBasicMaterial color='#f00' />
      </mesh>
      <mesh ref={ cubeRef } rotation-y={ Math.PI * 0.25 } position-x={ 1.5 } scale={ 0.5 }>
        <boxGeometry args={[2, 2]} />
        <meshBasicMaterial color='#ff0' />
      </mesh>
    </group>
  </>
}
