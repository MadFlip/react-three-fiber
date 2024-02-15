import { Grid, OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import { Level } from './Level.jsx'
import { Player } from './Player.jsx'
import { Physics } from '@react-three/rapier'

export default function Experience()
{
    return <>

        <OrbitControls makeDefault />
        <color attach="background" args={['slategrey']} />
        <fog attach="fog" args={['slategrey',1, 20]} />
        <Physics debug = { 0 }>
          <Lights />
          <Level count={ 20 } />
          <Player />
        </Physics>
        {/* <Grid infiniteGrid={ true } position-y={ -0.01 }/> */}
    </>
}
