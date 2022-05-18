$(function () {
    // Slider
    $('.reviews__items').slick({
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: false,
                    infinite: true,
                    dots: true
                }
            },
        ]
    });

    function declOfNum(number, titles) {
        cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }


    // Timer
    let date = $('.timer-date').text();

    $(".timer").countdown(date, function (event) {
        $('#days').text(event.strftime('%D'));
        $('#hours').text(event.strftime('%H'));
        $('#minutes').text(event.strftime('%M'));
        $('#seconds').text(event.strftime('%S'));

        $('#daysText').text(`${declOfNum(event.strftime('%D'), ['День', 'Дня', 'Дней'])}`);
        $('#hoursText').text(`${declOfNum(event.strftime('%H'), ['Час', 'Часа', 'Часов'])}`);
        $('#minutesText').text(`${declOfNum(event.strftime('%M'), ['Минута', 'Минуты', 'Минут'])}`);
        $('#secondsText').text(`${declOfNum(event.strftime('%S'), ['Секунда', 'Секунды', 'Секунд'])}`);
    });

    // Popups
    $('.popup-link').on('click', function (event) {
        event.preventDefault();

        let th = $(this);
        let popup = $(th.attr('href'));
        popup.addClass('open');

        let tarif = th.attr('data-tarif');

        if (tarif) {
            popup.find('.form__tarif').val(tarif);
        }

    });

    $('.popup-close').on('click', function (event) {
        let th = $(this);
        if (!event.target.closest('.popup__content') || th.hasClass('anyway-close')) {
            $('.popup').removeClass('open');
        }
    });

    // Places counter
    let places = $('.offer__places'),
        elems = [];

    places.each(function (index, elem) {
        elems.push($(elem));
    });

    function getRandomArbitrary() {
        return Math.floor(Math.random() * (43000 - 12000) + 12000);
    }

    function interval(delay) {
        setTimeout(function () {
            let ind = Math.round(Math.random());

            let places = elems[ind].find('.offer__places-new');
            let placesCount = places.text();

            if (placesCount > 0) {
                places.parent('.offer__places').addClass('active');

                places.text(--placesCount);

                setTimeout(function () {
                    places.parent('.offer__places').removeClass('active');
                }, 700)
            }

            if (elems[0].find('.offer__places-new').text() > 0 || elems[1].find('.offer__places-new').text() > 0) {
                delay = getRandomArbitrary();
                return interval(delay);
            }
        }, delay);
    }

    let delay = getRandomArbitrary();
    interval(delay);
});