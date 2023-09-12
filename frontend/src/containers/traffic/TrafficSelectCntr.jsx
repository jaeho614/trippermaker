import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTerminals, startTerminals, selectStartTerminal, endTerminals, selectEndTerminal, selectDateBus, unloadBus } from "../../modules/traffic/BusMod";
import { listStations, startStations, selectStartStation, endStations, selectEndStation, selectDateTrain, unloadTrain } from "../../modules/traffic/TrainMod";
import TrafficSelectComp from '../../components/traffic/TrafficSelectComp';
import LoadingComp from '../../components/common/LoadingComp';
import Swal from 'sweetalert2';

const TrafficSelectCntr = () => {
  const [target, setTarget] = useState(null);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [date, setDate] = useState('');

  const dispatch = useDispatch();

  const { terminals, stations, stationStartDetails, stationEndDetails, terminalStartDetails, terminalEndDetails, loading } = useSelector(({ BusMod, TrainMod, LoadingMod }) => ({
    terminals: BusMod?.terminals,
    stations: TrainMod?.stations,
    stationStartDetails: TrainMod?.stationStartDetails,
    stationEndDetails: TrainMod?.stationEndDetails,
    terminalStartDetails: BusMod?.terminalStartDetails,
    terminalEndDetails: BusMod?.terminalEndDetails,
    loading: LoadingMod
  }))

  const onClickArea = (e) => {
    const cityCode = e.target.value;
    if (target === 'train') {
      if (e.target.dataset.type === 'start') {
        dispatch(startStations({ cityCode }));
        onClickedItem(e, 'start-area', 'clicked');
      }
      else {
        dispatch(endStations({ cityCode }));
        onClickedItem(e, 'end-area', 'clicked');
      }
    } else if (target === 'bus') {
      if (e.target.dataset.type === 'start') {
        dispatch(startTerminals({ cityCode }));
        onClickedItem(e, 'start-area', 'clicked');
      }
      else {
        dispatch(endTerminals({ cityCode }));
        onClickedItem(e, 'end-area', 'clicked');
      }
    }
  }

  const onClickPlace = (e) => {
    const placeId = e.target.dataset.value;
    const placeName = e.target.dataset.name;
    let container;
    if (target === 'train') {
      if (e.target.dataset.type === 'start') {
        dispatch(selectStartStation({ stationId: placeId }));
        setStart(placeName);
        onClickedItem(e, 'start-detail', 'clicked');
        container = document.querySelector('#start-container');
      }
      else {
        dispatch(selectEndStation({ stationId: placeId }));
        setEnd(placeName);
        onClickedItem(e, 'end-detail', 'clicked');
        container = document.querySelector('#end-container');
      }
    } else {
      if (e.target.dataset.type === 'start') {
        dispatch(selectStartTerminal({ terminalId: placeId }));
        setStart(placeName);
        onClickedItem(e, 'start-detail', 'clicked');
        container = document.querySelector('#start-container');
      }
      else {
        dispatch(selectEndTerminal({ terminalId: placeId }));
        setEnd(placeName);
        onClickedItem(e, 'end-detail', 'clicked');
        container = document.querySelector('#end-container');
      }
    }
    if (container.className === 'list') {
      container.classList.add('flag');
    } else {
      container.classList.remove('flag');
    }
  }

  const onClickCategory = (e) => {
    setTarget(e.target.value);
    setEnd('');
    setStart('');
    setDate('');
    onClickedItem(e, 'category', 'traffic-category')
  }

  const onChangeDate = (e) => {
    const targetDate = e.target.value;
    const date = targetDate.replace(/-/g, '');
    setDate(targetDate);
    if (target === 'train') {
      dispatch(selectDateTrain({ dateTrain: date }));
    } else {
      dispatch(selectDateBus({ dateBus: date }));
    }
  }

  const onToggle = (e) => { // 출발지, 도착지를 보여주고 숨겨주기 위해 만든 function
    let container;
    if (e.target.dataset.id === 'start') {
      container = document.querySelector('#start-container');
    } else {
      container = document.querySelector('#end-container');
    }
    if (container.className === 'list') {
      container.classList.add('flag');
    } else {
      container.classList.remove('flag');
    }
  }

  const onClickedItem = (e, className, addClassName) => { // clicked된 대상에게 클릭 표시를 주기 위함
    const items = Array.from(document.getElementsByClassName(`${className}`));
    items.forEach((item) => {
      if (item === e.target) {
        item.classList.add(`${addClassName}`);
      } else {
        item.classList.remove(`${addClassName}`);
      }
    })
  }

  useEffect(() => {
    Swal.fire({
      icon: 'info',
      text: '교통수단 선택 후 출발지, 도착지, 날짜를 골라주세요!'
    })
  }, [])

  useEffect(() => {
    if (target === 'train') {
      dispatch(unloadBus())
      dispatch(listStations())
    } else {
      dispatch(unloadTrain())
      dispatch(listTerminals())
    }
  }, [dispatch, target])

  // if (loading && ()) {
  //   return <LoadingComp />
  // }

  return (
    <div>
      {
        <TrafficSelectComp
          terminals={terminals}
          stations={stations}
          stationStartDetails={stationStartDetails}
          stationEndDetails={stationEndDetails}
          terminalStartDetails={terminalStartDetails}
          terminalEndDetails={terminalEndDetails}
          onClickCategory={onClickCategory}
          onClickArea={onClickArea}
          onClickPlace={onClickPlace}
          onChangeDate={onChangeDate}
          onToggle={onToggle}
          start={start}
          end={end}
          date={date}
          loading={loading}
          target={target}
        />
      }
    </div>
  );
};

export default TrafficSelectCntr;

