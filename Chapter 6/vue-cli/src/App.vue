<template>
  <!-- satu component memiliki satu div utama saja -->
  <div id="app" class="container mt-5">
    <h1>IDShop</h1>
    <p class="animated fadeInRight">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat a
      dignissimos laudantium id? Eius laboriosam sint recusandae molestias
      voluptatum eligendi rem dolores labore perferendis dicta! Voluptates
      magnam tenetur rerum facere.
    </p>
    <product-list
      :products="products"
      :maximum="maximum"
      @add="addItem"
    ></product-list>
  </div>
</template>

<script>
import productList from "./components/product-list.vue";

export default {
  name: "App",
  data: function () {
    return {
      maximum: 50,
      products: [],
      cart: [],
    };
  },
  components: {
    productList,
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
