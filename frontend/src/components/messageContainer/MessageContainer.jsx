import React from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import NoChatSelected from './NoChatSelected';
import { useSelector } from 'react-redux';

function MessageContainer() {
  // Getting state from Redux
  const isSelected = useSelector(state => state.messageContainer.isSelected);
  const loading = useSelector(state => state.messageContainer.isLoading);
  const to = useSelector(state => state.messageContainer.to);

  const noChatSelected = !isSelected;

  if (noChatSelected) {
    return (
      <div className='md:min-w-[450px] flex flex-col'>
      <NoChatSelected />
       </div >
    ) 
  }

  if (loading) {
    return (
      <div className='md:min-w-[450px] flex flex-col'>
        <div className='h-full w-full flex justify-center items-center'>
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className='md:min-w-[450px] flex flex-col'>
      <div className='bg-slate-600 text-white px-4 py-2 mb-2'>
        <span className='label-text'>To: </span>
        <span className='text-white font-bold'>{to}</span>
      </div>
      <Messages />
      <MessageInput />
    </div>
  );
}

export default MessageContainer;