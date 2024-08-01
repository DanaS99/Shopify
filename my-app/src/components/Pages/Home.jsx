import React, { useState, useEffect } from 'react';
import { Circles } from 'react-loader-spinner';
import Product from '../Product/Product';

function Home() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, seterrorMsg] = useState(null);
  const [products, setproducts] = useState([]);

  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      console.log(data.products);

      if (data.products) {
        setproducts(data.products);
        setLoading(false);
        seterrorMsg(null);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      seterrorMsg(error.message);
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
        <div className='font-serif md:mx-0 '>
          <h1 className='ml-5 lg:ml-5 xl:ml-24 my-6 text-4xl md:text-5xl text-lightblack'>
            Products
          </h1>
          <div className='min-h-[80vh]  grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 max-w-5xl lg:max-w-7xl xl:max-w-8xl mx-auto gap-0 md:gap-4 lg:gap-5 px-0 sm:px-0 py-3 '>
            {products && products.length
              ? products.map((item) => <Product key={item.id} product={item} />)
              : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
