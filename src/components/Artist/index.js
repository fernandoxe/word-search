import styled from 'styled-components';
import Album from '../Album';

const Container = styled.div`
  .artist {
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

const Artist = props => {
  return (
    <Container>
      <h2 className="artist__title">{props.artist.artist}</h2>
      <ul className="artist__list">
        {props.artist.albums.map((album, i) => <li className="artist__item" key={i}><Album album={album} /></li>)}
      </ul>
    </Container>
  );
};

export default Artist;