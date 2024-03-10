let app = new Vue({
  el: "#app",
  data: {
    minimum: 2.7,
    products: null,
    cart: [],
    styles: {
      label: ["font-weight-bold", "mr-2"],
    },
  },
  mounted: function () {
    fetch("https://hplussport.com/api/products/order/price")
      .then((response) => response.json())
      .then((data) => {
        this.products = data;
      });
  },
});
