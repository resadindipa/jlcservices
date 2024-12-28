var owl2 = $('#owl-carousel-2');
var owl = $('#owl-carousel-1');

let hasAllShown = false;

let autoWidthValue = true;
if (parseInt($(window).width()) < 768) {
    autoWidthValue = false;
}
// console.log(parseInt($(window).width()).toString() + "--" + autoWidthValue);

owl2.owlCarousel({
    margin: 18,
    loop: false,
    autoWidth: autoWidthValue,
    responsiveClass: true,
    responsive: {
        0: {
            items: 1,
            nav: false
        },

        650: {
            items: 2,
            nav: false
        },
        1000: {
            items: 4,
            nav: true,
            loop: false
        }
    }
})

owl.owlCarousel({
    margin: 18,
    loop: false,
    autoWidth: autoWidthValue,
    responsiveClass: true,
    responsive: {
        0: {
            items: 1,
            nav: false
        },
        650: {
            items: 2,
            nav: false
        },
        1000: {
            items: 4,
            nav: false,
            loop: false
        }
    }
})

// $('#nextbtn').click(function() {
//     console.log("edsdsds")
//     owl.trigger('next.owl.carousel');
// })

// $('#prevbtn').click(function() {
//     owl.trigger('prev.owl.carousel');
// })


// changing the name of the title in main section periodically
// let names = ['New Customers', 'More Sales', 'Valuable Leads', 'Business Growth'];

// let i = 0;
// setInterval(function() {

//     if (i < names.length - 1) {
//         i++;
//     } else {
//         i = 0;
//     }

//     document.getElementById("main-section-change").innerHTML = names[i];

// }, 1500);
//second commit

$(document).ready(function() {

    // Scroll to the specific sections when clicked on a button or link(text)
    $(".action-btn").click(function() {
        $('#nav-bar-toggle-close').click();

        var targetId = $(this).attr('data-scroll');
        $('html, body').animate({
            scrollTop: $("#" + targetId).offset().top
        }, 1200);
    });

    // $('.section-step-item-img').hover(function() {
    //     $(this).find('.section-step-item-img-num-circle').css('background-color', 'black');
    //     $(this).find('.section-step-item-img-num-circle').css('color', 'white');
    //     // $(this).find('h3').css('color', 'black');
    // }, function() {
    //     // on mouseout, reset the background colour
    //     $(this).find('.section-step-item-img-num-circle').css('background-color', 'white');
    //     $(this).find('.section-step-item-img-num-circle').css('color', 'black');
    // });

    $('.section-step-item').click(function() {
        $(this).attr('class', "section-step-item")
    });


    // var scrollPosition = $(window).scrollTop();
    // var windowHeight = $(window).height();
    // var steps = $('.section-step-item');

    // steps.each(function(index) {
    //     var stepOffsetTop = $(this).offset().top;
    //     var stepOffsetBottom = stepOffsetTop + $(this).outerHeight();
    //     var offsetValue = 100;
    //     var calc = Math.abs((scrollPosition + windowHeight) - (stepOffsetTop));
    //     console.log(index, calc);
    // });


    var steps = $('.section-step-item');

    var currentStep = 0;

    function checkSteps() {
        var scrollPosition = $(window).scrollTop();
        var windowHeight = $(window).height();

        steps.each(function(index) {
            var stepOffsetTop = $(this).offset().top;
            var stepOffsetBottom = stepOffsetTop + $(this).outerHeight();
            var offsetValue = 200;


            if (scrollPosition + windowHeight > stepOffsetTop + offsetValue) { // Revealing steps when they enter viewport
                if (index > currentStep) {



                    if (index !== 0) {
                        // console.log("1111")
                        $(this).removeClass('section-step-item-hidden');
                        $(this).attr('data-has-shown', 'true');
                        currentStep = index;

                        //changing the color of the connecting line till this element
                        updateLinesColor();

                        $('.section-step-item-img-num-circle').css('background-color', 'white');
                        $('.section-step-item-img-num-circle').css('color', 'black');

                        $(this).find('.section-step-item-img-num-circle').css('background-color', 'black');
                        $(this).find('.section-step-item-img-num-circle').css('color', 'white');
                    }
                }
            } else if (scrollPosition + windowHeight <= stepOffsetTop + offsetValue) { // Hiding steps when they leave viewport
                if (index <= currentStep) {


                    if (index !== 0) {
                        // $(this).addClass('section-step-item-hidden');
                        currentStep = index - 1;

                        updateLinesColor();

                        var previousElement = $('.section-step-item').eq(currentStep);
                        $('.section-step-item-img-num-circle').css('background-color', 'white');
                        $('.section-step-item-img-num-circle').css('color', 'black');

                        previousElement.find('.section-step-item-img-num-circle').css('background-color', 'black');
                        previousElement.find('.section-step-item-img-num-circle').css('color', 'white');
                    }
                }
            }



            // Ensure only the current step and the next one are visible
            // if (scrollPosition < stepOffsetBottom - windowHeight / 2 && index > currentStep) {
            //     $(this).addClass('section-step-item-hidden');
            // }
        });
    }

    function updateLinesColor() {
        //changing the color of the connecting line till this element
        let allLines = $('.section-steps-line');

        allLines.each(function(i) {
            if (i !== 0) {
                $(this).css('background-color', '#ababab');
                $(this).css('width', '2px');
                if (i < currentStep) {
                    $(this).css('background-color', 'black');
                    $(this).css('width', '6px')
                }
            } else {
                $(this).css('background-color', 'black');
                $(this).css('width', '6px')
            }
        });
    }

    function adjustVerticalLines() {
        let allLines = $('.section-step-item[data-has-shown="false"]');
        hasAllShown = allLines.length === 0;

        if (!hasAllShown) {

            //height required other to add extra space (other than)
            let lineOffsetHeight = 30;
            $('.section-step-item').each(function(index) {

                let descHeight = $(this).find('.section-step-item-desc').outerHeight();
                let numberDiv = $(this).find('.section-step-item-img').outerHeight();

                if ($(this).attr('data-has-shown') !== "true") {
                    descHeight = 0;
                }
                let eachLineHeight = (Math.abs(descHeight - numberDiv) + lineOffsetHeight) / 2;
                let linesResponsible = $('.section-steps-line[data-step="' + index + '"]');


                linesResponsible.each(function(index1) {
                    if (index1 == 0) {
                        $(this).height(eachLineHeight * 2);
                    }
                });


            });
        }
    }


    // Adjust the height on window resize
    $(window).resize(function() {
        adjustVerticalLines();
    });

    $(window).on('scroll', function() {
        checkSteps();
        if (!hasAllShown) {
            adjustVerticalLines();
        }
    });

    checkSteps();
    adjustVerticalLines();

    // Attach click event to all parent-div elements
    // $('.parent-div').click(function() {
    //     // Get the data-target attribute value (child div ID)
    //     var targetId = $(this).attr('data-target');
    //     var clicked = $(this).attr('data-clicked').toString();

    //     if (clicked == "false") {
    //         $(this).attr('class', "faq-item parent-div faq-item-expanded")
    //         $(this).attr('data-clicked', "true");
    //         $(this).find('img').css('transform', "rotateX(180deg)");
    //         $('#' + targetId).show();
    //         // $(this).find('.faq-item-content').css('background-color', '#e1e1e1')
    //         // $(this).find('.faq-item-content').css('border-bottom-left-radius', '0')
    //         // $(this).find('.faq-item-content').css('border-bottom-right-radius', '0')
    //     } else {
    //         $(this).attr('class', "faq-item parent-div")
    //         $('#' + targetId).hide();
    //         $(this).find('img').css('transform', "rotateX(0deg)");
    //         $(this).attr('data-clicked', "false");
    //         // $(this).find('.faq-item-content').css('background-color', '#F4F4F4')
    //         // $(this).find('.faq-item-content').css('border-bottom-left-radius', '10px')
    //         // $(this).find('.faq-item-content').css('border-bottom-right-radius', '10px')
    //     }
    // });

    check_for_nav();
    $(window).on('scroll', function() {
        check_for_nav();
    });

    function check_for_nav() {
        var y_scroll_pos = window.pageYOffset;
        // console.log(y_scroll_pos)
        var scroll_pos_test = 250; // set to whatever you want it to be

        if (y_scroll_pos > scroll_pos_test) {
            //do stuff
            $('.nav-bar-1').attr('class', 'nav-bar nav-bar-1 nav-bar-white')
            $('#nav-bar-toggle').attr('src', 'contents/images/navbaricon.svg')
        } else {
            $('.nav-bar-1').attr('class', 'nav-bar nav-bar-1')
            $('#nav-bar-toggle').attr('src', 'contents/images/navbaricon.svg')
        }
    }


    $('#nav-bar-toggle').click(function() {
        $('.nav-bar-toggled').css('top', '0%');
    });

    $('#nav-bar-toggle-close').click(function() {
        $('.nav-bar-toggled').css('top', '100%');
    });



    $("#submit-form").click(function(e) {
        e.preventDefault();


        let name = $('#name').val()
        let email = $('#email').val()
        let message = $('#message').val()

        if (name == "" || email == "" || message == "") {
            $('#form-error').text('- Complete all the fields');
            $('#form-error').show();
            if (name == "") {
                $('#name').focus();
            } else if (email == "") {
                $('#email').focus();
            } else {
                $('#message').focus();
            }
        } else {
            if (IsEmail(email) == false) {
                $('#form-error').show();
                $('#form-error').text("- Enter an valid email");
            } else {
                $.post("form/submit.php", {
                        name: name,
                        email: email,
                        message: message
                    },
                    function(data, status) {
                        console.log("Data: " + data + "\nStatus: " + status);
                        if (data == "success") {
                            $('#form-error').hide();
                            $('.contact-text-form').hide();
                            $('#contact-section-success').show();
                        }
                    });
            }

        }

    });


    function IsEmail(email) {
        const regex =
            /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test(email)) {
            return false;
        } else {
            return true;
        }
    }
});