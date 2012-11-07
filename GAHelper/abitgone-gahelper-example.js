$(function() {
    
    $("#SetGAAccountID").click(function() {

        var GAAccountID = $("#GAAccountID").val();
        console.log("Attempting to change Google Analytics Account ID with _gaq.push(['_setAccount', '" + GAAccountID + "']);");
        _gaq.push(['_setAccount', GAAccountID]);

    })

})