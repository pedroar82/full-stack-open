import { voteAnedocte } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notifReducer'
import { useDispatch, useSelector } from 'react-redux'

const AnecdoteList = () => {

  const dispatch = useDispatch()
  const anecdotes = useSelector(state => [...state.anecdotes]
    .filter(a => a.content.toLowerCase().indexOf(state.filter.toLowerCase()) !== -1)
    .sort((a,b) => b.votes - a.votes))

  const vote = (id, content) => {
    const updAnecdote = anecdotes.find(a => a.id === id)
    dispatch(voteAnedocte(updAnecdote))
    //trigger notif
    dispatch(setNotification(`You voted '${content}'`, 5))
  }

  return (
    anecdotes.map(anecdote => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
            has {anecdote.votes}
          <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
        </div>
      </div>
    ))
  )
}

export default AnecdoteList
