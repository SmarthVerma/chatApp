import React from 'react'
import { BiLogOut } from 'react-icons/bi'
import { useLogout } from '../../api/homePage.api/sidebar.api/logoutButton.api/useLogout'



function LogoutButton() {

  const { loading, logout } = useLogout()

  const test = () => {
    console.log('being clicked')
    console.log(loading)
  }

  return (
    <div className='mt-auto' >
      <BiLogOut
        onClick={logout}
        className='w-6 h-6 text-white cursor-pointer'
      />
    </div>
  )
}

export default LogoutButton
