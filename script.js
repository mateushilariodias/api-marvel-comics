new Vue({
    el: '#app',
    data: {
      comics: [],
      loading: true
    },
    mounted() {
      this.fetchComics();
    },
    methods: {
      fetchComics() {
        const publicKey = '152924e0ecf935d5391aa1d0e9544076';
        const privateKey = '12ac09a43c51f5e001eeb85ec18b7257bb6700cf';
        const timestamp = new Date().getTime();
        const hash = md5(timestamp + privateKey + publicKey);
        const url = `https://gateway.marvel.com/v1/public/comics?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
        console.log(url);
        fetch(url)
          .then(response => response.json())
          .then(data => {
            this.comics = data.data.results;
            this.loading = false;
          })
          .catch(error => {
            console.error('Error fetching comics:', error);
            this.loading = false;
          });
      }
    }
  });
  