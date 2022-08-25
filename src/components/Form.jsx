import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import CardMovies from './CardMovies'

const defaulValue = {
    name: '',
    genre: '',
    duration: '',
}

const Form = ({getAllMovies, updateInfo, setupdateInfo, handleCloseForm}) => {

    useEffect(() => {
    if(updateInfo){
    reset(updateInfo)
    }

    },[updateInfo])

    const createMovie = (data) => {
        const URl = "https://movies-crud-academlo.herokuapp.com/movies/"
        axios.post(URl, data)
        .then(res => {
            console.log(res.data);
            getAllMovies()
        })
       
        .catch(err => console.log(err))
    }
    
    const {register, reset, handleSubmit} = useForm()
    
    const updateMovie = data => {
        const URl = `https://movies-crud-academlo.herokuapp.com/movies/${updateInfo.id}/`
        axios.patch(URL, data)
        .then(res => {
            console.log(res.data)
            getAllMovies()
        })
        .catch(err => console.log(err))
    }


    const submit = data => {
        if(updateInfo){
            getAllMovies(data)
            setupdateInfo()
        } else{
            createMovie(data)
        }
        reset(defaulValue)
        handleCloseForm()
        
}

  return (
   <form onSubmit={handleSubmit(submit)} className='form'>
<div onClick={handleCloseForm} className='form__equis'>X</div>
    <h2 className='form__title'>{updateInfo ? 'Update movie informacion': ' create new movie'}</h2>
    <ul className='form__list'>
    <li className='form__item'>
        <label htmlFor="name">Name</label>
        <input {...register("name")} type="text" id='name' />

    </li>
    <li className='form__item'>
        <label htmlFor="genre">Genre</label>
        <input {...register("genre")} type="text" id='genre'/>
    </li>
    <li className='form__item'>
        <label htmlFor="duration">Duration</label>
        <input {...register("duration")} type="text" id='duration'/>
    </li>
    <li className='form__item'>
        <label htmlFor="Release-date">Release date</label>
        <input {...register("release_date")} type="date" id='Release-date'/>
    </li>
     </ul>
     <button className='form__btn'>
        {
            updateInfo ? 'Update' : 'Create'
        }


     </button>
   </form>
  )
}

export default Form