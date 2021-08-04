import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchData from '../../services/searchdata';
import Artist from '../Artist';

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
      border: 1px solid #000;
      border-radius: 0.5rem;
      overflow: hidden;
      select {
        width: 100%;
        border: none;
        font-size: 1rem;
        height: 2rem;
        padding: 0.125rem 0.5rem;
        outline: none;
        @media (prefers-color-scheme: dark) {
          background-color: #000;
          color: inherit;
        }
      }
      @media (prefers-color-scheme: dark) {
        border: 1px solid #fff;
      }
    }
    
    &__search {
      width: 100%;
      max-width: 30rem;
      display: flex;
      border: 1px solid #000;
      @media (prefers-color-scheme: dark) {
        border: 1px solid #fff;
      }
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
      background-color: inherit;
      color: inherit;
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
      color: inherit;
      :enabled:active {
        color: #64b5f6;
      }

      i {
        font-size: 2rem;
        font-weight: bold;
      }
    }
  }

  .search {
    &__list {
      list-style-type: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &__item {
      width: 100%;
      max-width: 30rem;
      :not(:last-child) {
        margin-bottom: 1rem;
      }
    }
  }
`;

const Search = props => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState([]);
  const [artists, setArtists] = useState([]);
  const [selectValue, setSelectValue] = useState('All');

  useEffect(() => {
    const allArtists = SearchData.getAllArtistsNames();
    setArtists(allArtists);
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let allLyrics;
    if (selectValue === 'All') {
      allLyrics = SearchData.getAllLyricsWithText(inputValue.trim());
    } else {
      allLyrics = SearchData.getAllLyricsFromArtistNameWithText(inputValue, selectValue);
    }
    
    setResult(allLyrics);
  };

  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <div className="form__artists">
            <select name="select" onChange={handleSelectChange}>
              <option value="All">All</option>
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
              autoCapitalize="none"
              onChange={handleInputChange}
            />
            <button className="button" disabled={inputValue.trim().length < 2}>
              <i className="material-icons">search</i>
            </button>
          </div>
        </div>
      </form>
      <ul className="search__list">
        {result.map((artist, i) => <li className="search__item" key={i}><Artist artist={artist} /></li>)}
      </ul>
    </Container>
  );
};

export default Search;