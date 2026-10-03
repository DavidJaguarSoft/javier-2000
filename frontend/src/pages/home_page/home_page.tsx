import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

type Props = {}

const HomePage = (props: Props) => {

  const navigate = useNavigate()

  const myToken = localStorage.getItem("token")
  console.log('My Token: ', myToken)

  useEffect(() => {
      const getProfileInit = async () => {}
      
      // if(!myToken){
      //   navigate('/login')  
      // }
    }, [])
  

  return (
    <>
      HomePage
    </>
  )
}

export default HomePage
