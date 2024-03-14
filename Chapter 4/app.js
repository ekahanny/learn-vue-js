let app = new Vue({
  el: "#app",
  data: {
    minimum: 2.7,
    products: null,
    cart: [],
    styles: {
      label: ["font-weight-bold", "mr-2"],
      inputWidth: 60,
      sliderStatus: false,
    },
  },
  mounted: function () {
    fetch("https://hplussport.com/api/products/order/price")
      .then((response) => response.json())
      .then((data) => {
        this.products = data;
      });
  },
  // Filters -> Menampilkan/Memproses Suatu Data
  filters: {
    currencyFormat: function (value) {
      return "Rp" + Number.parseFloat(value).toFixed(2);
    },
  },
  computed: {
    sliderState: function () {
      return this.styles.sliderStatus ? "d-flex" : "d-none";
    },
    cartTotal: function () {
      let sum = 0;
      for (key in this.cart) {
        sum = sum + this.cart[key].items.price * this.cart[key].qty;
      }
      return sum;
    },
    cartQty: function () {
      let qty = 0;
      for (key in this.cart) {
        qty = qty + this.cart[key].qty;
      }
      return qty;
    },
  },
  methods: {
    before: function (el) {
      el.className = "d-none";
    },
    enter: function (el) {
      let delay = el.dataset.index * 100;
      setTimeout(function () {
        el.className =
          "row d-flex mb-3 align-items-center animated fadeInRight";
      }, delay);
    },
    leave: function (el) {
      /*
          dataset digunakan utk mengakses semua atribut 
          data yg didefinisikan pada elemen html. intinya,
          el.dataset.index digunakan utk mengakses index 
          
        */
      let delay = el.dataset.index * 100;
      setTimeout(function () {
        el.className =
          "row d-flex mb-3 align-items-center animated fadeOutRight";
      }, delay);
    },
    addItem: function (itemToAdd) {
      /*
      1. menyimpan nilai index item kedalam data cart
      2. mencari apakah ada item didlm cart dgn id tertentu
      3. jika ada, kita ambil nilai index dari item tsb
      4. jika sdh ada indexnya, kita buat property qty
      */
      let itemIndex;
      let itemExist = this.cart.filter(function (cartItem, index) {
        /*
        cartItem.items.id -> mengacu pada id dari item yang sudah ada dalam keranjang
        itemToAdd.id ->  mengacu pada id dari item yang akan ditambahkan ke keranjang
        */
        if (cartItem.items.id == Number(itemToAdd.id)) {
          itemIndex = index;
          return true;
        } else {
          return false;
        }
      });

      if (itemExist.length > 0) {
        this.cart[itemIndex].qty++;
      } else {
        // masing-masing item akan memiliki kuantitas
        this.cart.push({ items: itemToAdd, qty: 1 });
      }
    },
  },
});
