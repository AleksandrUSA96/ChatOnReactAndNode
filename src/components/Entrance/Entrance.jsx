import React, {useEffect, useState} from "react";
import {entranceAPI} from "../API/api";
import Style from "./Entrance.module.css"
import {useHistory} from "react-router-dom";

const Entrance = ({onEntrance, roomIdFromURL}) => {
    const [name, setName] = useState('');
    const [roomId, setRoomId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (roomIdFromURL !== null) setRoomId(roomIdFromURL);
        if (isClicked) {
            (async () => {
                setIsLoading(true);
                const info = {
                    name,
                    roomId
                };
                //Send post request for create room.
                await entranceAPI.sendInformation(info);
                onEntrance(info);
                history.push('/roomlist/' + roomId);
            })();
        }
    }, [isClicked])

    return (
        <div className={Style.entrance__wrapper}>
            <input name={'name'} type="text" placeholder={`What's your name?`} value={name}
                   onChange={e => setName(e.target.value)}/>
            <input name={'room'} type="text" placeholder={`What's a room name?`} value={roomId}
                   onChange={e => setRoomId(e.target.value)}/>
            <button disabled={isLoading}
                    onClick={() => ((name.trim() !== '') && (roomId.trim() !== '')) && setIsClicked(true)}>{
                isLoading ? 'Entry...' : 'Entrance'}</button>
        </div>
    )
}

export default Entrance;