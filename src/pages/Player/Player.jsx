import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams();

  const navigate = useNavigate()

  const [vdoLink,setVdoLink] = useState({
    name : "",
    key : "",
    published_at : "",
    type : ""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwM2RhOTQyZWZmYjE1YWZkNWE1YTc3Y2JkYzEzZGY5YSIsIm5iZiI6MTcyMzE4MzE0NC4wODg5ODUsInN1YiI6IjY2YjVhZTA5MmRjMjhlNDM1OTdhYjc3ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.u3qVCmr28cSfag6Gvps0Bp596VBtq747KhnBLuheQ20'
    }
  };
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setVdoLink(response.results[0]))
    .catch(err => console.error(err));
  },[])

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}} />
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${vdoLink.key}`} frameBorder='0' allowFullScreen title='trailer'></iframe>
      <div className="player-info">
        <p>{vdoLink.published_at.slice(0,10)}</p>
        <p>{vdoLink.name}</p>
        <p>{vdoLink.type}</p>
      </div>
    </div>
  )
}

export default Player
