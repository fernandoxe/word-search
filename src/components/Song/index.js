import styled from 'styled-components';
import Lyrics from '../Lyrics';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  :last-child {
    margin-bottom: 1rem;
  }

  .title {
    margin-top: 0;
    margin-bottom: 1rem;
  }
`;

const Song = (props) => {
  return (
    <Container>
      <h3 className="title">{props.song.title}</h3>
      {props.song.lyrics.map((lines, i) => (
        <Lyrics key={i} lines={lines} />
      ))}
    </Container>
  );
};

export default Song;