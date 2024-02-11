import { Html, Float, Environment, useGLTF, PresentationControls, ContactShadows, Text, useMask, Mask } from '@react-three/drei'
import { useLayoutEffect, useRef } from 'react'

export default function Experience()
{
  const computer = useGLTF('/macbook_model.gltf')
  const myText = useRef()
  return <>
    <Environment preset="city" />
    <color args={[ '#082caf' ]} attach="background" />

    <PresentationControls
      global
      rotation={[ 0.13, 0.1, 0 ]}
      polar={[ -0.4, 0.2 ]}
      azimuth={[ -1, 0.75 ]}
      config={{ mass: 2, tension: 500 }}
      snap={{ mass: 4, tension: 300 }}
      >
      {/* Floating animation */}
      <Float rotationIntensity={ 0.4 }>
        {/* Light on keyboard */}
        <rectAreaLight
          width={ 2.5 }
          height={ 1.65 }
          intensity={ 65 }
          color={ '#1954ed' }
          rotation={[ 0.1, Math.PI, 0 ]}
          position={[ 0, 0.55, -1.15 ]}
        />
        
        {/* Laptop model */}
        <primitive
          object={computer.scene}
          position-y={ -1.2 }>
          {/* Screen iframe */}
          <Mask id={1} colorWrite={false} depthWrite={false} castShadow receiveShadow
            geometry={computer.scene.children[0].geometry}
          >
          <Html
            transform
            wrapperClass='htmlScreen'
            distanceFactor={ 1.17 }
            position={[ 0, 1.56, -1.4 ]}
            rotation-x={ -0.257 }
            occlude='blending'
            >
            <iframe src="https://bleech.de" />
          </Html>
          </Mask>
        </primitive>
        <Text ref={myText}
          font='./bangers-v20-latin-regular.woff'
          fontSize={ 0.75 }
          position={[ 1, 0.75, 0.75 ]}
          rotation-y={ -1.25 }
          maxWidth={ 2 }
          textAlign='center'
          color='#27d1b4'
        >Mykola Bleech</Text>
      </Float>
    </PresentationControls>

    <ContactShadows
      position-y={ -1.4 }
      opacity={ 0.4 }
      scale={ 5 }
      blur={ 2.4 }
      />
  </>
}
