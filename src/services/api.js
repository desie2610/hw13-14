import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "54251373-2a4c32186818dc40d01b0d483"; 

export const fetchImages = async (query, page) => {
  const { data } = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      page,
      per_page: 12,
      image_type: "photo",
      orientation: "horizontal",
    },
  });

  return data;
};