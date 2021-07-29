import styled from 'styled-components';
import Lyrics from '../Lyrics';

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

const Song = props => {
  return (
    <Container>
      <h4 className="title">{props.song.title}</h4>
      <ul className="list">
        {props.song.lyrics.map((lines, i) => <li key={i}><Lyrics key={i} lines={lines} /></li>)}
      </ul>
    </Container>
  );
};

export default Song;