import React from 'react'
import { useEffect } from 'react'
import { getCategories } from '../api'
import CategoryCard from '../components/CategoryCard';
import { useState } from 'react';

const Home = () => {
const [categories,setCategories] = useState([])
 
   useEffect(()=>{
    getCategories().then((cat)=>{
        if(cat.status){
            setCategories(cat.data);
        }else{
            alert(cat.message);
        }
    })
   },[])

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">All Categories</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
};
  

export default Home