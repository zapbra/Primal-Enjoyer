import SavedCollection from "./SavedCollection";
import { useState, useReducer } from "react";

const ArticleCollection = ({
  removeFromCollectionFunctional,
  deleteCollectionFunctional,
  collections,
}) => {
  const collectionElems = collections.map((collection, index) => {
    return (
      <SavedCollection
        key={index}
        title={collection.title}
        id={collection.id}
        articles={collection.savedArticle}
        deleteCollectionFunctional={deleteCollectionFunctional}
        removeFromCollectionFunctional={removeFromCollectionFunctional}
      />
    );
  });

  return <>{collectionElems}</>;
};

export default ArticleCollection;
