import { addOne } from "../../requests/requests"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: addOne,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      },

    onError: () => {
      dispatch({type:"ERROR"})
    }
    })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    const obj = {
      content: content,
      votes: 0
    }

    try
    {
    const result = await newAnecdoteMutation.mutateAsync(obj);
    dispatch({type:"ADD", origin: content})
    
    newAnecdoteMutation.mutate(obj)
    console.log('new anecdote')
    }

    catch(error){
      // dispatch ERROR in mutation
    }
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
