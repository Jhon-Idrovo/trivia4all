import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import Categorie from '../components/Categorie';
import { Category, getAllCategoryNames } from '../lib/trivia';

export const getStaticProps: GetStaticProps = async () => {
  //fetch categories
  const categories: Category[] = getAllCategoryNames();
  return {
    props: {
      categories,
    },
  };
};

function Categories({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const handleClick = (categorieName: Category) => {
    router.push(`/${categorieName}`);
  };
  return (
    <div className="categories">
      {categories.map((categorie, index) => (
        <Categorie name={categorie} handleClick={handleClick} key={index} />
      ))}
    </div>
  );
}

export default Categories;
