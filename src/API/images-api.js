import { BASE_URL } from './constants';
import { API_KEY } from './constants';

export default function fetchImages(name, page = 1) {
  return fetch(
    `${BASE_URL}/?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`There are no images ${name}`),
    );
  });
}
