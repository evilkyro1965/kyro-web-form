function Dropdown(objectId){
    var MAX_HEIGHT = 400;
    
    this.selectorId = objectId;  
    this.id = objectId.substring(1, (objectId.length-1));
    this.dropdownButton = Snap(this.selectorId+" .dropdownSvg");
    this.label = "Select Select Select Select Select";
    this.rightButton = {};
    this.rightButton.width = 30;
    this.arrow = {};
    this.arrow.width = 11;
    this.arrow.height = 6;
    this.list = {};
    this.list.paddingTop = 5;
    this.list.paddingLeft = 10;
    
    this.data = [
        {"value":"test","label":"test"},
        {"value":"test","label":"test"},
        {"value":"test","label":"test"},
        {"value":"test","label":"test"},
        {"value":"test","label":"test"},
        {"value":"test","label":"test"},
        {"value":"test","label":"test"},
        {"value":"test","label":"test"},
        {"value":"test","label":"test"}
    ];
    
    var _this = this;
    
    Snap.load("svg/combo-button-button-bg.svg",snapLoadDropdownButton);

    $(_this.selectorId+" .drowdownWrapper").on('click', '.dropdownButtonWrapper', function(){ 
        if($(_this.selectorId+" .dropdownListWrapper").is(':visible')) {
            $(_this.selectorId+" .dropdownListWrapper").hide();
            console.log('Close');
        }
        else {
            $(_this.selectorId+" .dropdownListWrapper").show();
            console.log('Open');
        }
    });
    
    $(document).bind('click', function(e) {
        if( $(e.target).closest(_this.selectorId+" .drowdownWrapper").length === 0) {
            if($(_this.selectorId+" .dropdownListWrapper").is(':visible')) {
                $(_this.selectorId+" .dropdownListWrapper").hide();
                console.log('Close');
            }
        }
    });
    
    function snapLoadDropdownButton(f) {
        var width = $(_this.selectorId+" .drowdownWrapper").width();
        var height = $(_this.selectorId+" .drowdownWrapper").height();
        
        var el = f.select("defs");
        _this.dropdownButton.append(el);
        
        $(_this.selectorId+" .dropdownSvg").width(width);
        $(_this.selectorId+" .dropdownSvg").height(height);
        
        var dropdownButtonEl = f.select(".dropdownButton");
        dropdownButtonEl.attr({
            width: width,
            height: height, 
            class: 'dropdownButton'
        });
        _this.dropdownButton.append(dropdownButtonEl);
        
        $(_this.selectorId+" .label").html(_this.label);
        $(_this.selectorId+" .label").width(width-(_this.rightButton.width));
        $(_this.selectorId+" .label").height(height);
        $(_this.selectorId+" .label").css("line-height",height+"px");
        
        var rightButtonEl = f.select(".dropdownButtonRight");
        rightButtonEl.attr({
            x: width-_this.rightButton.width,
            height:height,
            class: 'dropdownButtonRight'
        });
        _this.dropdownButton.append(rightButtonEl);
        
        var arrowEl = f.select(".dropdownArrow");
        arrowEl.attr({
            width: _this.arrow.width,
            height: (height/2)-_this.arrow.height,
            x: width-_this.rightButton.width + _this.arrow.width,
            y: (height/2) - (_this.arrow.height/2),
            class: 'dropdownArrow'
        });
        _this.dropdownButton.append(arrowEl);
        
        $(_this.selectorId+" .dropdownListWrapper").width(width);
        
        var listTop = height;
        $(_this.selectorId+" .dropdownListWrapper").css('top',listTop+'px');

        var listHeight = height - (2 * _this.list.paddingTop);
        var listPaddingValue = _this.list.paddingTop+"px "+_this.list.paddingLeft+"px";
        generateDropdownList();
        setListHeight();
        $(_this.selectorId+" .dropdownListWrapper li").height(listHeight);
        $(_this.selectorId+" .dropdownListWrapper li").css('padding',listPaddingValue);
        $(_this.selectorId+" .dropdownListWrapper li").css('lineHeight',listHeight+'px');
    };
    
    function generateDropdownList() {
        $(_this.selectorId+" .dropdownListWrapper").html("");
        for (var i = 0; i < _this.data.length; i++) {
            var obj = _this.data[i];
            var list = "<li data-value=\""+obj.value+"\">"+obj.label+"</li>";
            $(_this.selectorId+" .dropdownListWrapper").append(list);
        }
    };
    
    function setListHeight() {
        var height = $(_this.selectorId+" .drowdownWrapper").height();
        var listHeight = height + 1;
        var dataLength = _this.data.length;
        var documentHeight = $(document).height();
        var elementTop = $(_this.selectorId+" .drowdownWrapper").position().top;
        
        var totalListHeight = dataLength * listHeight;
        var optimalHeight = totalListHeight;
        var heightPlusTop = totalListHeight + elementTop + height;
        console.log(totalListHeight);
        
        if(heightPlusTop > documentHeight) {
            optimalHeight = documentHeight - (elementTop + listHeight);
        }
        
        optimalHeight = optimalHeight > _this.MAX_HEIGHT ? _this.MAX_HEIGHT : optimalHeight;
        console.log(optimalHeight);
        $(_this.selectorId+" .dropdownListWrapper").height(optimalHeight);
    };
}



