$(function() {
  $(".openEditModal").on("click", function(e) {
    let id = e.target.id;
    fetch("http://127.0.0.1:3000/restaurants/" + id)
      .then((response) => {
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

  $("#deleteRestaurant").on("click", function(e) {
    e.preventDefault();
    $.ajax({
      type: "DELETE",
      url: "http://127.0.0.1:3000/restaurants/delete/" + e.target.id,
      success: () => {
        location.reload();
      },
      error: () => {}
    });
  });
  $(".reviewRestaurant").on("click", function(e) {
    let restaurantID = e.target.id;
    //make fetch request here
    fetch("http://127.0.0.1:3000/reviews/" + restaurantID)
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        let res;
        res = jsonData;
        for (var i = 0; i < res.length; i++) {
          $("#reviews").append("<div><h5 class='modal-title'>User: " + res[i].userName +
            "</h5><p>Review: " + res[i].review + "</p><p>Rating: " + res[i].rating + " Stars</p></br></div>");
        }
        if (res.length < 1) {
          $("#reviews").append("<div id='noReviews'><h5 class='modal-title'>There doesn't seem to be any reviews on this restaurant, but you can be the first!</h5></div>")
        }
        $("#hiddenRestaurantID").val(restaurantID);
        $("#submitReview").attr("disabled", true);
        $("#reviewModal").modal("show");
      });
  });
  $("#review").on("change keyup", function() {
    let lengthOfReview = $("#review").val().length;
    $("#charactersLeft").text(200 - lengthOfReview + " characters left");
    if (lengthOfReview < 1) {
      $("#submitReview").attr("disabled", true);
    } else {
      $("#submitReview").attr("disabled", false);
    }
  });
  $("#reviewModal").on("hidden.bs.modal", function() {
    $("#reviews").empty();
    $("#review").val("");
    $("#rating").val("1");
    $("#charactersLeft").text("200 characters left");
  });
  $("#LoginModal").on("hidden.bs.modal", function() {
    $("#loginUsername").val("");
    $("#loginPassword").val("");
    $("#createUsername").val("");
    $("#createPassword").val("");
  });
  $("#CreateRestaurantModal").on("hidden.bs.modal", function() {
    $("#nameForRestaurant").val("");
    $("#genreForRestaurant").val("");
  });
});
