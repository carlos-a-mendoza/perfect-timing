import './Alert.scss';
import { useState, useEffect } from "react";

function Alert({message, setMessage}) {
    const [isVisible,setVisible] = useState(false);
    
    useEffect(() => {
        if (message){
            setVisible(true);}
    },[message])

    console.log(`Message: ${message}  isVisible: ${isVisible}`);
    return (
            <div className={`alert-wrapper ${isVisible && `alert-wrapper--hidden`}`}>
                <div className="alert">
                    <h1 className="alert__text">ERROR</h1>
                    <span className="alert__message" >{message}</span>
                    <button className="alert__button" onClick={()=>{setVisible(false); setMessage("");}}>Continue</button>
                </div>
            </div>
    )
}

export default Alert;