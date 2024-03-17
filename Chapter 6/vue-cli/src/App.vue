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
    <font-awesome-icon icon="shopping-cart"></font-awesome-icon>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "App",
  components: {
    FontAwesomeIcon,
  },
};
</script>
