import { createContext, useEffect, useState } from "react";
export const PhotosContext = createContext();
import axios from "axios";

const URL = "./photos.json";

const PhotosProvider = ({ children }) => {
  const [photos, setPhotos] = useState([]);

  const getPhotos = async () => {
    try {
      const response = await axios.get(URL);
      if (!response.status) {
        throw new Error("No hay data");
      }
      const { photos: photosDB } = response.data;
      setPhotos(photosDB.map((photo) => ({ ...photo, isFavorite: false })));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <PhotosContext.Provider value={{ photos, setPhotos }}>
      {children}
    </PhotosContext.Provider>
  );
};
export default PhotosProvider;
