import { addDoc, doc,  getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import ReactStars from 'react-stars';
import swal from 'sweetalert';
import { AppState } from '../App';
import { reviewsRef, db } from './firebase/Firebase';

const Reviews = ({id, prevRating, userRated }) => {
  const navigate = useNavigate();
  const useAppState = useContext(AppState);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [form, setForm] =  useState("");
  const [data, setData] = useState([]);
  const [newAdded, setNewAdded] = useState(0);

  const sendReview = async () => {
    setLoading(true)
    try {
      if(useAppState.login) {
      await addDoc(reviewsRef, {
        movieId: id,
        name: useAppState.userName,
        rating: rating,
        thoughts: form,
        timestamp: new Date().getTime()
      })

      const ref = doc(db, 'movies', id);
      await updateDoc(ref, {
        rating: prevRating + rating,
        rated: userRated + 1,
      })

      setRating(0);
      setForm("")
      setNewAdded(newAdded + 1);

      swal({
        title: 'Review Sent',
        icon: 'success',
        buttons: false,
        timer: 3000
      })
    } else {
      navigate('/login')
    }
    } catch (error) {
      swal({
        title: error.message,
        icon: 'error',
        buttons: false,
        timer: 3000
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    async function getData() {
      setReviewsLoading(true)
      setData([]);
      let quer = query(reviewsRef, where('movieId', '==', id ))
      const querySnapshot = await getDocs(quer)

      querySnapshot.forEach((doc) => {
        setData((prev) => [...prev, doc.data()])
      })

      setReviewsLoading(false)
    }
    getData()
  },[newAdded])

  return (
    <>
    <div className='mt-4 w-full p-4 border-2 border-gray-800'>
      <h3 className='text-xl text-gray-500 font-bold'>Reviews:</h3>
      <ReactStars 
        size={20}
        half={true}
        value={rating}
        edit={true}
        onChange={(rate) => setRating(rate)}
      />
      <div className="py-2 w-full">
        <div className="relative">
          <textarea 
            value={form}
            onChange={(e) => setForm(e.target.value)}
            placeholder='Share your thoughts...'
            id="review" 
            name="review" 
            className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out">
          </textarea>
        </div>
      </div>
      <div className="p-2 w-full">
        <button
          onClick={sendReview}
          className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
          {loading ? <ColorRing height={28} /> : 'Share' }
        </button>
      </div>
    </div>
      { reviewsLoading ? 
        <div className='mt-6 flex justify-center'><ColorRing height={40}/></div>
      : 
      <div className='mt-4'>
        {data.map((e, i) => {
          return(
            <div 
              key={i}
              className="bg-gray-800 my-1 px-4 py-2 text-sm text-gray-500 w-full border-b border-gray-600 shadow-md"
            >
              <small className='mr-2 text-base text-gray-400'>{e.name}</small>
              <small>{new Date(e.timestamp).toLocaleString()}</small>

              <ReactStars 
                size={15}
                half={true}
                value={e.rating}
                edit={false}
              />

              <p>
                {e.thoughts}
              </p>
            </div>
          )
        })}
      </div>
      }
    </>
  );
};

export default Reviews;