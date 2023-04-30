import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import axios from 'axios';
import css from './App.module.css';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = 'https://pixabay.com/api';

export function App() {
  const [pictures, setPictures] = useState([]);
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (name !== '') {
      fetchPictures(name, page);
    }
  }, [page, name]);

  const formSubmitHandler = data => {
    setName(data);
    setPictures([]);
    setPage(1);
    setTotal(0);
    setError(null);
  };

  const buttonPaginateHandler = () => {
    setPage(prev => prev + 1);
  };

  const fetchPictures = async (name, page) => {
    try {
      setIsLoading(true);

      const responce = await axios.get(
        `/?q=${name}&page=${page}&key=34100220-38e5a3f6c25c883f1441c4bda&image_type=photo&orientation=horizontal&per_page=12`
      );

      if (responce.data.hits.length === 0) {
        return toast.error(
          'We have nothing to show for this search...  Try another option'
        );
      }
      setTotal(responce.data.totalHits);
      setPictures(prev => [...prev, ...responce.data.hits]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalPage = total / pictures.length;

  return (
    <div className={css.App}>
      <Searchbar onSubmit={formSubmitHandler} />
      <div>
        {pictures.length > 0 ? <ImageGallery toRender={pictures} /> : null}
        {isLoading && <Loader />}
        {totalPage > 1 && !isLoading && pictures.length !== 0 && (
          <Button toVisible={pictures} pageSubmit={buttonPaginateHandler} />
        )}

        {error && (
          <p>
            Sorry... We have nothing to show for this search
            <span>Try another option</span>
          </p>
        )}
        <ToastContainer autoClose={2000} theme="dark" />
      </div>
    </div>
  );
}
