import { createContext, useReducer } from 'react'

export const PrestationsContext = createContext()

export const prestationsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRESTATIONS':
      return { 
        prestations: action.payload 
      }
    case 'CREATE_PRESTATION':
      return { 
        prestations: [action.payload, ...state.prestations] 
      }
      case 'DELETE_PRESTATION':
        return { 
          prestations: state.prestations.filter(w => w._id !== action.payload._id)  
        }
    default:
      return state
  }
}

export const PrestationsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(prestationsReducer, { 
    prestations: null
  })
  
  return (
    <PrestationsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </PrestationsContext.Provider>
  )
}