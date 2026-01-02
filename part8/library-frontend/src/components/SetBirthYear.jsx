import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { ALL_AUTHORS, SET_BIRTHYEAR } from '../queries'
import Select from 'react-select';

const SetBirthYear = ({ authors }) => {
  const [nameObj, setNameObj] = useState(null)
  const [born, setBorn] = useState('')

  const [setBirthYear] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = (event) => {
    event.preventDefault()

    setBirthYear({ variables: { name: nameObj.value, born } })

    setNameObj(null)
    setBorn('')
  }

  const options = authors.map((a) => {
    return { value: a.name, label: a.name }
  })

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <Select value={nameObj} onChange={setNameObj} options={options} />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default SetBirthYear
