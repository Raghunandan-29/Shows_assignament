import React, {useEffect, useState, useRef} from 'react'
import { Link, useParams } from 'react-router-dom';
import gif from '../Assets/gif.gif'



function Showdetails() {
  const {id} =useParams();
  const [show, setShow] = useState({});
  const [loading,setloading] = useState(true);
  const [previousEpisodeurl, setPreviousEposideurl] =useState({});
  const [previousEpisode,setPreviousEpisode] = useState({});
  useEffect(() => {
    if(id){
    // Fetch data from your Express server
    fetch(`http://localhost:9000/getshow/${id}`)
      .then(response => response.json())
      .then(data => {setShow(data);setloading(false); setPreviousEposideurl(data._links.previousepisode.href)})
      .catch(error => {console.error('Error:', error); setloading(false)});
    }
  }, [id]); // The empty dependency array ensures that the effect runs only once, similar to componentDidMount

  const originalImage = show.image && show.image.original;

  
  useEffect(() => {
   
    // Fetch data from your Express server
    fetch(previousEpisodeurl)
      .then(response => response.json())
      .then(data => {setPreviousEpisode(data);})
      .catch(error => {console.error('Error:', error);});
  }, [previousEpisodeurl]); // The empty dependency array ensures that the effect runs only once, similar to componentDidMount

  const previousEpisodeImage = previousEpisode.image && previousEpisode.image.original;
  const preId= previousEpisode.id;
const removeHtmlTags = (htmlString) => {
  const doc = new DOMParser().parseFromString(htmlString, 'text/html');
  return doc.body.textContent || "";
};


  return (
    <div >
      {loading ? ( // Check the loading state
        <div className="w-full h-screen flex justify-center items-center"><img src={gif}/></div>
      ) : (
      <div className='bg-indigo-950 w-full h-auto flex-col p-12'>
        <div className='bg-transparent w-full h-full flex flex-col justify start'>
          <div className=' w-full h-full flex flex-col lg:w-full lg:h-3/5 lg:flex-row'>
            <div className=' w-50 h-50 lg:w-1/4 lg:h-full  lg:ml-32 lg:mt-10'><img src={originalImage}/></div>
            <div className=' w-1/2 h-full mt-10 flex flex-col items-center'>
              <div className='text-4xl lg:text-7xl text-white mt-20 md:text-5xl'>{show.name}</div>
              <div className='text-xl text-white mt-20'>Genre: {show.genres[0]} {show.genres[1]} {show.genres[2]}</div>
              <div className='text-xl text-white mt-2'>Status: {show.status}</div>
              <div className='text-xl text-white mt-2'>Languge: {show.language}</div>
            </div>
            <Link to={`book/${id}`}><div className='flex justify-center items-center w-32 h-10 rounded bg-white cursor-pointer mt-32'>
              <div className='flex justify-center items-center'>Book Ticket</div>
            </div>
            </Link>
          </div>
          <div className='w-42 lg:w-3/4 lg:h-3/5  lg:ml-32 flex flex-col'>
            <div className='text-white text-4xl mt-8 ml-8'>Summary</div>
            <div className='text-white p-10'>{removeHtmlTags(show.summary)}</div>
          </div>
        </div>
        <div className='w-full h-3/5 bg-indigo-950 flex flex-col justify-start'>
          <div className='text-2xl lg:ml-32 lg:mt-10 lg:text-xl  text-white'>Previous eposide</div>
          <div className='lg:w-1/4 lg:h-5/6 lg:ml-32 lg:mt-10 cursor-pointer'><Link to={`show-details/previous/${preId}`}><img src={previousEpisodeImage}/></Link></div>

        </div>
      </div>
      )}
    </div>
  )
}

export default Showdetails