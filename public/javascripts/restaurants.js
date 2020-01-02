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
        $("#deleteRestaurant").attr("action", "restaurants/delete/" + res[0].ID);
        $("#restaurantName").val(res[0].name);
        $("#restaurantGenre").val(res[0].genre);
        $(".deleteRestaurant").attr("id", res[0].ID);
        $("#EditRestaurantModal").modal("show");
      });
  });

  $("#deleteRestaurant").on("click", function(e){
    e.preventDefault();
    $.ajax({
      type: "DELETE",
      url: "http://127.0.0.1:3000/restaurants/delete/" + e.target.id,
      success: () => {
        console.log("Success in deleting restaurant!");
        location.reload();
      },
      error: () => {
        console.log("Failed deleting restaurant!");
      }
    });
  });
});
