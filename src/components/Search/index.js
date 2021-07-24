import { useState } from 'react';
import styled from 'styled-components';
import SearchData from '../../services/searchdata';

const Container = styled.div`
  .card {
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    padding: 8px;
    margin-bottom: 8px;
    box-shadow: 2px 2px 5px 1px rgb(0 0 0 / 20%);
  }

  .song {
    display: flex;
    flex-direction: column;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 16px;
    }

    &__title {
      margin-bottom: 8px;
    }
  }
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
        <div key={i} className="song">
          <div className="song__title">{song.title}</div>
          {song.lyrics.map((lyric, j) => (
            <div key={j} className="card">
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