<template>
  <!-- satu component memiliki satu div utama saja -->
  <div id="app" class="container mt-5">
    <h1>IDShop</h1>
    <price-slider
      :sliderStatus="style.sliderStatus"
      v-model="maximum"
    ></price-slider>
    <product-list
      :maximum="maximum"
      :products="products"
      @add="addItem"
    ></product-list>
  </div>
</template>

<script>
import productList from "./components/product-list.vue";
import priceSlider from "./components/price-slider.vue";

export default {
  name: "App",
  data: function () {
    return {
      maximum: 50,
      products: [],
      cart: [],
      style: {
        sliderStatus: true,
      },
    };
  },
  components: {
    productList,
    priceSlider,
  },
  mounted: function () {
    fetch("https://hplussport.com/api/products/order/price")
      .then((response) => response.json())
      .then((data) => {
        this.products = data;
      });
  },
  methods: {
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
        this.cart.push({ items: itemToAdd, qty: 1 });
      }
    },
  },
};
</script>
