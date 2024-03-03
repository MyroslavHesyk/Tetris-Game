$(document).ready(function () {
    var infoDialog = $("#infoDialog");
    var infoToggle = $("#infoToggle");

    infoDialog.dialog({
        autoOpen: false,
        modal: true,
        width: 400,
        show: {
            effect: "fade", 
            duration: 500 
        },
        hide: {
            effect: "fade", 
            duration: 500 
        },
        
    });

    infoToggle.click(function () {
        infoDialog.dialog("open");
        //tooglePauseGame()   //чомусь не працює коректно
    });


    var aboutDialog = $("#aboutDialog");
    var aboutToggle = $("#aboutToggle");

    aboutDialog.dialog({
        autoOpen: false,
        modal: true,
        width: 400,
        show: {
            effect: "fade", 
            duration: 500 
        },
        hide: {
            effect: "fade", 
            duration: 500 
        },
    });

    aboutToggle.click(function () {
        aboutDialog.dialog("open");
        //tooglePauseGame()
    });


    $("#closeDialogButton").on("click", function () {
        closeAboutDialog();
       
    });
    
    // функція  закриття діалогового вікна
    function closeAboutDialog() {
        //tooglePauseGame() // Продовжити гру
        aboutDialog.dialog("close");
    }
});