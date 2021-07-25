import { useState } from 'react';
import styled from 'styled-components';
import SearchData from '../../services/searchdata';
import Song from '../Song';

const Container = styled.div`
  padding: 1rem;
  .form {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    
    &__content {
      width: 100%;
      display: flex;
      max-width: 30rem;
    }

    .input {
      font-family: inherit;
      font-size: 1rem;
      flex-grow: 1;
      height: 2rem;
    }
    .button {
      display: flex;
      padding: 0;
      margin-left: 0.5rem;
      border: none;
      background-color: transparent;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
      cursor: pointer;
      :enabled:active {
        color: red;
      }

      i {
        font-size: 2rem;
        font-weight: bold;
      }
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

    const songs = SearchData.getLyrics(inputValue.trim());
    console.log(songs);
    setResult(songs);
  };

  const parseSongs = (songs) => {
    return songs.map((song, i) => <Song key={i} song={song} /> );
  };

  return (
    <Container>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__content">
          <input
            className="input"
            type="search"
            placeholder="Type a word"
            onChange={handleInputChange}
          />
          <button className="button" disabled={inputValue.trim().length < 2}>
            <i className="material-icons">search</i>
          </button>
        </div>
      </form>
      {parseSongs(result)}
    </Container>
  );
};

export default Search;