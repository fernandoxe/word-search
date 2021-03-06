import styled from 'styled-components';

const Container = styled.div`
  .lyrics {
    &__list {
      list-style-type: none;
      padding: 1rem;
      border-radius: 0.5rem;
      box-shadow: 1px 1px 5px 3px rgba(0, 0, 0, 0.2);
      @media (prefers-color-scheme: dark) {
        box-shadow: 1px 1px 5px 3px rgba(255, 255, 255, 0.2);
      }
    }
  }
`;

const Lyrics = props => {
  return (
    <Container>
      <ul className="lyrics__list">
        {props.lines.map((line, i) => line ? <li key={i}>{line}</li> : null)}
      </ul>
    </Container>
  );
}

export default Lyrics;