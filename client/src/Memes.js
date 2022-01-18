import React, {useState, useEffect} from 'react';
import axios from 'axios';
import MemeForm from './MemeForm';

const Memes = () => {
  const [memes, setMemes] = useState([])

  useEffect(()=>{
    getMemes()
  }, [])

  const addMeme = (meme) =>{
    setMemes([meme, ...memes])
  }

  const getMemes = async () => {
    try{
      let res = await axios.get('/api/memes')
      setMemes(res.data)
    }catch(err){
      console.log("Error getting Memes")
    }
  }

  return (
    <div>
      <h1>Memes</h1>
      <p>{JSON.stringify(memes)}</p>
      <MemeForm addMeme={addMeme}/>
    </div>
  )
}

export default Memes