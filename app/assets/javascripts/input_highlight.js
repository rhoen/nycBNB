
  $(document).ready(function() {
    $("form #email").keyup(function(e){
     var value = $(e.currentTarget).val();
     if(value === ""){
       $(this).removeClass("text-entered")
     } else {
       $(this).addClass("text-entered")
     }
   });
  })
