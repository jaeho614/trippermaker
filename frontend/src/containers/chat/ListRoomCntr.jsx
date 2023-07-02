import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListRoomComp from "../../components/chat/ListRoomComp";
import { listRooms } from "../../modules/chat/RoomMod";
import { useSearchParams } from "react-router-dom";

const onClick = (e) => {
  console.log("item : ", e.target.value);
};

const ListRoomCntr = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { rooms, error, loading } = useSelector(({ RoomMod }) => ({
    rooms: RoomMod.rooms,
    error: RoomMod.error,
  }));

  useEffect(() => {
    const page = parseInt(searchParams.get("page"), 10) || 1;
    dispatch(listRooms({ page }));
  }, [dispatch, searchParams]);
  return (
    <ListRoomComp
      error={error}
      rooms={rooms}
      loading={loading}
      onClick={onClick}
    />
  );
};

export default ListRoomCntr;
