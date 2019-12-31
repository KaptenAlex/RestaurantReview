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
        $("#ModalTitle").text(res[0].name);
        $("#editForm").attr("action", "restaurants/" + res[0].ID);
        $("#restaurantName").val(res[0].name);
        $("#restaurantGenre").val(res[0].genre);
        $("#EditRestaurantModal").modal("show");
      });
  });

  //$(".saveChangesToRestaurant").on("click", function(e) {
  //  e.preventDefault();
  //  let id = e.target.id;
  //});
});
