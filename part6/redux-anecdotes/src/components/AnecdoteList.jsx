import { voteAnedocte } from '../reducers/anecdoteReducer'

import { useDispatch, useSelector } from 'react-redux'

const AnecdoteList = () => {

  const dispatch = useDispatch()
  const anecdotes = useSelector(state => [...state.anecdotes]
    .filter(a => a.content.toLowerCase().indexOf(state.filter.toLowerCase()) !== -1)
    .sort((a,b) => b.votes - a.votes))

  const vote = id => {
    dispatch(voteAnedocte(id))
  }

  return (
    anecdotes.map(anecdote => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
            has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    ))
  )
}

export default AnecdoteList
