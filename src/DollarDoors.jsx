import { useState, useEffect } from 'react'
import styled from 'styled-components'

import Thruster from './Thruster'

export default function DollarDoors(props) {
    const [doorsOpen, setDoorsOpen] = useState(false)
    const [power, setPower] = useState(0)
    const [closeDoorTimer, setCloseDoorTimer] = useState(null)
    const [thrusting, setThrusting] = useState(false)
    
    const thrustThreshold = 50
    const closeForce = 3
    const closeFrequency = 50
    const openForce = 12

    useEffect(() => {
        if (doorsOpen) {
            console.log('doors opened')
            setPower(0)
            document.getElementById('bg').style.filter = 'none'
            console.log(document.getElementById('bg').style.filter)
            clearInterval(closeDoorTimer)
            setCloseDoorTimer(null)
        } else {
            document.getElementById('bg').style.filter = 'blur(5px)'
        }
    }, [doorsOpen])

    function incrementPower() {
        setPower(p => {
            if (p >= thrustThreshold) {
                setDoorsOpen(true)
            }
            return p+openForce
        })
        
    }

    function decrementPower() {
        setPower(p => Math.max(p-closeForce, 0))
    }

    function handleMousePress(e, stance) {
        if (stance === 'thrust') {
            document.getElementById('doors').style.animation = 'shake 0.25s ease'
            console.log('thrusting')
            setThrusting(true)
            incrementPower()
        } else { // standing
            document.getElementById('doors').style.animation = 'none'
            console.log('standing')
            setThrusting(false)
        }
        // document.body.style.cursor = `url("/img/${stance}.png", auto)`
        // document.body.style.cursor = `url(img/${stance}.png), auto`
        // document.getElementById('doors').style.animation = (stance == 'thrust') ? 'shake 0.25s ease' : 'none'
        // document.body.style.cursor = stance==='stand' ? 'crosshair' : 'grab'

    }


    function resetDoors() {
        setDoorsOpen(false)
        setPower(0)
        clearInterval(closeDoorTimer)
        setCloseDoorTimer(setInterval(decrementPower, closeFrequency))
    }

    useEffect(() =>  {
        // press escape to close doors
        document.addEventListener('keydown', e =>  e.key == 'Escape' && resetDoors())
        // set thrusting stance as cursor 
        const handleThrust = (e) => handleMousePress(e,'thrust')
        document.addEventListener('mousedown', handleThrust)
        // set standing stance as cursor 
        const handleStand = (e) => handleMousePress(e,'stand')
        document.addEventListener('mouseup', handleStand)

        resetDoors()

        return () => {
            clearInterval(closeDoorTimer)
            setCloseDoorTimer(null)
            document.removeEventListener('mouseup', handleStand)
            document.removeEventListener('down', handleThrust)
        }
    }, [])

    return (
        <_DollarDoors id='doors' XXXonClick={() => setDoorsOpen(true)} open={doorsOpen} power={power} percent={100 * (power/thrustThreshold)}>
            <div id='power-bar-container'>
                <div id='power-bar' />
            </div>
            <img id='left' src='img/left_door.png' />
            <img id='right' src='img/right_door.png' />
            <Thruster thrusting={thrusting} open={doorsOpen} power={power} />
            {/* <h1 style={{ position: 'absolute', left: 20, top: 20 }}>power: {power}</h1> */}
        </_DollarDoors>
    )
}

const _DollarDoors = styled.div`
    z-index: 1;
    cursor: none;
    
    #left, #right {
        height: 100vh;
        position: absolute;
        top: 0;
        transition: transform 1s ease;
        min-width: 50vw;
        user-select: none;
        user-drag: none;
    }

    #left {
        right: calc(50vw + ${props => props.power}px);
        transform: translateX(${props => props.open ? '-50vw' : '0px'});
    }

    #right {
        left: calc(50vw + ${props => props.power}px);
        transform: translateX(${props => props.open ? '50vw' : '0px'});
    }

    #power-bar-container {
        z-index: 2;
        width: 100vw;
        height: 10px;
        position: absolute;
        top: 0;
        left: 0;
        opacity: ${props => props.open ? 0 : 1};

        #power-bar {
            transition: width 0.25s ease;
            height: 100%;
            width: ${props => props.percent}%;
            background: white;
        }
    }

    @keyframes shake {
        0%, 100% {
          transform: translateX(0);
        }
        10%, 30%, 50%, 70%, 90% {
          transform: translateX(-10px);
        }
        20%, 40%, 60%, 80% {
          transform: translateX(10px);
        }
      }
`