$( document ).ready(function() {
    console.log( "ready!" );
    
    /*
    var dropdownButton = Snap(".dropdownButton"); 

    Snap.load("svg/combo-button-base-bg.svg", function (f) {

        var width = $(".dropdownButton").width();
        var height = $(".dropdownButton").height();
        var el = f.select("rect");
        el.attr({
            width: width,
            height: height,
            class: 'dropdownBase'
        });
        dropdownButton.append(el);

    });

    
    $(".dropdownButton").on('click', '.dropdownBase', function(){ 
        console.log('hello'); 
    });
    */
    var cityDropdown = new Dropdown("#cityDropdown");   
    cityDropdown.onChange = function(event) {
        var target = $(event.target);
        
        console.log(cityDropdown.selectedValue);
    };

});
