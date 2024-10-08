import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'

import LogoutButton from './LogoutButton'

function Sidebar() {
  return (
    <div className='p-4 bg border-r border-slate-500 flex flex-col '>
      <SearchInput />
      <div className='divider px-3'></div>

      <Conversations />
      <LogoutButton />
    </div> 
  )
}

export default Sidebar
