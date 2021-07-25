import styled from 'styled-components';

const Container = styled.div`
  width: 80%;
  max-width: 30rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);
  :not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const Lyrics = (props) => {
  return (
    <Container>
      {props.lines.map((line, k) =>line ? <div key={k}>{line}</div> : null)}
    </Container>
  );
}

export default Lyrics;