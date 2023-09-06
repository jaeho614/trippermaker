import { useEffect, useState } from "react";
import TrafficListComp from "../../components/traffic/TrafficListComp";
import { useDispatch, useSelector } from "react-redux";
import { listTrains } from "../../modules/traffic/TrainMod";
import { listBuses } from "../../modules/traffic/BusMod";
import { findVacancy, createTicket } from "../../modules/traffic/TicketMod";
import LoadingComp from "../../components/common/LoadingComp";
import Swal from "sweetalert2";
import TicketComp from "../../components/common/TicketComp";

const TrafficListCntr = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState([
    [
      { name: "A1", vacancy: null },
      { name: "A2", vacancy: null },
      { name: "A3", vacancy: null },
      { name: "A4", vacancy: null },
    ],
    [
      { name: "B1", vacancy: null },
      { name: "B2", vacancy: null },
      { name: "B3", vacancy: null },
      { name: "B4", vacancy: null },
    ],
    [
      { name: "C1", vacancy: null },
      { name: "C2", vacancy: null },
      { name: "C3", vacancy: null },
      { name: "C4", vacancy: null },
    ],
    [
      { name: "D1", vacancy: null },
      { name: "D2", vacancy: null },
      { name: "D3", vacancy: null },
      { name: "D4", vacancy: null },
    ],
    [
      { name: "E1", vacancy: null },
      { name: "E2", vacancy: null },
      { name: "E3", vacancy: null },
      { name: "E4", vacancy: null },
    ],
    [
      { name: "F1", vacancy: null },
      { name: "F2", vacancy: null },
      { name: "F3", vacancy: null },
      { name: "F4", vacancy: null },
    ],
    [
      { name: "G1", vacancy: null },
      { name: "G2", vacancy: null },
      { name: "G3", vacancy: null },
      { name: "G4", vacancy: null },
    ],
    [
      { name: "H1", vacancy: null },
      { name: "H2", vacancy: null },
      { name: "H3", vacancy: null },
      { name: "H4", vacancy: null },
    ],
    [
      { name: "I1", vacancy: null },
      { name: "I2", vacancy: null },
      { name: "I3", vacancy: null },
      { name: "I4", vacancy: null },
    ],
  ]);
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [selectedCount, setSelectedCount] = useState(1);
  const [modal, setModal] = useState(false);
  const [resultItem, setResultItem] = useState(null);

  const {
    resultTrains,
    resultBuses,
    pageNoTrain,
    pageNoBus,
    dateTrain,
    dateBus,
    startStation,
    startTerminal,
    endStation,
    endTerminal,
    loading,
    tickets,
    user,
  } = useSelector(({ BusMod, TrainMod, LoadingMod, UserMod, TicketMod }) => ({
    resultTrains: TrainMod?.resultTrains,
    resultBuses: BusMod?.resultBuses,
    pageNoTrain: TrainMod?.pageNoTrain,
    pageNoBus: BusMod?.pageNoBus,
    dateTrain: TrainMod.dateTrain,
    dateBus: BusMod.dateBus,
    startStation: TrainMod.startStation,
    startTerminal: BusMod.startTerminal,
    endStation: TrainMod.endStation,
    endTerminal: BusMod.endTerminal,
    user: UserMod.user,
    tickets: TicketMod?.tickets,
    loading: LoadingMod,
  }));

  const onTicketing = e => {
    const item = e.currentTarget.dataset.item;
    const jsonItem = JSON.parse(item);
    setResultItem(jsonItem);
    const category = resultTrains ? "기차" : "버스";
    const type = jsonItem.gradeNm ? jsonItem.gradeNm : jsonItem.traingradename;
    const startPlace = jsonItem.depplacename
      ? jsonItem.depplacename
      : jsonItem.depPlaceNm;
    const endPlace = jsonItem.arrplacename
      ? jsonItem.arrplacename
      : jsonItem.arrPlaceNm;
    const startDate = jsonItem.depPlandTime
      ? jsonItem.depPlandTime
      : jsonItem.depplandtime;
    const endDate = jsonItem.arrPlandTime
      ? jsonItem.arrPlandTime
      : jsonItem.arrplandtime;
    dispatch(
      findVacancy({ category, type, startPlace, startDate, endPlace, endDate })
    );
    setModal(true);
  };

  const onCnt = e => {
    if (e.target.value !== "") {
      const cnt = parseInt(e.target.value);
      setSelectedCount(cnt);
      setSelectedSeat([]);
      const items = document.querySelectorAll(".items");
      items.forEach(item => {
        if (item.className !== "items" && !item.disabled) {
          item.className = "items";
        }
      });
    }
  };

  const onSelectedSeat = e => {
    const seat = e.target.dataset.name;
    if (e.target.className === "items") {
      if (selectedSeat.length < selectedCount) {
        e.target.className = "items clicked";
        setSelectedSeat(selectedSeat => {
          const uno = user.no;
          return [...selectedSeat, { name: seat, vacancy: uno }];
        });
      }
    } else {
      setSelectedSeat(
        selectedSeat.filter(seat => seat.name !== e.target.value)
      );
      e.target.className = "items";
    }
  };

  const onSubmit = async () => {
    const category = resultTrains ? "기차" : "버스";
    const uno = user.no;
    const type = resultItem.gradeNm
      ? resultItem.gradeNm
      : resultItem.traingradename;
    const price = resultItem.charge ? resultItem.charge : 20000;
    const startPlace = resultItem.depplacename
      ? resultItem.depplacename
      : resultItem.depPlaceNm;
    const endPlace = resultItem.arrplacename
      ? resultItem.arrplacename
      : resultItem.arrPlaceNm;
    const startDate = resultItem.depPlandTime
      ? resultItem.depPlandTime
      : resultItem.depplandtime;
    const endDate = resultItem.arrPlandTime
      ? resultItem.arrPlandTime
      : resultItem.arrplandtime;
    const seats = JSON.stringify(selectedSeat);
    // console.log('되냥!!!!!!')
    dispatch(createTicket({ category, uno, type, price, startPlace, startDate, endPlace, endDate, seats }))
    onCancel();
  };
  const onCancel = () => {
    setModal(false);
    setSelectedCount(1);
    setSelectedSeat([]);
  };

  useEffect(() => {
    if (startStation && endStation && dateTrain !== "" && dateTrain) {
      const startValue = startStation.stationId;
      const endValue = endStation.stationId;
      const date = dateTrain.dateTrain;
      dispatch(
        listTrains({
          startStation: startValue,
          endStation: endValue,
          dateTrain: date,
          pageNoTrain,
        })
      );
    }
  }, [dispatch, pageNoTrain, startStation, endStation, dateTrain]);

  useEffect(() => {
    if (startTerminal && endTerminal && dateBus !== "" && dateBus) {
      const startValue = startTerminal.terminalId;
      const endValue = endTerminal.terminalId;
      const date = dateBus.dateBus;
      dispatch(
        listBuses({
          startTerminal: startValue,
          endTerminal: endValue,
          dateBus: date,
          pageNoBus,
        })
      );
    }
  }, [dispatch, startTerminal, endTerminal, dateBus, pageNoBus]);

  if (loading && !resultTrains && !resultBuses) {
    return <div></div>;
  }

  return (
    <div>
      {pageNoTrain && startStation && endStation && dateTrain && (
        <TrafficListComp
          resultTrains={resultTrains}
          loading={loading}
          onTicketing={onTicketing}
        />
      )}
      {pageNoBus && startTerminal && endTerminal && dateBus && (
        <TrafficListComp
          resultBuses={resultBuses}
          loading={loading}
          onTicketing={onTicketing}
        />
      )}
      {modal && (
        <TicketComp
          selectedCount={selectedCount}
          data={data}
          onSelectedSeat={onSelectedSeat}
          onCnt={onCnt}
          onSubmit={onSubmit}
          onCancel={onCancel}
          tickets={tickets}
        />
      )}
    </div>
  );
};

export default TrafficListCntr;
