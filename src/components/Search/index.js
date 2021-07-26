import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchData from '../../services/searchdata';
import Song from '../Song';

const Container = styled.div`
  padding: 1rem;
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;

    &__artists {
      width: 100%;
      max-width: 30rem;
      margin-bottom: 0.5rem;
      select {
        width: 100%;
        font-size: 1rem;
        height: 2rem;
        border: 1px solid #000;
        border-radius: 0.5rem;
        padding: 0.125rem 0.5rem;
        outline: none;
      }
    }
    
    &__search {
      width: 100%;
      max-width: 30rem;
      display: flex;
      border: 1px solid #000;
      border-radius: 0.5rem;
      overflow: hidden;
    }

    .input {
      font-family: inherit;
      font-size: 1rem;
      flex-grow: 1;
      height: 2rem;
      padding: 0.125rem 0.5rem;
      border: none;
      outline: none;
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
        color: #64b5f6;
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
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const allArtists = SearchData.getAllArtists();
    setArtists(allArtists);
  }, []);

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
      <form onSubmit={handleSubmit}>
        <div className="form">
          <div className="form__artists">
            <select name="select">
              <option value="All" selected>All</option>
              {artists.map((artist, i) =>
                <option key={i} value={artist}>{artist}</option>
              )}
            </select>
          </div>
          <div className="form__search">
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
        </div>
      </form>
      {parseSongs(result)}
    </Container>
  );
};

export default Search;