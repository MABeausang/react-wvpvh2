import React, { useEffect, useState } from 'react';

/* import React from 'react'; */
import './style.css';
import Header from './header.js'; // importerar header
import Film from './film.js';

export default function App() {
  // Usestate variabler.
  const [films, setFilms] = useState([]);
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [producer, setProducer] = useState('');
  const [opening_crawl, setOpening_crawl] = useState('');
  const [release_date, setRelease_date] = useState('');
  const [inputText, setInputText] = useState('');
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    fetch('https://swapi.dev/api/films/')
      .then((response) => response.json())
      .then((data) => setFilms(data.results)); // Innehåller alla JSON data
  }, []);

  function showTitle() {
    setTitle(films[0].title);
    setDirector(films[0].director);
    setProducer(films[0].producer);
    setOpening_crawl(films[0].opening_crawl);
    setRelease_date(films[0].release_date);
  }

  const changeInputText = (e) => {
    setInputText(e.target.value);
    //...
  };

  function handleSearch(event) {
    if (event.key === 'Enter') {
      console.log('Jag har sökt på: ' + event.target.value);
      Match();
    }
  }

  function Match() {
    for (const film of films) {
      /*  console.log(film.title);
      console.log(inputText); */
      if (
        film.title.toLowerCase().includes(inputText.toLowerCase()) ||
        film.director.toLowerCase().includes(inputText.toLowerCase()) ||
        compareStrings(film.opening_crawl, inputText)
      ) {
        console.log('matchar nu med titel och sträng: ', film.title);
        setTitle(film.title);
        setDirector(film.director);
        setProducer(film.producer);
        setOpening_crawl(film.opening_crawl);
        setRelease_date(film.release_date);
        break;
      }
    }
    Updatecounter();
  }

  function Updatecounter() {
    let i = 0;
    for (const film of films) {
      if (
        film.title.toLowerCase().includes(inputText.toLowerCase()) ||
        film.director.toLowerCase().includes(inputText.toLowerCase()) ||
        compareStrings(film.opening_crawl, inputText)
      ) {
        i = i + 1;
      }
    }
    setCounter(i);
  }

  function compareStrings(a, b) {
    let match = false;
    if (a.toLowerCase().includes(b.toLowerCase())) match = true;
    return match;
  }

  return (
    <div>
      <Header />
      <input
        type="text"
        placeholder="Search"
        className="searchBox"
        onChange={changeInputText}
        onKeyDown={handleSearch}
        value={inputText}
        disabled={films.length === 0}
      ></input>
      <p className="resultcounter">Antalet filmer som matchar: {counter}</p>
      <section className="container">
        <div>Titel: {title}</div>
        <div>Release date: {release_date}</div>
        <div>Director: {director}</div>
        <div>Producer: {producer}</div>
        <div>Opening crawl: {opening_crawl}</div>
      </section>
    </div>
  );
}

//<Film filmtitel={title} /> {/* prop som har värdet title  */}
