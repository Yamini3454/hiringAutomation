import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" }); // your backend

export const saveHighScore = async (game, score) => {
  try {
    const res = await API.post("/scores", { game, score });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getHighScore = async (game) => {
  try {
    const res = await API.get(`/scores/${game}`);
    return res.data?.highScore ?? 0;
  } catch (err) {
    console.error("getHighScore error:", err?.response?.data || err.message);
    return 0;
  }
};
