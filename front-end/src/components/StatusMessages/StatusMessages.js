import React, { useState, forwardRef, useImperativeHandle } from 'react';
import './StatusMessages.css';
import Warning from '../../assets/Icons/Warning';
import Check from '../../assets/Icons/Check';


const StatusMessages = forwardRef((props, ref) => {
    const [messages, setMessanges] = useState([]);
    const [forceUpdate, setForceUpdate] = useState(false);

    useImperativeHandle(ref, () => ({
        appendNewMessage,
    }));

    const appendNewMessage = message => {
        const timeStamp = new Date().getTime();
        setMessanges([...messages, { ...message, timeStamp }]);
        setTimeout(() => {
            setForceUpdate(!forceUpdate);
        }, 4000);
    }

    const getFinishTime = (t) => {
        let date = new Date();
        date = new Date().setSeconds(date.getSeconds());
        return t && date - t < 4000;
    }

    const primaryColorLiteral = {
        'ERROR': () => '#DB2828',
        'WARNING': () => '#FBBD08',
        'SUCCESS': () => '#1CA55399',
    }

    const secundaryColorLiteral = {
        'ERROR': () => '#DB282833',
        'WARNING': () => '#FBBD0833',
        'SUCCESS': () => '#B7D32D33',
    }

    const iconLiteral = {
        'ERROR': () => <Warning className="icon" fill="#DB2828" />,
        'WARNING': () => <Warning className="icon" fill="#FBBD0899" />,
        'SUCCESS': () => <Check className="icon" fill="#1CA55399" />,
    }

    return (
        <div className='messagesList'>
            {messages.map(message => getFinishTime(message.timeStamp) &&
                <div key={message.timeStamp} className='messageCard fadeInAndOut' style={{border: `1px solid ${primaryColorLiteral[message.type]()}`, color: primaryColorLiteral[message.type](), backgroundColor: secundaryColorLiteral[message.type]()}}> 
                    {iconLiteral[message.type]()} {message.text}
                </div>)}
        </div>
    );
});

export default StatusMessages;