$(document).ready(function () {
 
    /* For the sticky navigation */
    $('.js--section-features').waypoint(function (direction) {
        if (direction == "down") {
            $('nav').addClass('sticky');
        } else {
            $('nav').removeClass('sticky');
        }
    }, {
        offset: '60px'
    });
    
    /* Scroll on buttons */
    $('.js--scroll-to-plan').click(function () {
        $('html,body').animate({scrollTop: $('.js--section-plans').offset().top}, 1000);
    });
    
    $('.js--scroll-to-start').click(function () {
        $('html,body').animate({scrollTop: $('.js--section-features').offset().top}, 1000);
    });
    
    
    /* Navigation scroll */
    $(function () {
      $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
      });
    });
    
    /* Animations on scroll */
    /* section-works*/
    $('.js--wp-1').waypoint(function(direction) {
        $('.js--wp-1').addClass('animated fadeIn');
    }, {
        offset: '50%'
    });
    
        /* section-works*/
    $('.js--wp-2').waypoint(function(direction) {
        $('.js--wp-2').addClass('animated fadeInUp');
    }, {
        offset: '50%'
    });
    
        /* section-works*/
    $('.js--wp-3').waypoint(function(direction) {
        $('.js--wp-3').addClass('animated fadeIn');
    }, {
        offset: '50%'
    });
    
        /* section-works*/
    $('.js--wp-4').waypoint(function(direction) {
        $('.js--wp-4').addClass('animated pulse');
    }, {
        offset: '50%'
    });
    
    /* mobile-navigations */
    $('.js--nav-icon').click(function() {
        var nav = $('.js--main-nav');
        var icon = $('.js--nav-icon i');
        
        nav.slideToggle(200);
        if (icon.hasClass('ion-navicon-round')) {
            icon.addClass('ion-close-round');
            icon.removeClass('ion-navicon-round');
        } else {
            icon.removeClass('ion-close-round');
            icon.addClass('ion-navicon-round');
        }  
    });
    
    
    /* including a GMAPS */
    var map = new GMaps({
      div: '.map',
      lat: 31.330368,
      lng: -89.334601,
});
    
    map.addMarker({
  lat: 31.330368,
  lng: -89.334601,
  title: 'Hattiesburg',
infoWindow: {
  content: '<p>Our Headquarters</p>'
}
});

    function ConvertFormToJSON(form){
        var array = jQuery(form).serializeArray();
        var json = {};
        
        jQuery.each(array, function() {
            json[this.name] = this.value || '';
        });
        
        return json;
    }
    
    jQuery(document).on('ready', function() {
        jQuery('form#login_page').bind('submit', function(event){
            event.preventDefault();
            
            var form = this;
            var json = ConvertFormToJSON(form);
            var tbody = jQuery('#login_form > tbody');
            
            $.ajax({
                type: "POST",
                url: "",
                data: json,
                dataType: "json"
            }).done(function() {
                tbody.append(form['account'].value + form['password'].value);
            }).fail(function() {
                alert("Failed to add to-do");
            });
            
            return true;
        });
    });
    
    /*
    // programming the JSON capture for login
    // gratuitiously stolen from https://code.lengstorf.com/get-form-values-as-json/
    const handleFormSubmit = event => {
        event.preventDefault();
        
        const data = {};
        
        const dataContainer = document.getElementsByClassName('login_form')[0];
        
        dataContainer.textContent = JSON.stringify(data, null, "  ");
    }
    
    const form = document.getElementsByClassName('login_form')[0];
    form.addEventListener('submit', handleFormSubmit);
    
    const formToJSON = elements => [].reduce.call(elements, (data, element) => {
        data[element.name] = element.value;
        return data;
    }, {});
    
    const handleFormSubmit = event => {
        
        event.preventDefault();
        
        const data = formToJSON(form.elements);
        
        dataContainer.textContent = JSON.stringify(data, null, "  ");
    };
    
    const form = document.getElementsByClassName('login_form')[0];
    form.addEventListener('submit', handleFormSubmit);
    
    */
});