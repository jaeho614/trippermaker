import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listAreas,
  unloadPage,
  showSearchType,
} from "../../modules/search/SearchMod";
import ModalBasic from "../../components/common/ModalBasic";
import Swal from "sweetalert2";
import { addWishList } from "../../modules/wishList/WishListMod";
import SearchResultComp from "../../components/search/SearchResultComp";

const SearchResultCntr = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [mapData, setMapData] = useState({});

  const onClick = e => {
    setModalOpen(true);
    setMapData({
      title: e.target.dataset.title,
      mapx: e.target.dataset.mapx,
      mapy: e.target.dataset.mapy,
    });
  };

  const addWish = e => {
    Swal.fire({
      text: "추가할까요?",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Add",
    })
      .then(result => {
        const id = user.id;
        const contentid = e.target.dataset.contentid;
        const title = e.target.dataset.title;
        const contenttypeid = e.target.dataset.contenttypeid;
        if (result.isConfirmed) {
          dispatch(addWishList({ id, contentid, title, contenttypeid }));
          Swal.fire({
            icon: "success",
            text: `추가했습니다.`,
          });
        } else if (result.isDismissed) {
          Swal.fire({
            icon: "question",
            text: "추가 안했습니다.",
          });
        }
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          text: "추가실패",
        });
      });
  };

  const dispatch = useDispatch();

  const {
    areas,
    error,
    loading,
    areaCode,
    pageNo,
    contentTypeId,
    keyword,
    searchType,
    user,
  } = useSelector(({ SearchMod, LoadingMod, UserMod }) => ({
    areas: SearchMod?.areas,
    error: SearchMod?.error,
    areaCode: SearchMod?.areaCode,
    pageNo: SearchMod?.pageNo,
    contentTypeId: SearchMod?.contentTypeId,
    keyword: SearchMod.keyword,
    searchType: SearchMod.searchType,
    user: UserMod.user,
    loading: LoadingMod["search/LIST_AREAS"],
  }));

  useEffect(() => {
    return () => dispatch(unloadPage());
  }, [dispatch]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (keyword) {
        if (!searchType)
          dispatch(
            listAreas({ pageNo, areaCode, contentTypeId, keyword, searchType })
          );
        else if (searchType === "DB")
          dispatch(
            listAreas({ pageNo, areaCode, contentTypeId, keyword, searchType })
          );
        else if (searchType === "API")
          dispatch(
            listAreas({ pageNo, areaCode, contentTypeId, keyword, searchType })
          );
      }
    }
  }, [dispatch, pageNo, areaCode, contentTypeId, keyword, searchType]);

  useEffect(() => {
    if (areas) dispatch(showSearchType(areas.searchType));
  }, [dispatch, areas, searchType]);

  if (!areas) {
    return <div></div>;
  }

  return (
    <>
      {modalOpen && (
        <ModalBasic setModalOpen={setModalOpen} mapData={mapData} />
      )}
      <SearchResultComp
        error={error}
        areas={areas}
        loading={loading}
        onClick={onClick}
        addWish={addWish}
        searchType={searchType}
      />
    </>
  );
};

export default SearchResultCntr;
