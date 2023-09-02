import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px;
  gap: 4px;
`;

const Button = styled.button`
  background: ${props => props.theme.button};
  color: ${props => props.theme.buttonText};
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  margin-top: 20px;
  padding: 8px;

  &:hover {
    cursor: pointer;
    background: ${props => props.theme.hoverButton};
    color: ${props => props.theme.text};
    transform: translateY(-2px);
  }

  &[disabled] {
    cursor: revert;
    background: ${props => props.theme.button};
    transform: revert;
  }

  &[aria-current] {
    cursor: revert;
    background: ${props => props.theme.mainColor};
    color: ${props => props.theme.text};
    font-weight: bold;
    transform: revert;
  }
`;

function PaginationComp({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);

  return (
    <>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </Button>
      </Nav>
    </>
  );
}

export default PaginationComp;
