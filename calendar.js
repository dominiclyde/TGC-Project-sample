const min = '2021-12-11T00:00';
const max = '2022-06-11T00:00';

$('#demo-booking-single').mobiscroll().datepicker({
    display: 'inline',
    controls: ['calendar'],
    min: min,
    max: max,
    onPageLoading: function (event, inst) {
        getPrices(event.firstDay, function callback(bookings) {
            inst.setOptions({
                labels: bookings.labels,
                invalid: bookings.invalid
            });
        });
    }
});

function getPrices(d, callback) {
    var invalid = [],
        labels = [];

    mobiscroll.util.http.getJson(MS.trialUrl + 'getprices/?year=' + d.getFullYear() + '&month=' + d.getMonth(), function (bookings) {
        for (var i = 0; i < bookings.length; ++i) {
            var booking = bookings[i],
                d = new Date(booking.d);

            if (booking.price > 0) {
                labels.push({
                    start: d,
                    title: '$' + booking.price,
                    textColor: '#e1528f'
                });
            } else {
                invalid.push(d);
            }
        }
        callback({ labels: labels, invalid: invalid });
    }, 'jsonp');
}