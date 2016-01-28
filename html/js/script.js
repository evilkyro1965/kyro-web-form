$( document ).ready(function() {
    console.log( "ready!" );

    var cityDropdown = new Dropdown("#cityDropdown");   
    cityDropdown.data = [{"value":"lorem1","label":"Lorem1"},
        {"value":"lorem2","label":"Lorem2"},
        {"value":"lorem3","label":"Lorem3"},
        {"value":"lorem4","label":"Lorem4"},
        {"value":"lorem5","label":"Lorem5"},
        {"value":"lorem6","label":"Lorem6"},
        {"value":"lorem7","label":"Lorem7"},
        {"value":"lorem8","label":"Lorem8"},
        {"value":"lorem9","label":"Lorem9"},
        {"value":"lorem10","label":"Lorem10"},
        {"value":"lorem11","label":"Lorem11"}
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
    
    $("#setValue").click(function() {
       var selectedValue = $("#selectedValue").val();
       cityDropdown.setValue(selectedValue);
    });
    
    $("#disable").click(function(){
       cityDropdown.disable(); 
    });
    $("#enable").click(function(){
       cityDropdown.enable(); 
    });
});
