$('document').ready(function () {
    //array with topics
    var topics = [
        "Ronaldinho",
        "Zidan",
        "Messi",
        "Maradona",
        "Pele"
    ]

    //function loop to display all topics in buttons
    function displayTopics() {
        for (var i = 0; i < topics.length; i++) {
            $('#buttons').append('<div class="btn btn-info get-giphy" data-attribute=' + topics[i] +
                '>' + topics[i] +
                '</div>');
        }
    }

    //call function to display all the topic buttons
    displayTopics();

    //on clicking button
    $('#buttons').on('click', '.get-giphy', function () {

        $('#gifs-appear-here').empty();
        //set topic to the clicked button's data-attribute
        var topic = $(this).attr('data-attribute');

        //set query URL to picked topic
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic +
            "&api_key=O2X0wRMnWEjylyUypx1F5UVxCz5Jp8kr&limit=10";

        //ajax call to Giphy API
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {
            console.log(response);
            // Storing an array of results in the results variable
            var results = response.data;

            // Looping over every result item
            for (var i = 0; i < results.length; i++) {

                // Only taking action if the photo has an appropriate rating
                if (results[i].rating !== "r") {
                    // Creating a div with the class "item"
                    var gifDiv = $("<div class='item'>");

                    // Storing the result item's rating
                    var rating = results[i].rating;

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + rating);

                    // Creating an image tag
                    var topicImage = $("<img>");

                    // Giving the image tag necessary attributes
                    topicImage.attr({
                        "class": "topicImage",
                        "src": results[i].images.fixed_height_still.url,
                        "data-state": "still",
                        "data-still": results[i].images.fixed_height_still.url,
                        "data-animate": results[i].images.fixed_height.url
                    });

                    // Appending the paragraph and personImage we created to the "gifDiv" div we created
                    gifDiv.append(topicImage);
                    gifDiv.append(p);

                    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                    $("#gifs-appear-here").prepend(gifDiv);
                }
            }
        });
        $('#gifs-appear-here').on('click', '.topicImage', function () {
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
                console.log('its still');
            } else if (state === "animate") {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
                console.log('its animated');
            }
            else {
                return false;
            }
        });

    });

    $('button[type="submit"]').click(function () {
        var inputValue = $('.form-control').val().trim();
        if (topics.includes(inputValue)) {
            $('.modal').modal('show');
            $('.modal-body').html('You already have a button for <b>' + inputValue +
                '</b>. Use it or add something else');
            setTimeout(function () {
                $('.modal').modal('hide');
            }, 4000);
        } else {
            topics.push(inputValue);
            $('#buttons').empty();
            displayTopics();
        }
    });

    //get form input on pressing "enter key"
    $('.form-control').keypress(function (e) {
        if (e.which == 13) { //Enter key pressed
            $('button[type="submit"]').click(); //Trigger search button click event
        }
    });
});