import "./PeopleYouMayKnow.scss";
import axios from "axios";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

function PeopleYouMayKnow () {

    const [users, setUsers] = useState([]);
    const [connectedUserIds, setConnectedUserIds] = useState([]);
    const navigate = useNavigate();

    const newConnections=()=> {
        axios.get("http://localhost:8080/users/info")
        .then((response) => {
            const allUsers = response.data;
            const filteredUsers = allUsers.filter(user => user.id !== 1 && user.id !== 2 && user.id !== 3  && !connectedUserIds.includes(user.id));
            const selectUsers = filteredUsers.slice(0,6);

            setUsers(selectUsers);
        })

        .catch((error) => {
            console.error("Error: Unable to obtain users", error);
        })
    };

    useEffect(()=>{
        if(connectedUserIds.length === 0){
            newConnections();
        }
    }, [connectedUserIds])

    useEffect(() => {
        const storedConnectedUserIds = localStorage.getItem("connectedUserIds");
        if (storedConnectedUserIds){
            setConnectedUserIds(JSON.parse(storedConnectedUserIds))
        }else setConnectedUserIds([])
    }, []);

    useEffect(()=>{
        localStorage.setItem("connectedUserIds", JSON.stringify(connectedUserIds))
    }, [connectedUserIds]);


    const handleConnectFriends =(userId) =>{

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
                setConnectedUserIds((prevIds)=> [...prevIds, userId])
                newConnections();
            })
            .catch((error)=>{
                return console.error("Error: Unable to add user to group", error)
            });
        // return navigate("/my-calendar")
    }};

    const handleConnectWork =(userId) =>{

        return(event) =>{
        event.preventDefault();
        const newUser = {
            group_name: "Work",
            user_id: userId
        }

        axios
            .post("http://localhost:8080/users/addusertogroup", newUser)
            .then((response) => {
                console.log("User added to the group", response.data)
                setConnectedUserIds((prevIds)=> [...prevIds, userId])
                newConnections();
            })
            .catch((error)=>{
                return console.error("Error: Unable to add user to group", error)
            });
        // return navigate("/my-calendar")
    }};

    
    return(
        <div className="connections">
            <h3 className="connections__heading">People You May Know</h3>
            <div className="connections__container">
                {users.map(user =>{
                    if(!connectedUserIds.includes(user.id)){
                        return(
                            <article className="connections__user-card" key={user.id}>
                                <img src={require(`../../assets${user.user_image_url}`)} alt={`${user.user_first_name} profile avatar`} className="connections__image"/>
                                <p className="connections__name">{user.user_first_name} {user.user_last_name}</p>
                                <div className="connections__container--button">
                                    <button className="connections__button" onClick={handleConnectFriends(user.id)}>Connect for Friends</button>
                                    <button className="connections__button connections__button--right" onClick={handleConnectWork(user.id)}>Connect for Work</button>
                                </div>
                            </article>
                        );
                    }else{
                        return null;
                    }
                })}
            </div>
        </div>
    )
}

export default PeopleYouMayKnow;