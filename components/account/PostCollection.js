import SavedCollection from "./SavedCollection";
import { useState } from "react";

const ArticleCollection = ({
  removeFromPostCollectionFunctional,
  deletePostCollectionFunctional,
  collections,
}) => {
  const collectionElems = collections.map((collection, index) => {
    return (
      <SavedCollection
        key={index}
        title={collection.title}
        id={collection.id}
        articles={collection.savedPost}
        deleteCollectionFunctional={deletePostCollectionFunctional}
        removeFromCollectionFunctional={removeFromPostCollectionFunctional}
      />
    );
  });

  return <>{collectionElems}</>;
};

export default ArticleCollection;
