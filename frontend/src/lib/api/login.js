import client from "./client";

export const login = async ({ id, pwd }) => {
  return await client.post("/auth/login", { id, pwd });
};

export const logout = async () => {
  return await client.get("/auth/logout");
};

export const check = async () => {
  return await client.get("/auth/check");
};

export const searchId = async ({ phone }) => {
  return await client.post("/auth/searchId", { phone });
};

export const searchPwd = async ({ email, phone }) => {
  return await client.post("/auth/searchPwd", { email, phone });
};

export const updatePwd = async ({ email, pwd }) => {
  return await client.post(`/auth/searchPwd/${email}`, { pwd });
};

export const urlCheck = async ({ id, sendTime }) => {
  return await client.get(`/auth/searchPwd/${id}/${sendTime}`);
};
