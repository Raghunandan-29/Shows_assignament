import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom';

function Form() {
    const {id} =useParams();
  const [show, setShow] = useState({});
  const [formData, setFormData] = useState({ email: '', name: '' });
  useEffect(() => {
    if(id){
    // Fetch data from your Express server
    fetch(`http://localhost:9000/getshow/${id}`)
      .then(response => response.json())
      .then(data => setShow(data))
      .catch(error => console.error('Error:', error) );
    }
  }, [id]); 
  const image=show.image;
  const img_url = image && image.original ? image.original : null;
    const containerStyle = {
        backgroundImage: `url(${img_url})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      };

      const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        // Store form data and show name in local storage
        const userData = {
          email: formData.email,
          name: formData.name,
          showName: show.name,
        };
    
        localStorage.setItem('userData', JSON.stringify(userData));
        alert("Ticket is booked");
      };

  return (
    <div className="w-full h-screen bg-indigo-950 flex justify-center items-center ">
      <div className='w-4/5 p-5 md:w-3/5 md:h-3/5 lg:w-2/5 lg:h-4/5 lg:p-10 flex-col border rounded-xl shadow-xl'>
        <div className='w-full h-1/3 flex justify-between'>
            <div className=' w-28 h-30 md:w-full  lg:w-full lg:h-full text-white ' style={containerStyle}></div>
            <div className=' w-30 text-2xl lg:w-40 text-white lg:text-3xl mt-20 mr-10'>{show.name}</div>
        </div>
            <div className='w-full h-2/3 mt-20'>
                <form class="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <div class="mb-5">
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                    <input type="name" id="name" onChange={handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='name' required />
                </div>
                <div class="mb-5">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" id="email"  onChange={handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email" required />
                </div>
                <div class="flex items-start mb-5">
                    <div class="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                    </div>
                    <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Agree to terms and conditions</label>
                </div>
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
      </div>
    </div>
  )
}

export default Form