export default function Placeholder(props)
{
    return <>
        <mesh { ...props }>
            <boxGeometry />
            <meshStandardMaterial color="hotpink" wireframe />
        </mesh>
    </>
}
