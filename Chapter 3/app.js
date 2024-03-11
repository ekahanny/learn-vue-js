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
  computed: {
    sliderState: function () {
      return this.styles.sliderStatus ? "d-flex" : "d-none";
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
    addItem: function (item) {
      this.cart.push(item);
    },
  },
});
