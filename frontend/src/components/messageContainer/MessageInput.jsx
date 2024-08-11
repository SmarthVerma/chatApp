import React from 'react'
import { BsSend } from 'react-icons/bs'
import { useForm } from "react-hook-form";
import { useSendMsg } from '../../api/homePage.api/messageContainer.api/MessageInput/useSendMsg';


function MessageInput() {

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

  const { loading, sendMsg } = useSendMsg()

  const handleSendMessage = (data) => {
    sendMsg(data)
    reset()
  }


  return (

    <div className='px-4 my-3 '>
      <div className='w-full relative'>
        <form action="" onSubmit={handleSubmit(handleSendMessage)}>

          <input
            {...register("message", { required: true })}
            type="text"
            className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
            placeholder='Send a message'
          />
          <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
            <BsSend className='w-4 h-4' />
          </button>
        </form>
      </div>

    </div>
  )
}

export default MessageInput
