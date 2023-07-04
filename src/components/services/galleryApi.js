import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com/api`;

export const galleryApi = async (search, page = 1) => {
  const filters =
    '&image_type=photo&orientation=horizontal&safesearch=true&per_page=12';
  const key = '35246329-add22568f1c638791398d2d1c';

  try {
    const response = await axios.get(`/?q=
      ${search}&page=${page}&key=${key}${filters}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
