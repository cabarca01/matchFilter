function getFilteredMatches() {
    let compatibilityScore = $("#comScore").slider('getValue').map(function(score){ return score/100; });
    let age = $("#age").slider('getValue');
    let height = $("#height").slider('getValue');

    let filter = {
        hasPhoto: $("#hasPhoto").is(":checked"),
        inContact: $("#inContact").is(":checked"),
        isFavourite: $("#isFavourite").is(":checked"),
        minCompatibilityScore: compatibilityScore[0] <= compatibilityScore[1] ? compatibilityScore[0] : compatibilityScore[1],
        maxCompatibilityScore: compatibilityScore[0] <= compatibilityScore[1] ? compatibilityScore[1] : compatibilityScore[0],
        minAge: age[0] <= age[1] ? age[0] : age[1],
        maxAge: age[0] <= age[1] ? age[1] : age[0],
        minHeight: height[0] <= height[1] ? height[0] : height[1],
        maxHeight: height[0] <= height[1] ? height[1] : height[0],
        distance: $("#distance").slider('getValue'),
        city: {
            latitude: parseFloat($("#loggedUserLatitude").val()),
            longitude: parseFloat($("#loggedUserLongitude").val())
        }
    };

    $.ajax({
        url: "filter",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify(filter),
        success: function(response) {
            let template = $("#match-list-template").html();
            // fix extra / error from raw helper
            template = template.replace(/\\/g,"");
            let responseObj = JSON.parse(response);
            let html = Mustache.render(template, responseObj);

            $('#matchResults').html(html);
        },
        error: function(err) {
            let template =$("errordiv").html();
            let html = Mustache.render(template);
            console.log(err);
            $('#matchResults').html(html);
        }
    });


}