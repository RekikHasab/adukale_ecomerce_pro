import React, { useState, useEffect } from 'react'; // Import useEffect
import LayOut from '../../components/LayOut/LayOut';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../../components/Product/ProductCard';
import Loader from '../../components/Loader/Loader';

function ProductDetail() {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState({});

  useEffect(() => {
    setIsLoading(true)
    axios.get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false)
      });
  }, [productId]); // Include productId in the dependency array

  return (
    <LayOut>
      {isLoading? (<Loader/>):<ProductCard
        product={product}
        flex = {true}
        renderDesc={true}
        renderAdd={true}
      />}
    </LayOut>
  );
}

export default ProductDetail;
