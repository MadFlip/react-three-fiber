import { MeshReflectorMaterial, OrbitControls, TransformControls, PivotControls, Html, Text, Float } from '@react-three/drei'
import { useRef } from 'react'

export default function Experience() {
  const cube = useRef()
  const sphere = useRef()

  return <>
    <OrbitControls makeDefault />
    <directionalLight position={[ 1, 2, 3 ]} intensity={ 1.5 } />
    <ambientLight intensity={ 0.5 } />

    <mesh position-y={ -1 } rotation-x={ -Math.PI * 0.5 }>
      <planeGeometry args={[5, 5]} />
      {/* <meshStandardMaterial color='#0f0'/> */}
      <MeshReflectorMaterial color='#0f0' resolution={ 1024 }
        blur={[ 100, 100 ]}
        mixBlur={ 0.75 }
        mirror={ 0.25 }
        ></MeshReflectorMaterial>
    </mesh>

    <PivotControls 
      anchor={[ 0, 0, 0 ]}
      depthTest={ false }
      lineWidth={ 2 }
      axisColors={[ '#9381ff', '#ff4d6d', '#7ae582' ]}
      scale={ 1 }
      // fixed={ true }
      >
      <mesh ref={ sphere } position-x={ -2 }>
        <sphereGeometry/>
        <meshStandardMaterial color='#f00' />
        <Html
          position={[ 0, 1.4, 0 ]}
          wrapperClass='label'
          center
          distanceFactor={ 10 }
          occlude={ [ sphere, cube ] }
          >Sphere</Html>
      </mesh>
    </PivotControls>

    {/* <TransformControls object={ cube }/> */}

    <mesh ref={ cube } rotation-y={ Math.PI * 0.25 } position-x={ 1.5 } scale={ 0.5 }>
      <boxGeometry args={[2, 2]} />
      <meshStandardMaterial color='#ff0' />
      <Html
          position={[ 0, 2, 0 ]}
          wrapperClass='label'
          center
          distanceFactor={ 10 }
          occlude={ [ sphere, cube ] }
          >Cube</Html>
    </mesh>
    <Float speed={ 5 }
           floatIntensity={ 2 }>
      <Text
        position={[ 0, 1, 0]}
        font='./bangers-v20-latin-regular.woff'
        fontSize={ 0.6 }
        maxWidth={ 1 }
        color='salmon'
        textAlign='center'
        >Hello R3F!
        </Text>
      </Float>
  </>
}
