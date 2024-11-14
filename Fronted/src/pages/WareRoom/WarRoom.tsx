import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IUser } from '../../types/types'
import ShowWarms from '../../../components/ShowWarms/ShowWarms'

const WarRoom = () => {
    const dispatch = useDispatch()
    const {user} = useSelector((state: {userReducer: {user: IUser}}) => state.userReducer)
    console.log(user);
    

  return (
    <div>
      <h1>WarRoom</h1>
      <ShowWarms user={user} />
    </div>
  )
}

export default WarRoom
