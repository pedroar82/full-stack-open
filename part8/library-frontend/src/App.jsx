import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from 'react-router-dom'

const App = () => {
  const [page, setPage] = useState('authors')

  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Router>
         <div>
      <Link style={padding} to="/">authors</Link>
      <Link style={padding} to="/books">books</Link>
      <Link style={padding} to="/add">add</Link>
    </div>

    <Routes>
        <Route path="/add" element={<NewBook show={ 'add'} />} />
        <Route path="/books" element={<Books show={'books'} />} />
        <Route path="/" element={<Authors show={'authors'} />} />
      </Routes>

   


      </Router>
    </div>
  )
}

export default App
