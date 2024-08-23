import { DemandesContext } from "../context/DemandesContext"
import { useContext } from "react"

export const useDemandeContext = () => {
  const context = useContext(DemandesContext)

  if(!context) {
    throw Error('useDemandeContext must be used inside an DemandeContext')
  }

  return context
}