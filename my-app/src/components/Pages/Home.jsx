import React, { useState, useEffect } from 'react';
import { Circles } from 'react-loader-spinner';
import Product from '../Product/Product';

function Home() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [products, setProducts] = useState([]);

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/items'); // Update this URL to your backend endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);

      if (data) {
        setProducts(data); 
        setLoading(false);
        setErrorMsg(null);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      setErrorMsg(error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {loading ? (
        <div>
          <Circles
            height={'80'}
            width={'80'}
            color='rgb(127,29,29)'
            visible={true}
          />
        </div>
      ) : (
        <div className='font-serif md:mx-0'>
          <h1 className='ml-5 lg:ml-5 xl:ml-24 my-6 text-4xl md:text-5xl text-lightblack'>
            Products
          </h1>
          <div className='min-h-[80vh] grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 max-w-5xl lg:max-w-7xl xl:max-w-8xl mx-auto gap-0 md:gap-4 lg:gap-5 px-0 sm:px-0 py-3'>
            {products && products.length
              ? products.map((item) => <Product key={item._id} product={item} />)
              : <div>
                  <h3 className='ml-2 lg:ml-5 xl:ml-12 my-6 text-xl text-lightblack'>No products found in our store</h3>
                </div>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
