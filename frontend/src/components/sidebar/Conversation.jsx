import React, { useContext, useEffect, useState } from 'react'
import { getRandom } from "../../util/randomEmoji";
import { useGetMessages } from '../../api/homePage.api/sidebar.api/conversation.api/useGetMessages';
import { SocketContext } from '../../context/SocketContext';

function Conversation({ data, lastIdx, selected, onChange }) {
    const [emoji, setEmoji] = useState(getRandom())
    const { loading, getMessages } = useGetMessages()

    const [isOnline, setIsOnline] = useState(false)

    const { onlineUsers } = useContext(SocketContext)
    useEffect(() => {
        const isActive = onlineUsers.some((userId) => userId === data._id)
        setIsOnline(isActive)
    }, [onlineUsers])


    const handleSelect = (data) => {
        onChange(data)
        getMessages(data)
    }


    return (
        <>
            <div
                onClick={() => handleSelect(data)}
                className={`flex gap-2 items-center hover:bg-green-600 rounded p-2 py-1 cursor-pointer ${selected ? 'bg-green-600' : ''}`}>
                <div className={`avatar ${isOnline ? 'online' : 'offline'}`}>
                    <div className="w-12 rounded-full">
                        <img src={data.avatar} />
                    </div>
                </div>
                <div className='flex flex-col flex-1 mx-4'>
                    <div className='flex flex-col flex-1'>
                        <div className='flex gap-3 justify-between'>
                            <p className='font-bold text-gray-200'>{data.fullName}</p>
                            <span className='text-xl'>{emoji}</span>
                        </div>
                    </div>
                </div>
            </div>

            {!lastIdx && <div className='divider my-0 py-0 h-1'></div>}



        </>
    )
}

export default Conversation
