import React from 'react'
import { Link } from 'react-router-dom'


function Postcard({ index,title, language, genres, status ,image,rating}) {
    
    const img_url = image && image.original ? image.original : null;
    
    const containerStyle = {
        backgroundImage: `url(${img_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      };
   
  return (
    <div className='w-full h-96 ' >
        <div className=' w-60 h-80 lg:w-96 h-full rounded-3xl flex-col border border-black shadow-3xl cursor-pointer' style={containerStyle}>
            {/* <div className='w-full h-1/2 bg-transparent rounded-t-3xl '></div> */}
            <div className='w-full h-full rounded-b-3xl flex-col opacity-0 hover:opacity-100 transition-all duration-300 ease-in-out bg-opacity-70 hover:bg-opacity-100 backdrop-filter backdrop-blur-sm text-white'>
                <div className='w-full h-1/5 flex justify-center items-center text-3xl'>{title}</div>
                <div className='w-full h-1/3 flex justify-between items-center text-lg px-6'>
                    <div>Language: {language}</div>
                    <div>Genre: {genres[0]} {genres[1]} {genres[2]}</div>
                </div>
                <div className='w-full h-1/3 flex justify-between items-center text-lg px-6'>
                    <div>status: {status}</div>
                    <div>rating: {rating}</div>
                    <Link to={`show-details/${index}`}>
                        <div className='text-base underline cursor-pointer'>
                            More details
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Postcard