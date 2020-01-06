$(function(){
  $(".createAccount-box").hide();
  $("#createAccount").on("click", function(){
    $(".login-box").hide();
    $(".createAccount-box").show();
  });
  $("#loginAccount").on("click", function(){
    $(".createAccount-box").hide();
    $(".login-box").show();
  });
});
