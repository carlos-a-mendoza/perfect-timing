import "./LoginPage.scss";
import logo from "../../assets/images/logo/Logo.JPG";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Alert from "../../Components/Alert/Alert";

export default function LoginPage(){

    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    const isFormValid = () =>{
        if (!username || !password){
            alert("All fields are required")
            return false;
        }

        if (password.length < 8){
            alert("The information you have entered is incorrect. Please try again.")
            return false;
        }
        return true
    }

    const handleUser = (event) =>{
        event.preventDefault();
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        event.preventDefault();
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(isFormValid()){
            navigate("/")
        }
    }

    return(
        <div className="login">
            <div className="login__container">
                <div className="login__container--main">
                    <img src={logo} alt="Company Logo"/>
                    <h3 className="login__heading">Welcome to Perfect Timing! Please Sign In!</h3>
                    <div className="login__frame">
                        <article className="login__wrapper">
                            <h3 className="login__label">Username:</h3>
                            <input type="text" name="login__user" className="login__input" onChange={handleUser} value={username} placeholder="Insert Username"></input>
                            <h3 className="login__label">Password:</h3>
                            <input type="password" name="login__password" className="login__input" onChange={handlePassword} value={password} placeholder="Insert Password"></input>
                        
                        <button onClick={handleSubmit} className="login__button">Sign in</button>
                        <div className="login__subcontainer">
                            <a href="#" className="login__link">Forgot Password</a>
                            <a href="#" className="login__link">Sign Up</a>
                        </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    )
}