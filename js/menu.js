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



/* function generateRandomColor() {
    var colors = ['#FEE904', '#027FFD', '#A900FD', '#00F0F0', '#F0A100', '#55FE01', '#FE0056'];
    var randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

document.addEventListener('DOMContentLoaded', function () {
    var loader = document.querySelector('.loader');
    setInterval(function () {
        var randomColor = generateRandomColor();
        loader.style.setProperty('--random-color', randomColor);
    }, 1000); // Змінюємо кожну секунду (можна налаштувати за необхідністю)
}); */