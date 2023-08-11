import client from "./client";

// 게시판 목록
export const mainListPosts = page => {
  return client.get(`/boardlist`, { params: { page } });
};

export const getMainStyle = async () => {
  return await client.get("/getMainStyle");
};

export const getMainTerms = async ({ type }) => {
  return await client.get(`/getMainTerms/${type}`);
};

export const getMainInform = async () => {
  return await client.get("/getMainInform");
};
