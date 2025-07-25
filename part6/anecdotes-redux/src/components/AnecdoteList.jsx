import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        const filtered = state.filter === 'ALL'
            ? state.anecdotes
            : state.anecdotes.filter(a => 
                a.content.toLowerCase().includes(state.filter.toLowerCase())
              )
        return [...filtered].sort((a, b) => b.votes - a.votes)
    })
    const dispatch = useDispatch()

    const handleVote = (id) => {
        dispatch(vote(id))
    }
    return (
        <div>   {
            anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )
        }
        </div>
    )
}
export default AnecdoteList