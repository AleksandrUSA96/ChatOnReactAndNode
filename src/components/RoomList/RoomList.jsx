import React from "react";
import Room from "./Room";
import Style from "./roomList.module.css";
import Chat from "../Chat/Chat";

const RoomList = ({state, onEntrance, setMessageHandler}) => {
    return (
        <div className={Style.rooms__wrapper}>
            <div className={Style.room__list__wrapper}>
                <h3 className={Style.room__list__header}>Room List</h3>
                <hr/>
                {state.roomsList.length && state.roomsList.map((room, index) => <Room key={index}
                                                                                      room={room}
                                                                                      onEntrance={onEntrance}
                                                                                      name={state.name}
                                                                                      roomId={state.roomId}
                />)}
            </div>
            <Chat state={state} setMessageHandler={setMessageHandler}/>
        </div>
    )
}

export default RoomList;