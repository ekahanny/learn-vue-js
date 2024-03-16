/*
Component memiliki dua params,
pertama adalah nama component,
kedua ialah sebuah object.

object data harus bertipe
function kemudian nilai dari
property pada data harus direturn
dalam bentuk object.

*/

Vue.component("price", {
  data: function () {
    return {};
  },
  // props : mengirim data ke suatu component
  props: ["value", "prefix", "precision"],
  template:
    "<span>{{ this.prefix + Number.parseFloat(this.value).toFixed(this.precision) }}</span>",
});

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
      let delay = el.dataset.index * 100;
      setTimeout(function () {
        el.className =
          "row d-flex mb-3 align-items-center animated fadeOutRight";
      }, delay);
    },
    addItem: function (itemToAdd) {
      let itemIndex;
      let itemExist = this.cart.filter(function (cartItem, index) {
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
    deleteItem: function (key) {
      if (this.cart[key].qty > 1) {
        this.cart[key].qty--;
      } else {
        this.cart.splice(key, 1);
      }
    },
  },
});
