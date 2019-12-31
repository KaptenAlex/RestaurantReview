$(function() {
  console.log("ready for restaurant!");
  $(".openEditModal").on("click", function(e) {
    let id = e.target.id;
    //console.log(id);
    fetch("http://127.0.0.1:3000/restaurants/" + id)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((jsonData) => {
      let res;
      res = jsonData;
      $("#restaurantID").text("ID: " + res[0].ID);
      $("#ModalTitle").text(res[0].name);
      $("#restaurantName").val(res[0].name);
      $("#restaurantGenre").val(res[0].genre);
      $("#EditRestaurantModal").modal("show");
    });
  });
});
