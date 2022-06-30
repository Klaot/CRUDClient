import {useState, useEffect} from 'react';
import Axios from 'axios';
import './App.css';

function App() {

const [movieName, setMovieName] = useState('');
const [review, setReview] = useState('');
const [movieReviewList, setMovieReviewList] = useState([]);

const [newReview, setNewReview] =  useState('');
const [refresh, setRefresh] = useState(true);

useEffect(() => {
  Axios.get('http://localhost:3001/api/get').then((responce) => setMovieReviewList(responce.data));
}, [newReview, refresh]);

const submitReview = () => {
  Axios.post('http://localhost:3001/api/insert', {movieName: movieName, review: review})
  .then(() => [...movieReviewList, {movieName: movieName, review: review}]);
  alert('successful insert ');
  setMovieName('');
  setReview('');
  setRefresh(!refresh)
};

const deleteReview = (movie) => {
  Axios.delete(`http://localhost:3001/api/delete/${movie}`);
};

const updateReview = (movie) => {
  Axios.put('http://localhost:3001/api/update', {
    movieName: movie,
    review: newReview,
  })
  setNewReview('')
};

  return (
    <div className="App container">
      <div className='content'>
          <div className='form'>
            <h1>CRUD TODO</h1>
            <label>Подзаголовок:</label>
            <input type='text' name='movieName' value={movieName || ''} onChange={(e) => setMovieName(e.target.value)}></input>
            <label>Запись:</label>
            <input type='text' name='review' value={review || ''} onChange={(e) => setReview(e.target.value)}></input>
            <button onClick={submitReview}><b>Добавить</b></button>
          </div>
      </div>
      <div className='all-movie'>
        {movieReviewList.map((item) => {
          return (
            <div key={item.id} className='responce'>
              <button className='delete-btn' onClick={() => {
                deleteReview(item.movie_name)
                setRefresh(!refresh)}}>Удалить</button>
              <div>
                <h1>{item.movie_name}</h1>
                <p>{item.movie_review}</p>
              </div>
              <div className='update-block'>
                <input type='text' 
                placeholder='Введите новый текст'
                id='update-input' 
                onChange={(e) => setNewReview(e.target.value)}
                ></input>
                <button className='update-btn' onClick={() => updateReview(item.movie_name)}>Изменить</button>
              </div>
            </div> 
          )
        })}
      </div>  
    </div>
  );
}

export default App;
