// Property untuk contoh
let product = {
  name: "Jaket Parasut",
  description:
    "You’ll be the most environmentally conscious skier on the slopes – and the most stylish – wearing our fitted bamboo thermal ski coat, made from organic bamboo with recycled plastic down filling.",
  price: "$99.00",
  image:
    "https://hplussport.com/wp-content/uploads/2016/12/ski-coat_LYNDA_29940.jpg",
};

// Fitur Vue.js -> Mengelola Virtual DOM

// Membuat instance baru
let apps = new Vue({
  el: "#app", // Menambahkan property elemen sebagai selector
  data: product, // Digunakan untuk menyimpan data
});

/*--
  Reactive Data: Memanipulasi suatu data dari object 
  vue & property tersebut diambil ke dalam elemen html
*/
apps.name = "Bamboo Thermal Ski Coat";
