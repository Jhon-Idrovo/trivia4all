import React from "react";
import Categorie from "../components/Categorie";
import { useRouter } from "next/router";

import { getAllCategoryNames } from "../lib/trivia";

function Categories({ categories }) {
  const router = useRouter();
  console.log(categories);
  const handleClick = (categorieName) => {
    router.push(`/${categorieName}`);
  };
  return (
    <div className="categories">
      {categories.map((categorie, index) => {
        return (
          <Categorie name={categorie} handleClick={handleClick} key={index} />
        );
      })}
    </div>
  );
}

export default Categories;

export async function getStaticProps() {
  //fetch categories
  const categories = getAllCategoryNames();
  return {
    props: {
      categories,
    },
  };
}
