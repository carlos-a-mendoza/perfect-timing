import "./Groups.scss";
import axios from "axios";
import {useState, useEffect} from "react";

export default function Groups (){

    const [groupInfo, setGroupInfo] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:8080/users/groups/allusers")
        .then((response) =>{
            setGroupInfo(response.data)
        })
        .catch((error)=>{
            console.error(`Cannot obtain group information`, error)
        })
    },[])

    // const handleHover = (event) => {
    //     event.target.nextSibling.style.visibility = "visible";
    // }

    // const handleHoverExit = (event) => {
    //     event.target.nextSibling.style.visibility = "hidden";
    // }
    

    console.log(groupInfo)

    if(!groupInfo){
        return <p> loading...</p>
    }

    return(
        <div>
            <div className="group">
               {groupInfo.map((group)=>(
                <div key={group.group_name} className="group__container">
                    <h2 className="group__heading">{group.group_name}:</h2>
                        <div className="group__subcontainer">
                        {group.users
                        .filter((user) => user.id !== 1)
                        .map((user)=>(
                        <div className="group__subwrapper">
                            {/* <img src={require(`../../assets${user.user_image_url}`)} alt={`${user.user_first_name} profile avatar`} className="group__member-avatar" onMouseEnter={handleHover} onMouseLeave={handleHoverExit}/> */}
                            <img src={require(`../../assets${user.user_image_url}`)} alt={`${user.user_first_name} profile avatar`} className="group__member-avatar"/>
                            {/* < div className="group__name-container"> */}
                            <p key={user.id} className="group__members">{user.user_first_name} {user.user_last_name[0]}.</p> 
                            {/* </div> */}

                        </div>
                        ))}
                        </div>
                </div>
               ))}
            </div>

        </div>
    )
}