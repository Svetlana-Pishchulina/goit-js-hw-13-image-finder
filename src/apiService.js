const KEY = '21205558-461e6a7a88c8071e477290c49';
const BASE_URL =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal&';

const perPage = 12;

export default class PicturesApiService {
  constructor(searchQuery) {
    this.page = 1;
    this.searchQuery = searchQuery;
  }
  fetchImages() {
    return fetch(
      `${BASE_URL}q=${this.searchQuery}&page=${this.page}&per_page=${perPage}&key=${KEY}`,
    ).then(response => {
      if (response.ok) {
        this.page += 1;
        return response.json();
      }
      throw new Error('Error fatching data');
    });
  }
  resetPage() {
    this.page = 1;
  }

  //   get query() {
  //     return this.searchQuery;
  //   }

  //   set query(value) {
  //     this.searchQuery = value;
  //   }
}
