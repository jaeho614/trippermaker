import { styled } from "styled-components";

const Fullscreen = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 3000;
`;

const ModalBlock = styled.div`
  width: 40%;
  background-color: ${props => props.theme.white};
  border: 1px solid ${props => props.theme.border};
  border-radius: 4px;
  width: 40%;
  h2 {
    margin-bottom: 20px;
  }
  button {
    display: inline-block;
    text-align: center;
    margin: 1px;
    padding: auto;
    width: 24%;
    &.clicked {
      background-color: steelblue;
    }
    &.disabled {
      background-color: cadetblue;
    }
    &.ticket-ok {
      background-color: aquamarine;
      width: 48.5%;
    }
    &.ticket-close {
      background-color: aquamarine;
      width: 48.5%;
    }
  }
`;

const TicketComp = ({
  selectedCount,
  data,
  onSelectedSeat,
  onCnt,
  onSubmit,
  onCancel,
  tickets,
}) => {
  return (
    <Fullscreen>
      <ModalBlock>
        티켓 예매
        <p>
          인원 :
          <select onChange={onCnt} value={selectedCount}>
            <option name="cnt"></option>
            <option name="cnt">1</option>
            <option name="cnt">2</option>
            <option name="cnt">3</option>
            <option name="cnt">4</option>
            <option name="cnt">5</option>
          </select>
        </p>
        <p>좌석선택</p>
        {data.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`}>
            {row.map((item, colIndex) => {
              const ticket = tickets && tickets.find(ticket => ticket.seat === item.name);
              const isClicked = ticket !== undefined;

              return (
                <button
                  key={`col-${colIndex}`}
                  onClick={onSelectedSeat}
                  className={`items ${isClicked ? "disabled" : ""}`}
                  data-name={item.name}
                  disabled={isClicked}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
          // <div>ddddd</div>
        ))}
        {/* ))} */}
        <p>
          <button className="ticket-ok" onClick={onSubmit}>
            예약
          </button>
          <button className="ticket-close" onClick={onCancel}>
            취소
          </button>
        </p>
      </ModalBlock>
    </Fullscreen>
  );
};

export default TicketComp;
