<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <nav class="navbar navbar-light fixed-top">
    <div class="navbar-text ml-auto d-flex">
      <button class="btn btn-sm btn-outline-success" @click="$emit('toggle')">
        <font-awesome-icon icon="dollar-sign"></font-awesome-icon>
      </button>
      <div class="dropdown ml-2" v-if="cart.length > 0">
        <button
          class="btn btn-success btn-sm dropdown-toggle"
          id="dropdownCart"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span class="badge badge-pill badge-light">{{ cartQty }}</span>
          <i class="fas fa-shopping-cart mx-2"></i>
          <font-awesome-icon icon="shopping-cart"></font-awesome-icon>
          <price-item :value="Number(cartTotal)"></price-item>
        </button>
        <div
          class="dropdown-menu dropdown-menu-right"
          aria-labelledby="dropdownCart"
        >
          <div v-for="(item, index) in cart" :key="index">
            <div class="dropdown-item-text text-nowrap text-right">
              <span class="badge badge-pill badge-warning align-text-top mr-1">
                {{ item.qty }}
              </span>
              {{ item.product.name }}
              <b>{{ currencyFormat(item.qty * item.product.price) }}</b>
              <a
                href="#"
                class="badge badge-danger text-white"
                @click.stop="deleteItem(index)"
                >-</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import priceItem from "./price-item.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "navigation-bar",
  components: {
    priceItem,
    FontAwesomeIcon,
  },
  props: ["cart", "cartQty", "cartTotal"],
  filters: {
    currencyFormat: function (value) {
      return "Rp " + Number.parseFloat(value).toFixed(2);
    },
  },
};
</script>
