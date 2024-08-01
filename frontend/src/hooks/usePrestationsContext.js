import { PrestationsContext } from "../context/PrestationsContext"
import { useContext } from "react"

export const usePrestationsContext = () => {
  const context = useContext(PrestationsContext)

  if(!context) {
    throw Error('usePrestationsContext must be used inside an usePrestationsContext')
  }

  return context
}