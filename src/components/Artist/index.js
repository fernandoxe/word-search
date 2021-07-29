import styled from 'styled-components';
import Album from '../Album';

const Container = styled.div`
  > .title {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  > .list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    
    > li :not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`;

const Artist = props => {
  return (
    <Container>
      <h2 className="title">{props.artist.artist}</h2>
      <ul className="list">
        {props.artist.albums.map((album, i) => <li  key={i}><Album album={album} /></li>)}
      </ul>
    </Container>
  );
};

export default Artist;