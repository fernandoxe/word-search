import styled from 'styled-components';
import Song from '../Song';

const Container = styled.div`
  > .title {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  > .list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    
    > li:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`;

const Album = props => {
  return (
    <Container>
      <h3 className="title">{props.album.name}</h3>
      <ul className="list">
        {props.album.songs.map((song, i) => <li key={i}><Song key={i} song={song} /></li>)}
      </ul>
    </Container>
  );
}

export default Album;