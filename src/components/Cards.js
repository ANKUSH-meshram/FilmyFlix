import { getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { NavLink } from "react-router-dom";
import ReactStars from "react-stars";
import { moviesRef  } from "./firebase/Firebase";

const Cards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _data = await getDocs(moviesRef)
      _data.forEach((doc) => {
        setData((prv) => [...prv, {...(doc.data()), id: doc.id}])
      })
      setLoading(false);
    }
    getData()
  },[])

  return (
    <div className="card flex flex-wrap gap-2 p-5 mt-2">
    { loading ? <div className="flex justify-center items-center w-full h-96" ><ColorRing height={60} /> </div> : 
      data.map((e, i) => {
        return (
          <NavLink to={`/detail/${e.id}`}>
          <div
            key={i}
            className="card bg-[rgb(65,63,63)] p-1 shadow-lg hover:-translate-y-3 transition-all duration-400 cursor-pointer mt-6"
          >
            <img className="h-72" src={e.image} alt="poster" />

            <div className="p-2">
              <h3 className="text-sm">
                <span className="text-sm text-gray-500 mr-1">Name:</span>
                {e.title}
              </h3>

              <h3 className="text-base flex items-center">
                <span className="text-gray-500 mr-1">Rating:</span>
                  <ReactStars 
                  size={20} 
                  half={true} 
                  value={e.rating/e.rated}
                  edit={false}
                />
              </h3>

              <h3 className="text-base">
                <span className="text-sm text-gray-500 mr-1">Year:</span>
                {e.year}
              </h3>
            </div>
          </div>
          </NavLink>
        );
      })
    }
    </div>
  );
};

export default Cards;
