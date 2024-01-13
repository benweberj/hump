import { useEffect, useState } from 'react'

export default function Thruster(props) {
    const [pos, setPos] = useState({x: 100, y: 100 })
    const { thrusting=false, open, power } = props

    function handleMouseMove(e) {
        console.log(e)
        setPos({ x: e.clientX, y: e.clientY })
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove)
    }, [])

    return <div
            style={{
                zIndex: 10,
                position: 'absolute',
                left: `calc(${pos.x}px - 10vh)`,
                top: '48vh',
                height: '40vh',
                transition: 'transform 0.25s ease',
                transform: `scale(${open ? 0 : 1})`,
            }}
        >
            {/* thrusting man */}
            <img src={`img/${thrusting ? 'thrust' : 'stand'}.png`}
                style={{
                    position: 'relative',
                    height: '40vh',
                    zIndex: 10,
                }}
            />
            {/* his shadow */}
            <img src={`img/${thrusting ? 'thrust' : 'stand'}.png`}
                style={{
                    position: 'absolute',
                    height: '40vh',
                    transform: 'translate(-100%, calc(100% - 30px)) rotateX(180deg)',
                    filter: `blur(${8}px)`,
                    opacity: 0.5,
                    zIndex: 9,
                }}
            />
        </div>

    return (
        // <img src={`img/${thrusting ? 'thrust' : 'stand'}.png`}
        <img src={`img/thrust.png`}
            style={{
                zIndex: 10,
                position: 'absolute',
                width: '5vh',
                height: '10vh',
                // transform: `scale(${1 + power/20})`,
                // transformOrigin: 'bottom-center',
                left: `calc(${pos.x}px - 1.5vh)`,
                bottom: '15vh',
                // top: `calc(${pos.y}px - 3vh)`,
            }}
        />
    )
}