import React from 'react';
import { categoryInfos } from './catagoryFullInfos'; // Corrected import path
import CategoryCard from './CategoryCard';
import classes from './catagory.module.css'; // Corrected import path

function Category() {
  return (
    <section className={classes.category_container}>
      {categoryInfos.map((infos) => (
        <CategoryCard key={infos.title} data={infos} />
      ))}
    </section>
  );
}

export default Category;
