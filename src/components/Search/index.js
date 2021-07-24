import { useState } from 'react';
import styled from 'styled-components';
import SearchData from '../../services/searchdata';

const Container = styled.div`

`;

const Search = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const songs = SearchData.getLyrics(inputValue);
    console.log(songs);
    setResult(songs);
  };

  const parseSongs = (songs) => {
    return songs.map((song, i) => (
        <div key={i}>
          <div>{song.title}</div>
          {song.lyrics.map((lyric, j) => (
            <div key={j}>
              {lyric.map((line, k) => line ? <div key={k}>{line}</div> : null)}
            </div>
          ))}
        </div>
      )
    );
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleInputChange} />
        <button>Search</button>
        {parseSongs(result)}
      </form>
    </Container>
  );
};

export default Search;