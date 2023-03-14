/* import React from 'react'; */
import React, { useEffect, useState } from 'react';
import './style.css';
import Header from './header.js'; // importerar header

export default function App() {
  // Usestate variabler
  const [films, setFilms] = useState([]);
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [producer, setProducer] = useState('');
  const [opening_crawl, setOpening_crawl] = useState('');
  const [release_date, setRelease_date] = useState('');
  const [inputText, setInputText] = useState('');
  const [counter, setCounter] = useState(0);

  // Hämtar information från API och lagrar i variabeln Films
  useEffect(() => {
    fetch('https://swapi.dev/api/films/')
      .then((response) => response.json())
      .then((data) => setFilms(data.results)); // Innehåller alla JSON data
  }, []);

  // Funktionen lagrar värdet från sökfältet i variabeln InputText
  const changeInputText = (e) => {
    setInputText(e.target.value);
  };

  // Funktionen läser av knapp-trycking. Vid Enter påbörjar vi vår sökning genom funktionen Match()
  function handleSearch(event) {
    if (event.key === 'Enter') {
      console.log('Jag har sökt på: ' + event.target.value);
      Match();
    }
  }

  // Funktionen matachar sökordet mot titel, director och opening crawl.
  // Använder sig av en for-loop för att gå igenom films-variabeln som är en array av filmerna.
  function Match() {
    for (const film of films) {
      if (
        // if-sats med OR  som avgör om titel, director eller opening crawl matchar mot sökordet.
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

  // Funktion med for-loop som går igenom om sökordet finns i filmtiteln, director eller opening crawl.
  // Om det blir en matchning retuneras en siffra med antalet matchningar.
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

  // Funktion som jämför två strängar med text och returnerar true om sträng b finns i sträng a. I vår kod används detta för opening crawl. Behövs egentligen inte, utan functionen skrevs för att testa ett alternativ till att korta ner OR-satserna i match() ovan.
  function compareStrings(a, b) {
    let match = false;
    if (a.toLowerCase().includes(b.toLowerCase())) match = true;
    return match;
  }

  return (
    <div>
      <Header />
      <input /* sökruta för vårt sökord, har funktioner bundna om användaren skriver i fältet (förklarade ovan. ) */
        type="text"
        placeholder="Search"
        className="searchBox"
        onChange={changeInputText}
        onKeyDown={handleSearch}
        value={inputText}
        disabled={films.length === 0}
      ></input>
      <section className="movieresult">
        {' '}
        {/* resultatbox för  vår hittade film. */}
        <ul className="movietext">Titel: {title}</ul>
        <ul className="movietext">Release date: {release_date}</ul>
        <ul className="movietext">Director: {director}</ul>
        <ul className="movietext">Producer: {producer}</ul>
        <ul className="movietext">Opening crawl: {opening_crawl}</ul>
      </section>
      <p className="resultcounter">Antalet filmer som matchar: {counter}</p>
    </div>
  );
}
