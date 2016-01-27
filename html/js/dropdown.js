function Dropdown(objectId){
    this.MAX_HEIGHT = 400;
    this.dropdownWrapperClass = ".drowdownWrapper";
    this.buttonWrapperClass = ".dropdownButtonWrapper";
    this.listWrapperClass = ".dropdownListWrapper";
    
    this.selectorId = objectId;  
    this.id = objectId.substring(1, (objectId.length-1));
    
    this.label = "Select";
    this.rightButton = {};
    this.rightButton.width = 30;
    this.arrow = {};
    this.arrow.width = 11;
    this.arrow.height = 6;
    this.list = {};
    this.list.paddingTop = 5;
    this.list.paddingLeft = 10;
    this.selectedIndex = 0;
    this.onChange = function(event) {
      console.log('hi');  
    };
    this.selectedValue = null;
    
    this.data = [];
    
    var _this = this;
    
    $(_this.selectorId).append(
            '<div class="drowdownWrapper">'+
            '    <div class="dropdownButtonWrapper">'+
            '        <svg class="dropdownSvg">'+
            '        </svg>'+
            '        <span class="label"></span>'+
            '    </div>'+
            '    <ul class="dropdownListWrapper">'+
            '    </ul>'+
            '</div>');
            
    this.dropdownButtonSvg = Snap(this.selectorId+" .dropdownSvg");        
    
    Snap.load("svg/combo-button-button-bg.svg",snapLoadDropdownButton);

    $(_this.selectorId+" "+_this.dropdownWrapperClass).on('click', _this.dropdownButtonWrapper, function(event){ 
        if($(_this.selectorId+" "+_this.listWrapperClass).is(':visible')) {
            $(_this.selectorId+" "+_this.listWrapperClass).hide();
        }
        else {
            $(_this.selectorId+" "+_this.listWrapperClass).show();
        }
    });
    
    $(_this.selectorId+" "+_this.listWrapperClass).on('click', 'li', function(event){ 
        var target = $(event.target);
        var index = target.data("index");
        var value = target.data("value");
        var label = target.html();
        _this.selectedIndex = index;
        _this.selectedValue = value;
        $(_this.selectorId+" .label").html(label);
        $(_this.selectorId+" "+_this.listWrapperClass).hide();
        _this.onChange(event);
        event.stopPropagation();
    });
    
    $(document).bind('click', function(e) {
        if( $(e.target).closest(_this.selectorId+" "+_this.dropdownWrapperClass).length === 0) {
            if($(_this.selectorId+" "+_this.listWrapperClass).is(':visible')) {
                $(_this.selectorId+" "+_this.listWrapperClass).hide();
            }
        }
    });
    
    function snapLoadDropdownButton(f) {
        //Dropdown width & height, get and set from css
        var width = $(_this.selectorId+" "+_this.dropdownWrapperClass).width();
        var height = $(_this.selectorId+" "+_this.dropdownWrapperClass).height();
        
        //Get svg defs, like gradient & append it to svg wrapper
        var el = f.select("defs");
        _this.dropdownButtonSvg.append(el);
        
        //Set svg width and height
        $(_this.selectorId+" .dropdownSvg").width(width);
        $(_this.selectorId+" .dropdownSvg").height(height);
        
        //Get dropdown svg and put it to svg wrapper
        var dropdownButtonEl = f.select(".dropdownButton");
        dropdownButtonEl.attr({
            width: width,
            height: height, 
            class: 'dropdownButton'
        });
        _this.dropdownButtonSvg.append(dropdownButtonEl);
        
        //Set the label
        $(_this.selectorId+" .label").html(_this.label);
        $(_this.selectorId+" .label").width(width-(_this.rightButton.width));
        $(_this.selectorId+" .label").height(height);
        $(_this.selectorId+" .label").css("line-height",height+"px");
        
        //Get dropdown button right svg and put it to svg wrapper
        var rightButtonEl = f.select(".dropdownButtonRight");
        rightButtonEl.attr({
            x: width-_this.rightButton.width,
            height:height,
            class: 'dropdownButtonRight'
        });
        _this.dropdownButtonSvg.append(rightButtonEl);
        
        //Get dropdown arrow svg and put it to svg wrapper
        var arrowEl = f.select(".dropdownArrow");
        arrowEl.attr({
            width: _this.arrow.width,
            height: (height/2)-_this.arrow.height,
            x: width-_this.rightButton.width + _this.arrow.width,
            y: (height/2) - (_this.arrow.height/2),
            class: 'dropdownArrow'
        });
        _this.dropdownButtonSvg.append(arrowEl);
        
        //Set the list wrapper width
        $(_this.selectorId+" "+_this.listWrapperClass).width(width);
        
        //Set the list wrapper position relative
        var listTop = height;
        $(_this.selectorId+" "+_this.listWrapperClass).css('top',listTop+'px');

        //List height is height + 2 x padding top
        var listHeight = height - (2 * _this.list.paddingTop);
        //Create variable containing padding value string
        var listPaddingValue = _this.list.paddingTop+"px "+_this.list.paddingLeft+"px";
        
        //Generate Dropdown list
        generateDropdownList();
        
        //Set List Height
        setListHeight();
        
        //Setting the list item height, padding value, and line height
        $(_this.selectorId+" "+_this.listWrapperClass+" li").height(listHeight);
        $(_this.selectorId+" "+_this.listWrapperClass+" li").css('padding',listPaddingValue);
        $(_this.selectorId+" "+_this.listWrapperClass+" li").css('lineHeight',listHeight+'px');
    };
    
    function generateDropdownList() {
        //Generate the default item 
        $(_this.selectorId+" "+_this.listWrapperClass).html("");
        var defaultList = "<li data-index=\"-1\" data-value=\"null\">"+_this.label+"</li>"
        $(_this.selectorId+" "+_this.listWrapperClass).append(defaultList);
        
        //Generate the items from data
        for (var i = 0; i < _this.data.length; i++) {
            var obj = _this.data[i];
            var list = "<li data-index=\""+i+"\" data-value=\""+obj.value+"\">"+obj.label+"</li>";
            $(_this.selectorId+" "+_this.listWrapperClass).append(list);
        }
    };
    
    function setListHeight() {
        var height = $(_this.selectorId+" "+_this.dropdownWrapperClass).height();
        //listHeihgt = height + 1, caused is use 1px on border top
        var listHeight = height + 1;
        var dataLength = _this.data.length;
        var documentHeight = $(document).height();
        var elementTop = $(_this.selectorId+" "+_this.dropdownWrapperClass).position().top;
        
        //Total list height, height sum all data length 
        var totalListHeight = (dataLength + 1)* listHeight;
        ///Optimal height
        var optimalHeight = totalListHeight;
        //Height sum that window can containt
        var heightPlusTop = totalListHeight + elementTop + height;
        
        //If heightPlusTop is too long, so cut it
        if(heightPlusTop > documentHeight) {
            optimalHeight = documentHeight - (elementTop + 2 * listHeight);
        }
        
        optimalHeight = optimalHeight > _this.MAX_HEIGHT ? _this.MAX_HEIGHT : optimalHeight;
        $(_this.selectorId+" "+_this.listWrapperClass).height(optimalHeight);
    };
    
}



