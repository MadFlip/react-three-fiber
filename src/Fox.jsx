import { useGLTF, useAnimations, Html } from '@react-three/drei'
import { useEffect, useState } from 'react'

export default function Fox(props) {
    const fox = useGLTF('./Fox/glTF-Binary/Fox.glb')
    const { animations, scene } = fox
    const { actions } = useAnimations(animations, scene)

    useEffect(() => {
        actions.Walk.play()
        setTimeout(() => {
            actions.Run.play()
            actions.Run.crossFadeFrom(actions.Walk, 1)
        }, 2000)
    }, [])

    return (
        <>
            <primitive object={ scene } { ...props } />
        </>
    )
}

useGLTF.preload('./Fox/glTF-Binary/Fox.glb')
