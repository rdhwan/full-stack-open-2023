import { useState } from 'react'

const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(getRandom(0,7))
  const [points, setVotes] = useState(Array(7).fill(0))

  const maxPoints = Math.max(...points)

  return (
    <div>
      <h1>Anecdotes of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} points</p>

      <button onClick={() => {
        const copy = [...points]
        copy[selected] += 1
        setVotes(copy)
        }
      }>Vote</button>
      <button onClick={() => setSelected(getRandom(0,7))}>Next Anecdote</button>


      {!points.every((e) => e === 0) &&
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[points.indexOf(maxPoints)]}</p>
        <p>has {maxPoints} votes</p>
      </div>
      }

    </div>
  )
}

export default App