import styled from 'styled-components';
import Lyrics from '../Lyrics';

const Container = styled.div`
  .song {
    &__title {
      margin-top: 0;
      margin-bottom: 1rem;
    }
    &__list {
      list-style-type: none;
      padding: 0;
      margin: 0 0.5rem;
    }
    &__item:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`;

const Song = props => {
  return (
    <Container>
      <h4 className="song__title">{props.song.title}</h4>
      <ul className="song__list">
        {props.song.lyrics.map((lines, i) => <li className="song__item" key={i}><Lyrics key={i} lines={lines} /></li>)}
      </ul>
    </Container>
  );
};

export default Song;