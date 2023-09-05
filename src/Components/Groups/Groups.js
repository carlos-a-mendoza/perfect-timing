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
                        {group.users.map((user)=>(
                           <p key={user.id} className="group__members">{user.user_first_name} {user.user_last_name[0]}.</p> 
                        ))}
                        </div>
                </div>
               ))}
            </div>

        </div>
    )
}