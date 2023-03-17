import React, { useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase/Firebase';
import { ColorRing } from 'react-loader-spinner';
import Reviews from './Reviews';

const Detail = () => {
  const {id} = useParams();
  const [data, setData] = useState({
    title: "",
    year: "",
    image: "",
    description: "",
    rating: 0,
    rated: 0,
  });

  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true)
    async function getData() {
      const _doc = doc(db, "movies", id,)
      const _data = await getDoc(_doc)
      setData(_data.data())
      setloading(false)
    }
    getData();
  }, [])

  return (
    <div className='p-4 flex flex-col md:flex-row w-full justify-center items-center md:items-start'>
    { loading ? <div className='w-full flex justify-center items-center h-96'> <ColorRing height={60} /> </div>  :
      <>
        <img
        className='h-96 mt-4 block md:sticky md:top-40'
        src={data.image} alt='img'/>
        <div className='ml-0 md:ml-4 w-full md:w-1/2'>
          <h3 className='text-3xl font-bold text-gray-400'>{data.title}<span className='text-lg ml-1'>({data.year})</span></h3>
          <ReactStars 
            size={20} 
            half={true} 
            value={data.rating/data.rated}
            edit={false}
          />
          <p className='mt-2 text-gray-500'>
            {data.description}
          </p>

          <Reviews id={id} prevRating={data.rating} userRated={data.rated} />

        </div>
      </>
    }
    </div>
  );
};

export default Detail;