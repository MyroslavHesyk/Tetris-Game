$(document).ready(function () {
    var infoDialog = $("#infoDialog");
    var infoToggle = $("#infoToggle");

    infoDialog.dialog({
        autoOpen: false,
        modal: true,
        width: 400,
        /* buttons: {
            Close: function () {
                $(this).dialog("close");
            }
        } */
    });

    infoToggle.click(function () {
        infoDialog.dialog("open");
    });


    var aboutDialog = $("#aboutDialog");
    var aboutToggle = $("#aboutToggle");

    aboutDialog.dialog({
        autoOpen: false,
        modal: true,
        width: 400,
        /* buttons: {
            Close: function () {
                $(this).dialog("close");
            }
        } */
    });

    aboutToggle.click(function () {
        aboutDialog.dialog("open");
    });
});