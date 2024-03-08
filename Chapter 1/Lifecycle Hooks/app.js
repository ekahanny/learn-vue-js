// Lifecycle Hooks

/*
Memuat banyak event yang terjadi 
saat pembuatan component/object vue
*/

// component
let app = new Vue({
  el: "#app",
  data: {
    minimum: 2.8,
    products: null,
    cart: [],
  },
  // Event Mounted
  mounted: function () {
    /*
      proses yang akan terjadi saat component
      telah dimuat dan template siap dirender.
      Event mounted akan mengeksekusi proses
      didalam property & bisa dimanfaatkan
      untuk mengambil data dari API
      
      ketika komponen siap digunakan, kita akan
      mengambil data product dari API lalu saat
      datanya sudah dimiliki, respon tsb akan
      dipindahkan kedalam variabel products.
      */
    fetch("https://hplussport.com/api/products/order/price")
      .then((response) => response.json())
      .then((data) => {
        this.products = data;
      });
  },
  /*
  Membuat func addItem yang berisi parameter
  item (diambil dari htmlnya), kemudian isi
  dari variabel item akan ditambahkan kedalam
  array cart.
  */
  methods: {
    addItem: function (item) {
      this.cart.push(item);
    },
  },
});
