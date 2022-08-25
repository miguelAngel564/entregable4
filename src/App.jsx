import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'
import CardMovies from './components/CardMovies'
import Form from './components/Form'

function App() {
  const [movies, setMovies] = useState()
  const [updateInfo, setupdateInfo] = useState()
  const [isFormOpen, setisFormOpen] = useState(false)

  const getAllMovies = () => {
    const URl = "https://movies-crud-academlo.herokuapp.com/movies/"
    axios.get(URl)
      .then(res => setMovies(res.data))
      .catch(err => console.log(err.response.data))
  }
  useEffect(() => {
    getAllMovies()
  }, [])
  const handleOpenForm = () => setisFormOpen(true)

  const handleCloseForm = () => setisFormOpen(false)



  return (
    <div className="App">
      <h1>Movies CRUD</h1>
      <button onClick={handleOpenForm}></button>
      <div className={isFormOpen ? 'form-container' : 'form-none'}>
        <Form
          getAllMovies={getAllMovies}
          updateInfo={updateInfo}
          setupdateInfo={setupdateInfo}
          handleCloseForm={handleCloseForm}
        />
      </div>
      <div className='card-container'>
        {
          movies?.map(movie => (
            <CardMovies
              key={movie.id}
              movie={movie}
              getAllMovies={getAllMovies}
              setupdateInfo={setupdateInfo}
              handleOpenForm={handleOpenForm}
            />
          ))
        }


      </div>
    </div>
  )
}

export default App
