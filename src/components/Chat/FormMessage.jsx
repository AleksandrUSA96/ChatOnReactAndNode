import React, {useEffect, useState} from "react";
import Style from "./Chat.module.css";
import moment from "moment";
import socket from "../../SocketIo/socketIo";
import {socketAPI} from "../API/api";

const FormMessage = ({state, setMessageHandler}) => {
    const [text, setText] = useState('');
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        let date = moment();
        const messageInfo = {
            user: state.name,
            text: text,
            date: date,
        }
        if (isSending) {
            //Send socket for add info about message in current room.
            socketAPI.sendMessage([messageInfo, state.roomId]);
            //Set own message in the state for to display
            setMessageHandler([messageInfo, socket.id]);
            setText('');
            setIsSending(false);
        }
    }, [isSending])

    return (
        <form className={Style.form__message} onSubmit={event => event.preventDefault()}>
                <textarea className={Style.textarea} value={text} onChange={(e) => setText(e.target.value)} name="chat"
                          id="chat" cols="100" rows="5">''</textarea>
            <button className={Style.button__send} onClick={() => (text.trim() !== '') && setIsSending(true)}>Send
            </button>
        </form>
    )
}

export default FormMessage;