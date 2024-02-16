import { Grid, OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import { Level } from './Level.jsx'
import { Player } from './Player.jsx'
import { Physics } from '@react-three/rapier'
import useGame from './stores/useGame.jsx'

export default function Experience()
{
    const blocksCount = useGame((state) => state.blocksCount)
    const blocksSeed = useGame((state) => state.blocksSeed)

    return <>

        <OrbitControls makeDefault />
        <color attach="background" args={['slategrey']} />
        <fog attach="fog" args={['slategrey',1, 20]} />
        <Physics debug = { 0 }>
          <Lights />
          <Level count={ blocksCount } seed={ blocksSeed } />
          <Player />
        </Physics>
        {/* <Grid infiniteGrid={ true } position-y={ -0.01 }/> */}
    </>
}
