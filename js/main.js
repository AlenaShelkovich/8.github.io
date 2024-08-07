$(document).ready(function() {
  $(window).scroll(function() {
    if ($(this).scrollTop() >= 90) {
      $(".sticky-header").addClass("fix");
    } else {
      $(".sticky-header").removeClass("fix");
    }
  });
});


document.querySelector('.burger').addEventListener('click', function() {
  this.classList.toggle('active');
  document.querySelector('.head-menu').classList.toggle('open')
})



$('.thank__btn').on('click', function() {
  $('.thank').fadeOut();
})




/* Валидация */

$('[data-modal=submit]').on('click', function(e) {
        e.preventDefault();
        $(this).parent('form').submit();
    });
    $.validator.addMethod('regex', function(value, element, regexp) {
        let regExsp = new RegExp(regexp);
        return this.optional(element) || regExsp.test(value)
    }, 'Пожалуйста, проверьте поле для ввода');

    let forms = $('#request');

    function valideForms(forms) {
        $(forms).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                    regex: "[A-Za-z, А-Яа-яЁё]"
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите своё имя",
                    minlength: jQuery.validator.format("Введите {0} и более символов")
                },
                phone: "Пожалуйста, введите номер телефона"
            },
            submitHandler: function(form) {
                let $form = $(form);
                let $formId = $(form).attr('id');
                switch ($formId) {
                    case 'request':
                        $.ajax({
                                type: 'POST',
                                url: $form.attr('action'),
                                data: $form.serialize()
                            })
                            .done(function() {
                                console.log('Success');
                            })
                            .fail(function() {
                                console.log('Fail');
                            })
                            .always(function() {
                                setTimeout(function() {
                                    $form.trigger('reset');
                                    $('.callback').fadeOut();
                                }, 1200);
                                setTimeout(function() {
                                    $('.thank').fadeIn();
                                }, 1800);
                            });
                        break;
                }
                return false;
            }
        });
    };
    valideForms('#request');


$('.brands-wrapper').slick({
  slidesToShow: 6,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
});
