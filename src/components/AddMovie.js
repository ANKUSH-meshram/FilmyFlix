import React, { useContext, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { addDoc } from 'firebase/firestore';
import { moviesRef } from './firebase/Firebase';
import swal from 'sweetalert'
import { AppState } from '../App';
import { useNavigate } from 'react-router-dom';


const AddMovie = () => {
  const useAppState = useContext(AppState);
  const navigate = useNavigate();
  const [form, setForm] =useState({
    title: "",
    year: "",
    description: "",
    image: "",
    rated: 0,
    rating: 0, 
  })

  const [loading, setLoading] = useState(false)

  const addMovie = async () => {
    setLoading(true);
    try {
      if(useAppState.login) {
        await addDoc(moviesRef, form);
        swal({
          title: "Successfully added",
          icon: "succes",
          buttons: false,
          timer: 3000,
        })
        setForm({
          title: "",
          year: "",
          description: "",
          image: "",
        })
      } else {
        navigate('/login')
      }  
      } catch (error) {
        await addDoc(moviesRef, form);
      swal({
        title: error.message,
        icon: "error",
        buttons: false,
        timer: 3000,
      })
      setForm({
        title: "",
        year: "",
        description: "",
        image: "",
      })
    }
    setLoading(false);
  }

  return (
    <div className=''>
      <section className="text-gray-400 bg-gray-900 body-font relative h-[100vh]">
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-col text-center w-full mb-4">
            <h1 className="sm:text-3xl text-3xl font-medium title-font mb-2 text-gray-300 font-['Oleo_Script']">Add Movie</h1>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label for="name" className="leading-7 text-sm text-gray-400">Title</label>
                  <input
                    type="text" 
                    id="title" 
                    name="title"
                    value={form.title}
                    onChange={(e) => setForm({...form, title: e.target.value})}
                    className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label for="Year" className="leading-7 text-sm text-gray-400">Year</label>
                  <input
                    type="text" 
                    id="year" 
                    name="year" 
                    value={form.year}
                    onChange={(e) => setForm({...form, year: e.target.value})}
                    className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label for="image-link" className="leading-7 text-sm text-gray-400">Image Link</label>
                  <input
                    type="text" 
                    id="image-link" 
                    name="image-link"
                    value={form.image}
                    onChange={(e) => setForm({...form, image: e.target.value})}
                    className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label for="message" className="leading-7 text-sm text-gray-400">Description</label>
                  <textarea 
                    id="description" name="description" 
                    value={form.description}
                    onChange={(e) => setForm({...form, description: e.target.value})}
                    className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  onClick={addMovie}
                  className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">{loading ? <TailSpin height={25} color="white" /> : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddMovie;