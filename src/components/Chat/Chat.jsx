import React, {useEffect, useRef} from "react";
import Style from "./Chat.module.css";
import Message from "./Message";
import FormMessage from "./FormMessage";

const Chat = ({state, setMessageHandler}) => {
    const messagesRef = useRef(null);
    useEffect(() => {
        messagesRef.current.scrollTo(0, 999999);
    }, [state.messages]);

    return (
        <div className={Style.chat__wrapper}>
            <div ref={messagesRef} className={Style.messages}>
                {state.messages.length !== 0 ? state.messages.map((message, index) => (<Message key={index} message={message} />)) : ''}
            </div>
            <FormMessage state={state} setMessageHandler={setMessageHandler} />
        </div>
    )
}

export default Chat;