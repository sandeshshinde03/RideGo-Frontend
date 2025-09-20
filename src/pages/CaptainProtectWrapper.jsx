//Frontend\src\pages\CaptainProtectWrapper.jsx
import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('Token')
  const navigate = useNavigate()
  const { captain, setCaptain } = useContext(CaptainDataContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCaptainProfile = async () => {
      if (!token) {
        navigate('/captain-login')
        return
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (response.status === 200) {
          setCaptain(response.data.captain)
          setIsLoading(false)
        }
      } catch (err) {
        localStorage.removeItem('Token')
        navigate('/captain-login')
      }
    }

    fetchCaptainProfile()
  }, [token, navigate, setCaptain])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}

export default CaptainProtectWrapper
