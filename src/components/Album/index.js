import styled from 'styled-components';
import Song from '../Song';

const Container = styled.div`
  .album {
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

const Album = props => {
  return (
    <Container>
      <h3 className="album__title">{props.album.name}</h3>
      <ul className="album__list">
        {props.album.songs.map((song, i) => <li className="album__item"  key={i}><Song key={i} song={song} /></li>)}
      </ul>
    </Container>
  );
}

export default Album;