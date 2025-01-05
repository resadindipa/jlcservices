// var owl2 = $('#owl-carousel-2');
// var owl = $('#owl-carousel-1');

// let hasAllShown = false;

// let autoWidthValue = true;
// if (parseInt($(window).width()) < 768) {
//     autoWidthValue = false;
// }
// console.log(parseInt($(window).width()).toString() + "--" + autoWidthValue);

// owl2.owlCarousel({
//     margin: 18,
//     loop: false,
//     autoWidth: autoWidthValue,
//     responsiveClass: true,
//     responsive: {
//         0: {
//             items: 1,
//             nav: false
//         },

//         650: {
//             items: 2,
//             nav: false
//         },
//         1000: {
//             items: 4,
//             nav: true,
//             loop: false
//         }
//     }
// })

// owl.owlCarousel({
//     margin: 18,
//     loop: false,
//     autoWidth: autoWidthValue,
//     responsiveClass: true,
//     responsive: {
//         0: {
//             items: 1,
//             nav: false
//         },
//         650: {
//             items: 2,
//             nav: false
//         },
//         1000: {
//             items: 4,
//             nav: false,
//             loop: false
//         }
//     }
// })

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
    let screenWidth = screen.width;

    // Scroll to the specific sections when clicked on a button or link(text)
    $(".action-btn").click(function() {
        $('#nav-bar-toggle-close').click();

        var targetId = $(this).attr('data-scroll');
        $('html, body').animate({
            scrollTop: $("#" + targetId).offset().top
        }, 1200);
    });


    // Attach click event to all parent-div elements
    $('.parent-div').click(function() {
        // Get the data-target attribute value (child div ID)
        var targetId = $(this).attr('data-target');
        var clicked = $(this).attr('data-clicked').toString();

        if (clicked == "false") {
            $(this).attr('class', "faq-item parent-div faq-item-expanded")
            $(this).attr('data-clicked', "true");
            // $(this).find('img').css('transform', "rotateX(180deg)");
            $(this).find('img').attr('src', 'contents/images/arrowupwhite.svg')
            $('#' + targetId).show();
            $(this).find('.faq-item-arrow').css('background-color', '#6464642a')
            $(this).find('.faq-item-content').css('background-color', '#37322E')
            $(this).find('.faq-item-quest').css('color', 'white')
            $(this).find('.faq-item-content').css('border-bottom-left-radius', '0')
            $(this).find('.faq-item-content').css('border-bottom-right-radius', '0')
        } else {
            $(this).attr('class', "faq-item parent-div")
            $('#' + targetId).hide();
            $(this).find('img').attr('src', 'contents/images/arrow-down.png')
            $(this).find('img').css('transform', "rotateX(0deg)");
            $(this).attr('data-clicked', "false");
            $(this).find('.faq-item-arrow').css('background-color', 'transparent')
            $(this).find('.faq-item-content').css('background-color', '#F4F4F4')
            $(this).find('.faq-item-quest').css('color', '#404452')

            let borderRadius = '5px'
            if (screenWidth <= 768) {
                borderRadius = '0px'
            }
            $(this).find('.faq-item-content').css('border-bottom-left-radius', borderRadius)
            $(this).find('.faq-item-content').css('border-bottom-right-radius', borderRadius)
        }
    });


    // check_for_nav();
    $(window).on('scroll', function() {
        // check_for_nav();
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
        $('#indipa').css('display', "block");
        $('.nav-bar-toggled').css('top', '20%');
    });

    $('#nav-bar-toggle-close').click(function() {
        $('#indipa').css('display', "none");
        $('.nav-bar-toggled').css('top', '100%');
    });


    $('#indipa').click(function() {
        $('#indipa').css('display', "none");
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