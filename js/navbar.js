$(document).ready(function() {
    // Scroll to the specific sections when clicked on a button or link(text)
    $(".navbar-navigate-link").click(function() {
        $('#nav-bar-toggle-close').click();

        var targetId = $(this).attr('data-scroll');
        var targetPage = $(this).attr('data-page');
        var currentPage = window.location.pathname.split('/').pop();

        if (currentPage == "") {
            currentPage = "index.html"
        }

        // console.log(currentPage + "--" + targetPage);

        if (currentPage == targetPage && targetId != "") {
            $('html, body').animate({
                scrollTop: $("#" + targetId).offset().top
            }, 1200);
        } else {
            // e.preventDefault(); // Prevent default anchor behavior
            // console.log("Ext Link");

            // Redirect only if the target page is not the current page
            if (targetPage !== currentPage) {
                if (targetId != "") {
                    window.location.href = `${targetPage}?scroll=${encodeURIComponent(targetId)}`;
                } else {
                    window.location.href = `${targetPage}`;
                }
            } else {
                // console.log(targetId); // Log a message if trying to navigate to the same page
            }
        }
    });



    // $('.navbar-navigate-link').click(function(e) {
    //     e.preventDefault(); // Prevent default anchor behavior
    //     console.log("Clicked");

    //     const targetPage = $(this).data('page'); // Get the target page
    //     const currentPage = window.location.pathname.split('/').pop(); // Get the current page
    //     const message = $(this).data('scroll'); // Get the message

    //     // Redirect only if the target page is not the current page
    //     if (targetPage !== currentPage) {
    //         window.location.href = `${targetPage}?scroll=${encodeURIComponent(message)}`;
    //     } else {
    //         console.log(message); // Log a message if trying to navigate to the same page
    //     }
    // });

    // Retrieve and log the message passed in the URL, if any
    // const urlParams = new URLSearchParams(window.location.search);
    // const message = urlParams.get('scroll');
    // if (message) {
    //     console.log(message);
    //     $('html, body').animate({
    //         scrollTop: $("#" + message).offset().top
    //     }, 1200);
    // }
});