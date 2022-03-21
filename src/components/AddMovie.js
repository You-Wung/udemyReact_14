import React, { useRef, useState } from 'react';

import classes from './AddMovie.module.css';

function AddMovie(props) {
  const [value, setValue] = useState();
  const titleRef = useRef('');
  const openingTextRef = useRef('');
  const releaseDateRef = useRef('');

  function submitHandler(event) {
    event.preventDefault();

    // could add validation here...

    const movie = {
      title: titleRef.current.value,
      year: openingTextRef.current.value,
      summary: releaseDateRef.current.value,
    };
    setValue('');
    props.onAddMovie(movie);
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' ref={titleRef} value={value} required />
      </div>
      <div className={classes.control}>
        <label htmlFor='opening-text'>Opening Text</label>
        <textarea rows='5' id='opening-text' ref={openingTextRef} value={value} required></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor='date'>Release Date</label>
        <input type='text' id='date' ref={releaseDateRef} value={value} required/>
      </div>
      <button>Add Movie</button>
    </form>
  );
}

export default AddMovie;
