import { useState, useEffect } from 'react'

import './App.css'
import axios from 'axios'




function App() {
  const baseURL = 'https://api.spotify.com/v1';
  const searchEnd = 'search';

  const clientId = '26d9689d169246d1a540b96f80f970fd';
  const clientSecret = "6a425410eeeb4ef2981764a936593cc3";
 
  const [token, setToken] = useState('');
  const [trackResult, setTrackResult] = useState('')
  const [searchReq, setSearchReq] = useState('nasheed')
  

  const searchReqHandler = (e) => {
    console.log(e.target.value)
    setSearchReq(`nasheed ${e.target.value}`);
  }

  useEffect(() => { 
    getToken();
  }, [])

  const getToken = () => {
    axios.post('https://accounts.spotify.com/api/token', 
      `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`, 
    {headers: {"Content-Type" : "application/x-www-form-urlencoded"}})
    .then((response) => {
      console.log(response);
      setToken(response.data.access_token);
    }).catch((err) => {
      console.log(err);
    })
  }

  const searchTracks = ()=>{
    axios.get(`${baseURL}/search?q=${searchReq}&type=track&market=US`,{headers:{'Authorization':` Bearer ${token}`}})
    .then((res)=>{
      console.log(res)
      setTrackResult(res.data.tracks.items[0].id)
      
    })
    .catch((err)=>{console.log(err)})
  }

  return (
   <>
    <section>
      
 
      <h1>Arhum's Nasheed Finder</h1>
     
   

      <div className='userField'>
      <label htmlFor='searchBar'> Search: </label>
      <input name='searchBar' onChange={searchReqHandler}></input>

      <button onClick={searchTracks}>Submit</button>
      </div>

      { trackResult && 
      <div className='trackContainer'>
        <iframe
        style={{ borderRadius: "12px" }}
        src={`https://open.spotify.com/embed/track/${trackResult}`}
        width="100%"
        height="352"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        />
      </div>
      }
     
     
  
    </section>
    </>
    
  )
}

export default App
