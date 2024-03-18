<template>
  <!-- satu component memiliki satu div utama saja -->
  <div id="app" class="container mt-5">
    <h1>IDShop</h1>
    <navigation-bar
      :cart="cart"
      :cartQty="cartQty"
      :cartTotal="cartTotal"
      @toggle="toggleSliderStatus"
    ></navigation-bar>
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
import navigationBar from "./components/navigation-bar.vue";

export default {
  name: "App",
  data: function () {
    return {
      maximum: 50,
      products: [],
      cart: [],
      style: {
        sliderStatus: false,
      },
    };
  },
  components: {
    productList,
    priceSlider,
    navigationBar,
  },
  mounted: function () {
    fetch("https://hplussport.com/api/products/order/price")
      .then((response) => response.json())
      .then((data) => {
        this.products = data;
      });
  },
  computed: {
    cartTotal: function () {
      let sum = 0;
      for (let key in this.cart) {
        sum = sum + this.cart[key].product.price * this.cart[key].qty;
      }
      return sum;
    },
    cartQty: function () {
      let qty = 0;
      for (let key in this.cart) {
        qty = qty + this.cart[key].qty;
      }
      return qty;
    },
  },
  methods: {
    toggleSliderStatus: function () {
      this.$set(this.style, "sliderStatus", !this.style.sliderStatus);
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
        this.cart.push({ items: itemToAdd, qty: 1 });
      }
    },
  },
};
</script>
