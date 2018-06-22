$(document).ready(function () {


  var items = ["Food", "Cat", "Art", "Nature", "Activities"];


  function renderButtons() {
  
    $("#itemButtons").empty();
   

    for (var i = 0; i <items.length; i++) {

      var createButton = $("<button>");
      //createButton.addClass("btn btn-primary");
      //createButton.attr("data-name", items[i]);
      createButton.text(items[i]);
      $("#itemButtons").append(createButton);
    }
  }

  renderButtons();


  $("#addItem").on("click", function (event) {
    // Prevents the page from reloading as this is the default action for a submit button in a form
    event.preventDefault();

    var item = $("#itemInput").val().trim();
    // Add the new search term to the foods array
    items.push(item);

    renderButtons();
    // Clear out the text field after adding a new search button
    $("#itemInput").val("")

  });

  function searchGiphyAPI() {
    // Clears out the results from the previous search before populating new results
    $("#items").empty();
    $("#heading").empty();
    // Add a heading with instructions
    $("#heading").append("<h1>Click pic for animation</h1>");
    // Captures the value of the data-name attribute from the button that was pressed
    var itemSearch = $(this).attr("data-name");
    // QueryURL for Giphy API
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + itemSearch + "&api_key=dc6zaTOxFJmzC&limit=10";


    // Ajax call to pull in the objects from the Giphy API

    $.ajax({
        url: queryURL,
        method: 'GET'
      }).done(function (response) {
        var results = response.data;
        // Loops through only 10 gifs
        for (var i = 0; i < 10; i++) {
          console.log(queryURL);
          // Create 10 Divs to hold gifs
          var itemDiv = $("<div class=col-md-4>" + "<br>");
          var p = $("<p>").text("Rating: " + results[i].rating);
          // Create img tags and add some attributes
          var itemImage = $("<img>");
          itemImage.attr("src", results[i].images.fixed_width_still.url);
          itemImage.attr("data-still", results[i].images.fixed_width_still.url);
          itemImage.attr("data-animate", results[i].images.fixed_width.url);
          itemImage.attr("data-state", "still");
          itemImage.attr("class", "gif");
  
          itemDiv.append(p);
          itemDiv.append(itemImage);
  
          $("#items").prepend(itemDiv);
        }
  
      });
    }
  
    // Create buttons
 
  
    // Turn motion on and off when image is clicked
    function gifAnimate() {
  
      var state = $(this).attr("data-state");
  
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    };
  
    $(document).on("click", ".btn-primary", searchGiphyAPI);
    $(document).on("click", "img", gifAnimate);
  
  
  });