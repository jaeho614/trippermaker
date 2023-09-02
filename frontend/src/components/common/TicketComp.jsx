import { styled } from "styled-components";

const Fullscreen = styled.div`
  position: fixed;
  z-index: 3000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBlock = styled.div`
  width: 40%;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #333;
  h2 {
    margin-bottom: 20px;
  }
  button{
    width: 24%;
    padding: auto;
    margin: 1px;
    text-align: center;
    display: inline-block;
    &.clicked{
      background-color: steelblue;
    }
    &.disabled{
      background-color:cadetblue;
    }
    &.ticket-ok{
      background-color: aquamarine;
      width: 48.5%;
    } 
    &.ticket-close{
      background-color: aquamarine;
      width: 48.5%;
    }
  }
`;

const TicketComp = ({ selectedCount, data, onSelectedSeat, onCnt, onSubmit, onCancel, tickets }) => {
  return (
    <Fullscreen>
      <ModalBlock>
        티켓 예매
        <p>
          인원 :
          <select onChange={onCnt} value={selectedCount}>
            <option name='cnt'></option>
            <option name='cnt'>1</option>
            <option name='cnt'>2</option>
            <option name='cnt'>3</option>
            <option name='cnt'>4</option>
            <option name='cnt'>5</option>
          </select>
        </p>
        <p>좌석선택</p>
        {data.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`}>
            {row.map((item, colIndex) => {
              const ticket = tickets.find(ticket => ticket.seat === item.name);
              const isClicked = ticket !== undefined;

              return (<button key={`col-${colIndex}`} onClick={onSelectedSeat} className={`items ${isClicked ? 'disabled' : ''}`} data-name={item.name} disabled={isClicked}>{item.name}</button>)
            }
            )}
          </div>
        ))}
        {/* ))} */}
        <p><button className="ticket-ok" onClick={onSubmit}>예약</button><button className="ticket-close" onClick={onCancel}>취소</button></p>
      </ModalBlock>
    </Fullscreen>
  );
};

export default TicketComp;
