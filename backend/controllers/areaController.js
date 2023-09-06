const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const { KNTO_TOUR_KEY } = process.env;

exports.areaList = async (req, res) => {
  const { areaCode } = req.params;
  const { pageNo, contentTypeId, numOfRows } = req.query;

  try {
    console.log('KNTO_TOUR_KEY ====>', KNTO_TOUR_KEY);
    const originAreas = await axios.get(`https://apis.data.go.kr/B551011/KorService1/areaBasedList1?serviceKey=${KNTO_TOUR_KEY}&numOfRows=${numOfRows}&pageNo=${pageNo}&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&areaCode=${areaCode}&contentTypeId=${contentTypeId}`);
    const areas = originAreas?.data;

    return res.json(areas); // id , 지역 ==> 가공
  } catch (e) {
    return res.status(400).json(e);
  }
};

exports.listDetail = async (req, res) => {
  const { contentId, contentTypeId } = req.params;

  try {
    const exWish = await axios.get(
      `https://apis.data.go.kr/B551011/KorService1/detailIntro1?serviceKey=${KNTO_TOUR_KEY}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${contentId}&contentTypeId=${contentTypeId}`
    );
    const getDetail = exWish.data.response.body.items.item[0];

    return res.status(200).json({ getDetail });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ detailError: true });
  }
};

exports.areaSearch = async (req, res) => {
  try {
    const { keyword } = req.params;
    const { pageNo, contentTypeId, areaCode } = req.query;
    let searchUrl = `https://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${KNTO_TOUR_KEY}&numOfRows=10&pageNo=${pageNo}&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&keyword=${keyword}`;
    if (typeof contentTypeId !== `undefined`) {
      searchUrl = searchUrl + `&contentTypeId=${contentTypeId}`;
    }
    if (typeof areaCode !== `undefined`) {
      searchUrl = searchUrl + `&areaCode=${areaCode}`;
    }
    const originalData = await axios.get(searchUrl);
    const areas = originalData.data;
    return res.json({ areas, searchType: "API" });
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};
