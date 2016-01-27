$( document ).ready(function() {
    console.log( "ready!" );

    var cityDropdown = new Dropdown("#cityDropdown");   
    cityDropdown.onChange = function(event) {
        var target = $(event.target);
        
        console.log(cityDropdown.selectedValue);
    };

});
