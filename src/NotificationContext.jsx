import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch(action.type){
    case "VOTE":
        return `Voted for "${action.origin.content}"`

    case "ADD":
        return `Added "${action.origin}"`

    case "ERROR":
        return `ERROR: Anecdote must be at least 5 characters long`
    default:
        return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, "NiNithubgNithubgNithubgNithubgNithubgNithubgNithubgNithubgNithubgNithubgNithubgNithubgNithubgNithubgNithubgNithubgNithubgNithubgNithubgNithubgNithubgNithubgNithubgNithubgNithubgNithubgNithubgNithubgthubg")
  
    return (
      <NotificationContext.Provider value={[notification, notificationDispatch] }>
        {props.children}
      </NotificationContext.Provider>
    )
  }

  export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
  }
  
  export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
  }
  
export default NotificationContext