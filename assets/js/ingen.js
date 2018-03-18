$(document).ready(() => {
    var options = [
        {selector: '.ca1', offset: 50, callback: function(el) {
            $('.ca1').addClass("animated fadeInUp");
        } },
        {selector: '.ca2', offset: 50, callback: function(el) {
            $('.ca2').addClass("animated fadeInUp");
        } }
    ];
    Materialize.scrollFire(options);
});