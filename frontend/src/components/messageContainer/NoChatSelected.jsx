import React, { useContext } from 'react'
import { TiMessages } from "react-icons/ti";
import { useSelector } from 'react-redux';
import { VisibleContext } from "../../context/VisibleContext";

function NoChatSelected() {

  const user = useSelector((status) => status.user.data)

  
  const { viewportWidth } = useContext(VisibleContext);


  // console.log('This the view', viewportWidth)

  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome 👏 {user?.fullName} </p>
        <p>Select a chat to start messaging</p>
        <div className="flex gap-3" >

          <TiMessages className='text-3xl md:text-6xl text-center' />
          <button className="border active:-scale-50" > Select Chat</button>
        </div>
      </div>

    </div>
  )
}

export default NoChatSelected
