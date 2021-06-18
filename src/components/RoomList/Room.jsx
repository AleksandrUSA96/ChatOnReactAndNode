import React, {useState} from "react";
import User from "./User";
import Style from "./roomList.module.css";
import {NavLink} from "react-router-dom";

const Room = ({room, onEntrance, name, roomId}) => {
    const [usersVisible, setUsersVisible] = useState(false);
    const clickHandler = () => {
        usersVisible ? setUsersVisible(false) : setUsersVisible(true)
    }

    return (
        <div className={Style.room__wrapper}>
            <h3 className={Style.room__name}>
                {room.name} ({room.val.length})
            </h3>
            {
                usersVisible && <ol className={Style.user__list__wrapper}>
                    {room.val.map((user, index) => <User key={index}
                                                             user={user}
                    />)}
                </ol>
            }
            <div className={Style.button__wrapper}>
                <button onClick={clickHandler}>Users of rooms</button>
                {roomId !== room.name ?
                    <NavLink to={'/roomlist/' + room.name}>
                        <button onClick={() => onEntrance({
                            name: name,
                            roomId: room.name
                        })}>Join
                        </button>
                    </NavLink> : ''}
            </div>
        </div>
    )
}

export default Room;