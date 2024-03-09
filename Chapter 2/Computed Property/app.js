let app = new Vue({
  el: "#app",
  data: {
    slugText: "The Quick #(*!&@ Brown 29",
  },
  computed: {
    slugetize: function () {
      return (
        this.slugText
          .toLowerCase()
          .replace(/[^\w ]+/g, "")
          .replace(/ +/g, "-") +
        "-" +
        this.now
      );
    },
  },
  methods: {
    now: function () {
      let date = new Date();
      return (
        String(date.getHours()) +
        String(date.getMinutes()) +
        String(date.getSeconds())
      );
    },
  },
});

/*
Perbedaan Method dan Computed
Computed value ter-cached oleh browser, sedangkan methods tidak.
Jadi bila dalam sebuah view muncul 100 variable yg sama, computed
hanya menjalankan fungsi 1x saja (selama tidak ada perubahan),
sedangkan methods akan menjalankan fungsi tersebut 100x. Selain itu,
method sebaiknya digunakan bila functionnya memiliki parameter.
*/
