import { DoubleSide } from 'three'
import { useRef, useMemo, useEffect } from 'react'

export default function CustomObject() {
  const geoRef = useRef()

  const verticesCount = 10 * 3
  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3)

    for(let i = 0; i < verticesCount * 3; i++)
      positions[i] = (Math.random() - 0.5) * 3

    return positions
  }, [])

  useEffect(() => {
    geoRef.current.computeVertexNormals()
  }, [])
  // if empty array is passed as second argument, useEffect will only run once

  return <mesh>
    <bufferGeometry ref={ geoRef }>
      <bufferAttribute 
        attach="attributes-position"
        count={ verticesCount }
        itemSize={ 3 }
        array={ positions }
      />
    </bufferGeometry>
    
    <meshStandardMaterial color='#0ff' side={ DoubleSide } />
  </mesh>
}
