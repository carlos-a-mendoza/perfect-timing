import "./PeopleYouMayKnow.scss";
import axios from "axios";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import photo from "../../assets/images/profile7.JPG";

function PeopleYouMayKnow () {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>{
        axios.get("http://localhost:8080/users/info")
        .then((response) => {
            const allUsers = response.data;
            const filteredUsers = allUsers.filter(user => user.id !== 1 && user.id !== 2 && user.id !== 3 && user.id !== 4);
            const selectUsers = filteredUsers.slice(2,5);

            setUsers(selectUsers);
        })
        .catch((error) => {
            console.error("Error: Unable to obtain users", error);
        })
    }, []);

    const handleConnect =(userId) =>{

        return(event) =>{
        event.preventDefault();
        const newUser = {
            group_name: "Friends",
            user_id: userId
        }

        axios
            .post("http://localhost:8080/users/addusertogroup", newUser)
            .then((response) => {
                console.log("User added to the group", response.data)
            })
            .catch((error)=>{
                return console.error("Error: Unable to add user to group", error)
            });
        return navigate("/my-calendar")
    }};

    console.log(users)
    // console.log(users[0].user_image_url)

    return(
        <div className="connections">
            <h3 className="connections__heading">People You May Know</h3>
            <div className="connections__container">
                {users.map(user =>{
                    return(
                        <article className="connections__user-card" key={user.id}>
                            {/* <img src={`${user.user_image_url}`} alt={`${user.user_first_name} profile avatar`} className="connections__image"/> */}
                            <img src={photo} alt={`${user.user_first_name} profile avatar`} className="connections__image"/>
                            <p className="connections__name">{user.user_first_name} {user.user_last_name}</p>
                            <button className="connections__button" onClick={handleConnect(user.id)}>Connect</button>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default PeopleYouMayKnow;