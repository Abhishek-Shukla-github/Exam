import React, { useEffect, useState } from 'react'

export default function CountDown(props) {
    
    const calculateTimeLeft = () => {
        let difference = props.date - new Date();
        let timeLeft = {};
        
        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            }
        } else {
            timeLeft = -1
        }
      return timeLeft;
    }
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())
    useEffect(()=>{
        if(timeLeft!=-1)
            setTimeout(() => {setTimeLeft(calculateTimeLeft())}, 1000)
        else{
            console.log(timeLeft)
             props.submitPaper()
        }
        // console.log(1)
    },[timeLeft])

    return (
        <div>
            {
                timeLeft!==null ? 
                    Object.keys(timeLeft).length === 0
                    ? <div>
                        0:0:0
                        Your time is up   
                     </div>
                    : 
                    <div>
                        {timeLeft.hours<10?('0'+timeLeft.hours):timeLeft.hours}:{timeLeft.minutes<10?('0'+timeLeft.minutes):timeLeft.minutes}:{timeLeft.seconds<10?('0'+timeLeft.seconds):timeLeft.seconds} 
                    </div>
                : ''
            }
        </div>
    )
}
