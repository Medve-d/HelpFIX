import { ProfileContext } from "../context/profilesContext"
import { useContext } from "react"

export const useProfileContext = () => {
  const context = useContext(ProfileContext)

  if(!context) {
    throw Error('useProfilesContext must be used inside an AuthContextProvider')
  }

  return context
}