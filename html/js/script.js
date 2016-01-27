$( document ).ready(function() {
    console.log( "ready!" );

    var cityDropdown = new Dropdown("#cityDropdown");   
    cityDropdown.data = [{"value":"lorem","label":"Lorem"},
        {"value":"lorem","label":"Lorem"},
        {"value":"lorem","label":"Lorem"},
        {"value":"lorem","label":"Lorem"},
        {"value":"lorem","label":"Lorem"},
        {"value":"lorem","label":"Lorem"},
        {"value":"lorem","label":"Lorem"},
        {"value":"lorem","label":"Lorem"},
        {"value":"lorem","label":"Lorem"},
        {"value":"lorem","label":"Lorem"},
        {"value":"lorem","label":"Lorem"}
        ];
    cityDropdown.onChange = function(event) {
        var target = $(event.target);
        
        console.log(cityDropdown.selectedValue);
    };
    
    $("#setToTop").click(function() {
       $("#cityDropdown").css("margin-top","0px");
    });
    
    $("#setToBottom").click(function() {
       $("#cityDropdown").css("margin-top","300px");
    });
    
});
