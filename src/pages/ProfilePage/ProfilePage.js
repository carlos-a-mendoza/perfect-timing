import axios from "axios";
import "./ProfilePage.scss";
import {useState, useEffect} from "react";
import profilepic from "../../assets/images/profile1.JPG";

function ProfilePage () {

    //Make a get request to users table
    //Grab First/ Last Name

    const [userInfo, setUserInfo] = useState(null);

    useEffect(()=>{
        axios
        .get("http://localhost:8080/users/info/1")
        .then((response)=>{
            setUserInfo(response.data)
            console.log(response.data)
        })
    },[])

    let userInterests = []
    let userGroups =[]

    if(userInfo){
        userInterests = JSON.parse(userInfo.user_interests)
        userGroups = JSON.parse(userInfo.user_groups)
        console.log(userInterests)  
    }
    

    if(userInfo === null){
        return <p>Loading...</p>
    }

    return(
        <div className="profile">
            <article className="profile__container">
                <div>
                    <div className="profile__header">
                        {/* <img src={profilepic} alt="user's profile" className="profile__image"/> */}
                    </div>
                    <div className="profile__frame">
                        <div className="profile__frame--inner profile__frame--inner">
                            <p className="profile__greeting">Heyooo!</p>
                        </div>
                    </div>
                </div>
                <div className="profile__user-info">
                    <p className="profile__user-name"><span className="profile__label">Name: </span>{userInfo.user_first_name} {userInfo.user_last_name}</p>
                    <p className="profile__user-birthday"><span className="profile__label">Birthday: </span>{userInfo.user_birthday}</p>
                    <p className="profile__user-city"><span className="profile__label">City: </span>{userInfo.user_city}</p>
                </div>
            </article>
            <article className="profile__subcontainer">
                <h3 className="profile__subheading">About Me: </h3>
                <p className="profile__description">{userInfo.user_description}</p>
            </article>
            <article className="profile__wrapper">
                <div className="profile__interests">
                    <h3 className="profile__subheading">Interests:</h3>
                    {userInterests.map((interest)=>{
                        return(
                            <p className="profile__hobby">{interest}</p>
                        )
                    })}
                </div>
                <div>
                    <h3 className="profile__subheading">Groups:</h3> 
                        {userGroups.map((group)=>{
                            return(
                                <p className="profile__group">{group}</p>
                            )
                        })}
                </div>
            </article>    
        </div>
    )
}

export default ProfilePage;