import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, modifyOne } from '../requests/requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  let anecdotes = []
  const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const voteMutation = useMutation({
    mutationFn: modifyOne, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate({...anecdote, votes:anecdote.votes+1})
    dispatch({type:"VOTE", origin: anecdote})

    console.log('vote')
  }

  const anecdotesRaw = useQuery(
  {
      queryKey: ['anecdotes'],
      queryFn: getAll
  })

  if ( anecdotesRaw.isLoading ) {  
    return <div>loading data...</div>  
  }

  else if(anecdotesRaw.isError){
    return <div>Error while loading data</div>
  }

  else if(anecdotesRaw.isSuccess){
    anecdotes = anecdotesRaw.data
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
