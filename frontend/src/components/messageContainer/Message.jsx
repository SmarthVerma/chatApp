import React from 'react'
import { useSelector } from 'react-redux'
import { convertTo12HourFormatInIST } from '../../util/convertDateTo12hr'

function Message({ from, msg }) {


    const user = useSelector(state => state.user.data)
    const otherUser = useSelector(state => state.otherUsers.otherUserInfo)
    const isSending = user?._id === from
    const shakeClass = msg.shouldShake ? "shake" : ""


    return (
        <div className={`chat  ${isSending ? "chat-end" : "chat-start"}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src={isSending ? user.avatar : otherUser?.avatar} />
                </div>
            </div>
            <div className="chat-header text-black font-bold" >
                {/* {isSending ? user.fullName : otherUser?.fullName} */}

            </div>
            <div className={`${isSending ? "bg-green-500" : " bg-slate-300"} chat-bubble  text-black ${shakeClass}`}>
                {msg?.message}
            </div>
            <time className="text-xs opacity-50 text-white font-semibold">{convertTo12HourFormatInIST(msg.createdAt)}</time>
            <div className="chat-footer opacity-50 text-white">Delivered</div>
        </div>
    )
}

export default Message
