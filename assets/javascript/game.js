// INITIAL DATA ARRAY
      var emotion = ["Happy", "Frustrated", "Rushed", "Awake", "Surprised", "Calm"];

// CREATE BUTTONS WITH USER INPUT
    // Display emotion data in buttons
      
      function renderButtons() {
          $(".gifButtons").empty();
          
          for (var i = 0; i < emotion.length; i++) {
              // DYNAMICALLY CREATE BUTTONS FOR EACH BUTTON
              var btn = $("<button>");
              
              // ADD CLASS TO BUTTON
              btn.addClass("emotionBtn btn btn-default");
                      
              // ADD DATA-ATTRIBUTE
              btn.attr("data-name", emotion[i]);
              
              // BTN TEXT
              btn.text(emotion[i]);
                      
              // ADD BTN INTO HTML
              $(".gifButtons").append(btn);

            }
      }

// FUNCTION TO HANDLE CLICK EVENT OF ONE BUTTON 

      $("#add-gif").on("click", function(event) {
          
          // Preventing the buttons default behavior when clicked (which is submitting a form)
          event.preventDefault();
          
          $("#gif-input").empty();

          //  GRAB TEXT INPUT
          var newEmotion = $("#gif-input").val().trim();

          // ADD TEXT TO ARRAY
          emotion.push(newEmotion);

          //  CALL FUNCTION TO PROCESS ARRAY
          renderButtons();

      });

//  CALL FUNCTION TO DISPLAY INITIAL ARRAY 
      renderButtons();

// // ADD GIFS WHEN BUTTON IS CLICKED FROM GIPHY API
 
      $(document).on("click", ".emotionBtn", logAjaxUrl);

 function logAjaxUrl(){
//  CONSTRUCT QUERYURL USING emotionType

      var emotionType = $(this).attr("data-name");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        emotionType + "&api_key=dc6zaTOxFJmzC&limit=10";

      $(".gifsGoHere").empty();

 // Performing an AJAX request with the queryURL
      $.ajax({
          url: queryURL,
          method: "GET"
      })

// After data comes back from the request
      .done(function(response) {
          console.log(queryURL);
        
         // storing the data from the AJAX request in the results variable
          var results = response.data;
          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

             // Creating and storing a div tag
            var emotionDiv = $("<div>");

            // Creating and storing an image tag
            var emotionImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            
            emotionImage.attr("src", results[i].images.fixed_height_still.url);
            emotionImage.attr("data-still", results[i].images.fixed_height_still.url);
            emotionImage.attr("data-animate", results[i].images.fixed_height.url);
            emotionImage.attr("data-state", "still");
            emotionImage.addClass("gifImg thumbnail");

            // Appending the paragraph and image tag to the animalDiv
            emotionDiv.append(emotionImage);
            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $(".gifsGoHere").prepend(emotionDiv);
          }

      })

};

$(document).on("click", ".gifImg", animateGif);

function animateGif() {
   
      var state = $(this).attr("data-state");
           
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else if (state !== "still"){
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    };


