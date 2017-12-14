var desserts = ["cake", "ice cream", "cookies", "cupcake", "candy", "fruit"];

createdessertButtons();


$('#adddessert').on('click', function() {
    var dessertEntered = $('#dessertInput').val().trim();
    desserts.push(dessertEntered);
    $('#dessertInput').val('');
    createdessertButtons();

    return false;
});


$(document.body).on('click', '.button-list', function() {
    var dessertClicked = $(this).data('dessert');
    var query = 'https://api.giphy.com/v1/gifs/search?q=' + dessertClicked + '&limit=10&api_key=dc6zaTOxFJmzC';

    $('#desserts').empty();


    $.ajax({
        url: query,
        method: 'GET'
    }).done(function(response) {
        var results = response.data;

        for (i = 0; i < results.length; i++) {
            var newGif = $('<div class="col-sm-4">');
            var rating = results[i].rating.toUpperCase();
            var p = $('<p>').html('Rating: ' + rating);
            p.addClass('text-center');
            var img = $('<img>');

            img.attr('src', results[i].images.fixed_height_small_still.url);
            img.attr('data-still', results[i].images.fixed_height_small_still.url);
            img.attr('data-animate', results[i].images.fixed_height_small.url);
            img.attr('data-clicked', 'still');
            img.addClass('gif-margin gif center-block panel');

            newGif.append(p);
            newGif.append(img);
            $('#desserts').append(newGif);
        }
    });
});

$(document.body).on('click', '.gif', function() {
    var click = $(this).attr('data-clicked');

    if (click === 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-clicked', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-clicked', 'still');
    }
});

function createdessertButtons() {
    $('#dessertButtons').empty();

    for (var i = 0; i < desserts.length; i++) {
        var button = $('<button>').addClass('btn btn-primary button-list');
        button.attr('data-dessert', desserts[i]).html(desserts[i]);
        $('#dessertButtons').append(button);
    }
}