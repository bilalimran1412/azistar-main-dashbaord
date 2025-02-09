import React from 'react'
import SignIn from '../views/UserAuth/SignIn'
import OtherLayout from '../components/Layout/otherLayout'

function login() {
  return (
    <OtherLayout>
      <SignIn />
    </OtherLayout>
  )
}

export default login