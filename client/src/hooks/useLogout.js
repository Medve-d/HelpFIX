import { useAuthContext } from './useAuthContext'
import { usePrestationsContext } from './usePrestationsContext'


export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: prestationsDispatch  } = usePrestationsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    prestationsDispatch({type: 'SET_PRESTATIONS', payload: null})
  }

  return { logout }
}