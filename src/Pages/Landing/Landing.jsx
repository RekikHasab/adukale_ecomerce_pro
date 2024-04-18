import React from 'react'
import LayOut from '../../components/LayOut/LayOut'
import CarouselEffect from '../../components/Carousel/CarouselEffect'
import Category from '../../components/Category/Category'
import ProductList from '../../components/Product/ProductList'

function Landing() {
  return (
    <div>
      <LayOut>
      <CarouselEffect />
      <Category />
      <ProductList /> 
      </LayOut>
      
    </div>
  )
}

export default Landing