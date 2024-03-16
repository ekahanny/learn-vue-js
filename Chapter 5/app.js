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
  props: {
    // default value pada props
    value: Number,
    prefix: {
      type: String,
      default: "Rp ",
    },
    precision: {
      type: Number,
      default: 2,
    },
  },
  template:
    "<span>{{ this.prefix + Number.parseFloat(this.value).toFixed(this.precision) }}</span>",
});

Vue.component("product-list", {
  props: ["products", "minimum"],
  /* 
  Method before, enter, leave yg sebelumnya berada
  pada parent object harus dipindahkan kedalam scope
  component product-list agar dpt digunakan pada 
  component itu sendiri.
  */
  methods: {
    before: function (el) {
      el.className = "d-none";
    },
    enter: function (el) {
      var delay = el.dataset.index * 100;
      setTimeout(function () {
        el.className =
          "row d-flex mb-3 align-items-center animated fadeInRight";
      }, delay);
    },
    leave: function (el) {
      var delay = el.dataset.index * 100;
      setTimeout(function () {
        el.className =
          "row d-flex mb-3 align-items-center animated fadeOutRight";
      }, delay);
    },
  },
  // emitting (baris 78) -> emitnya diberi nama add kemudian mengirim data yg diambil dari variabel item pada looping
  template: `
  <transition-group
  name="fade"
  tag="div"
  @beforeEnter="before"
  @enter="enter"
  @leave="leave"
>
  <div
    class="row d-none mb-3 align-items-center"
    v-for="(item, index) in products"
    :key="item.id"
    v-if="item.price >= Number(minimum) "
    :data-index="index"
  >
    <div class="col-1 m-auto">
      <button class="btn btn-info" @click.stop="$emit('add', item)">+</button>
    </div>
    <div class="col-sm-4">
      <img
        v-bind:src="item.image"
        v-bind:alt="item.name"
        class="img-fluid d-block"
      />
    </div>
    <div class="col">
      <h3 class="text-info">{{ item.name }}</h3>
      <p class="mb-0">{{ item.description }}</p>
      <div class="h5 float-right">
        <!-- value adlh bagian dari props yg nilainya diambil dari params item pada addItem -->
        <price :value="Number(item.price)" :prefix="'Rp '" :precision="2"></price>
      </div>
    </div>
  </div>
</transition-group>
  `,
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
