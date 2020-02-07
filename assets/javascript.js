$(function(){
    populateButtons(searchArray,"searchButton" ,"#buttons");
})

var searchArray = ["Eagle", "Bear", "Shark", "Tiger", "Whale", "Dragon"];

function populateButtons(searchArray,classAdd,areaAdd){
    $(areaAdd).empty();
    for(var i=0; i< searchArray.length; i++){
        var butt = $("<button>");
        butt.addClass(classAdd);
        butt.attr("data-type",searchArray[i]);
        butt.text(searchArray[i]);
        $(areaAdd).append(butt);
    }
}

$(document).on("click" , ".searchButton", function(){
    $("#searches").empty();
    var type = $(this).data("type");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +type+ "&api_key=2GUXHHteSovgTGQ0XIQgHgOJUUF63rxr";
    $.ajax({url:queryURL,method:"GET"})

    

        .done(function(response){

            for(var i=0; i<response.data.length; i++){
                var searchDiv = $("<div>");
                var rating = response.data[i].rating;
                var p = $("<p>").text("Rating: "+rating);
                var animated = response.data[i].images.fixed_height.url;
                var still = response.data[i].images.fixed_height_still.url;
                var image = $("<img>");
                image.attr("src", still);
                image.attr("data-still", still);
                image.attr("data-animated", animated);
                image.attr("data-status","still");
                image.addClass("gif");
                searchDiv.append(p);
                searchDiv.append(image);
                $("#searches").append(searchDiv);
                // console.log(response.data[i].images.fixed_height.url);
            }
        })
})

$(document).on("click", ".gif", function(){
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).data("animated"));
        $(this).attr("data-state", "animated");
      } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
      }

    })

$("#newsearch").on("click", function(){
    var newsearch = $("input").val();
    searchArray.push(newsearch)
    populateButtons(searchArray,"searchButton" ,"#buttons");
    return false;
})


