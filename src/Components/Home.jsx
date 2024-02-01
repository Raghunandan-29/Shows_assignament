import { useEffect , useState} from 'react'
import React from 'react'
import Postcard from '../skeletons/Postcard'
import gif from '../Assets/gif.gif'

function Home() {
    const [shows, setShows] = useState([]);
    const [query, setQuery] = useState('');
    const [loading,setloading] = useState(true);
    const handleSearchChange = (e) => {
      setQuery(e.target.value);
    };
  useEffect(() => {
    // Fetch data from your Express server
    fetch('http://localhost:9000/getshows')
      .then(response => response.json())
      .then(data => {setShows(data); setloading(false);})
      .catch(error => {console.error('Error:', error); setloading(false);});
  }, []); // The empty dependency array ensures that the effect runs only once, similar to componentDidMount
  return (
    <div>
       {loading ? ( // Check the loading state
        <div className="w-full h-screen flex justify-center items-center"><img src={gif}/></div>
      ) : (
        <div className='w-full h-screen flex-col '>
            <div className='bg-indigo-950 w-full h-32 text-white flex justify-center items-center text-5xl'>Shows</div>
            <div className='bg-indigo-950 flex justify-end'>
            <input className='mr-20 p-2 rounded bg-transparent border-2 border-indigo-900 text-white' type='text' name='search' placeholder='Search ...' value={query}
                onChange={handleSearchChange} autoComplete='off'/>
            </div>
            <div className='w-full h-full bg-indigo-950'>
              <div className='flex flex-col md:grid grid-cols-2 lg:grid-cols-3 lg:grid-rows-4 pt-20 pl-16 gap-y-14 bg-indigo-950'>
                {shows.filter((show) =>
                  show.show.name.toLowerCase().includes(query)||
                  show.show.status.toLowerCase().includes(query)||
                  show.show.language.toLowerCase().includes(query)  
                ).map((show, index) => (
                    <Postcard 
                    key={index} 
                    index={show.show.id}
                    title={show.show.name}
                    status={show.show.status}
                    language={show.show.language}
                    genres={show.show.genres}
                    image={show.show.image}
                    rating={show.show.rating.average} />
                ))}
            </div>
            </div>
        </div>
        )}
    </div>
  )
}

export default Home