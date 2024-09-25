import { createContext, useReducer } from 'react'

export const DemandesContext = createContext()

export const demandesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DEMANDE':
      return { 
        demandes: action.payload 
      }
    case 'CREATE_DEMANDE':
      return { 
        demandes: [action.payload, ...(state.demandes || [] )] 
      }
      case 'DELETE_DEMANDE':
        return { 
          demandes: state.demandes.filter(w => w._id !== action.payload._id)  
        }
      case 'UPDATE_DEMANDE_STATUS':
        return {
            ...state,
            demandes: state.demandes.map(demande =>
                demande._id === action.payload._id ? { ...demande, status: action.payload.status } : demande
            )
    };
    default:
      return state
  }
}

export const DemandesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(demandesReducer, { 
    demandes: []
  })
  
  return (
    <DemandesContext.Provider value={{ ...state, dispatch }}>
      { children }
    </DemandesContext.Provider>
  )
}