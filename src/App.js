import React, { useState, useEffect, useCallback } from "react";
import AddMovie from "./components/AddMovie";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

  
	//async 와 await 을 이용해서 .then 이 계속 묶여있는 것보다 가독성이 향상됨.
	//프로미스: 자바스크립트 비동기 처리에 사용되는 객체
	//비동기처리: 특정 코드의 실행이 완료될 때까지 기다리지 않고 다음 코드를 먼저 수행
	const fetchMovieHandler = useCallback(async () => {
    setLoading(true);
		setError(null);
		try {
      const response = await fetch(
          "https://react-http-3cca3-default-rtdb.firebaseio.com/movies.json"
        //"https://yts.mx/api/v2/list_movies.json?sort_by=download_count"   
        );
        
        if (!response.ok) throw new Error();

        const data = await response.json(); //http통신하는 코드 앞에 await붙임.
        //const transformedmovies = data.data.movies.map((movie) => {
          //  return {
            //    id: movie.id,
            //    title: movie.title,
            //    year: movie.year,
            //    summary: movie.summary,
            //  };
            //});
            //setMovies(transformedmovies);
            const loadedMovies = [];
    
            for (const key in data) {
              loadedMovies.push({
                id: key,
                title: data[key].title,
                year: data[key].year,
                summary: data[key].summary
              });
            }
            setMovies(loadedMovies);
      } catch (error) {
        setError('Error');
      }
      setLoading(false);
    }, []);
    
    useEffect(() => {
      fetchMovieHandler();
    }, [fetchMovieHandler]);

    async function AddMovieHandler(movie) {
      const response = await fetch("https://react-http-3cca3-default-rtdb.firebaseio.com/movies.json", {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log(data);
    }

    return (
      <React.Fragment>
        <section>
          <AddMovie onAddMovie={AddMovieHandler} />
        </section>
			<section>
				<button onClick={fetchMovieHandler}>Fetch Movies</button>
			</section>
			<section>
				{!loading && <MoviesList movies={movies} />}
				{!loading && movies.length === 0 && !error && <p>Found no movies.</p>}
        {!loading && error && <p>{error}</p>}
				{loading && <p>Loading...</p>}
			</section>
		</React.Fragment>
	);
}

export default App;
