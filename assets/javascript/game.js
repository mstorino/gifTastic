// Initial array of Feelings
      var emotion = ["Happy", "Sad", "Frustrated", "Awake"];
      // var emotionType;

      // Generic function for capturing feelings from the data-attribute SEE LINE 49 ALSO COMMENTED OUT
      // function logEmotionName() {
      //   emotionType = $(this).attr("data-name");
      // }

// CREATE BUTTONS WITH USER INPUT
            // Display emotion data in buttons
            function renderButtons() {

                    $(".gifButtons").empty();

                    for (var i = 0; i < emotion.length; i++) {

                      // Then dynamicaly generating buttons for each movie in the array
                      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
                      var btn = $("<button>");
                      // Adding a class of movie to our button
                      btn.addClass("emotionBtn");
                      // Adding a data-attribute
                      btn.attr("data-name", emotion[i]);
                      // Providing the initial button text
                      btn.text(emotion[i]);
                      // Adding the button to the HTML
                      $(".gifButtons").append(btn);
                    }
                  }

             // // This function handles events where one button is clicked
                  $("#add-gif").on("click", function(event) {
                    // Preventing the buttons default behavior when clicked (which is submitting a form)
                    event.preventDefault();

             //        // This line grabs the input from the textbox
                    var newEmotion = $("#gif-input").val().trim();

             //        // Adding the movie from the textbox to our array
                    emotion.push(newEmotion);

             //        // Calling renderButtons which handles the processing of our movie array
                    renderButtons();

                  });

                  // $(document).on("click", ".emotionBtn", logEmotionName);

             //      // Calling the renderButtons function to display the intial buttons
                  renderButtons();

// // ADD GIFS WHEN BUTTON IS CLICKED FROM GIPHY API
 
 $(document).on("click", ".emotionBtn", logAjaxUrl);

 function logAjaxUrl(){
//   // Constructing a queryURL using the emotionType
      var emotionType = $(this).attr("data-name");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        emotionType + "&api_key=dc6zaTOxFJmzC&limit=10";


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
            emotionImage.addClass("gifImg");

            // Appending the paragraph and image tag to the animalDiv
            emotionDiv.append(emotionImage);
            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $(".gifsGoHere").prepend(emotionDiv);
          }

      })

};

$(document).on("click", ".gifImg", animateGif);
// $("gifImg").on("click", animateGif);

function animateGif() {
   
      var state = $(this).attr("data-state");
           
      // console.log(state);

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", still);
      }
    };


