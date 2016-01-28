/*
 * Author : Fahrurrazi
 * Author Contact : evilkyro1965@yahoo.com
 * Version : 0.9
 */

function Dropdown(objectId){
    this.MAX_HEIGHT = 400;
    this.dropdownWrapperClass = ".drowdownWrapper";
    this.buttonWrapperClass = ".dropdownButtonWrapper";
    this.listWrapperClass = ".dropdownListWrapper";
    
    this.selectorId = objectId;  
    this.id = objectId.substring(1, (objectId.length-1));
    
    this.label = "Select";
    this.width = 0;
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
    this.isDisabled = false;
    this.disabledColor = "#ababab";
    this.arrowcolor = "#3b3b3b";
    
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
    this.labelColor = $(_this.selectorId+" .label").css('color');      
    this.dropdownButtonSvg = Snap(this.selectorId+" .dropdownSvg");        
    $(_this.selectorId+" "+_this.listWrapperClass).perfectScrollbar();
    Snap.load("svg/combo-button-button-bg.svg",snapLoadDropdownButton);

    $(_this.selectorId+" "+_this.dropdownWrapperClass).on('click', _this.dropdownButtonWrapper, function(event){ 
        if($(_this.selectorId+" "+_this.listWrapperClass).is(':visible')) {
            $(_this.selectorId+" "+_this.listWrapperClass).hide();
        }
        else {
            if(_this.isDisabled != true) {
                $(_this.selectorId+" "+_this.listWrapperClass).show();
                setListHeight();
            }
        }
    });
    
    $(_this.selectorId+" "+_this.listWrapperClass).on('click', 'li', function(event){ 
        var target = $(event.target);
        var index = target.data("index");
        var value = target.data("value");
        var label = target.html();
        _this.selectedIndex = index;
        _this.selectedValue = value;
        $(_this.selectorId+" li").removeClass('active');
        target.addClass('active');
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
        _this.width = $(_this.selectorId+" "+_this.dropdownWrapperClass).width();
        var width = _this.width;
        var height = $(_this.selectorId+" "+_this.dropdownWrapperClass).height();
        console.log(width);
        
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

        //List height is height + 2 x padding top
        var listHeight = height - (2 * _this.list.paddingTop);
        //Create variable containing padding value string
        var listPaddingValue = _this.list.paddingTop+"px "+_this.list.paddingLeft+"px";
        
        //Generate Dropdown list
        generateDropdownList();
        
        //Setting the list item height, padding value, and line height
        $(_this.selectorId+" "+_this.listWrapperClass+" li").height(listHeight);
        $(_this.selectorId+" "+_this.listWrapperClass+" li").css('padding',listPaddingValue);
        $(_this.selectorId+" "+_this.listWrapperClass+" li").css('lineHeight',listHeight+'px');
    };
    
    function generateDropdownList() {
        //Generate the default item 
        $(_this.selectorId+" "+_this.listWrapperClass).html("");
        var defaultList = "<li class=\"active\" data-index=\"-1\" data-value=\"null\">"+_this.label+"</li>"
        $(_this.selectorId+" "+_this.listWrapperClass).append(defaultList);
        
        //Generate the items from data
        for (var i = 0; i < _this.data.length; i++) {
            var obj = _this.data[i];
            var list = "<li data-index=\""+i+"\" data-value=\""+obj.value+"\">"+obj.label+"</li>";
            $(_this.selectorId+" "+_this.listWrapperClass).append(list);
        }
    };
    
    function setListHeight() {
        var dataLength = _this.data.length;
        var width = _this.width;
        var height = $(_this.selectorId+" "+_this.dropdownWrapperClass).height();
        var windowHeight = $(window).height();
        var dropdownPositionTop = $(_this.selectorId+" "+_this.dropdownWrapperClass).offset().top;
        var topSpace = dropdownPositionTop;
        var bottomSpace = windowHeight - (dropdownPositionTop + height);
        
        var isExpandBottom = topSpace > bottomSpace ? false : true;
        
        var listTop = height;
        
        var totalNeededHeight = (dataLength + 1) * (height+1);
        
        var optimalHeight = null;
        
        if(isExpandBottom) {
            //Set the list wrapper position relative
            $(_this.selectorId+" "+_this.listWrapperClass).css('top',listTop+'px');
            optimalHeight = (80/100) * bottomSpace; 
            optimalHeight = optimalHeight > totalNeededHeight ? totalNeededHeight : optimalHeight;
            $(_this.selectorId+" "+_this.listWrapperClass).height(optimalHeight);
        }
        else {
            //Set the list wrapper position relative
            optimalHeight = (80/100) * topSpace; 
            optimalHeight = optimalHeight > totalNeededHeight ? totalNeededHeight : optimalHeight;
            var listWrapperTop = optimalHeight;
            $(_this.selectorId+" "+_this.listWrapperClass).css('top',"-"+listWrapperTop+'px');
        }
        
        $(_this.selectorId+" "+_this.listWrapperClass).width(width).height(optimalHeight);
        $(_this.selectorId+" "+_this.listWrapperClass).perfectScrollbar('update');
        
        $(_this.selectorId+" "+_this.listWrapperClass).scrollTop( (_this.selectedIndex-1) * (height + 1) );
        
    };
    
    this.setValue = function(newValue) {
        if(newValue==null || newValue=="") {
            var selectedIndex = 1;
            var target = $(_this.selectorId+" "+_this.listWrapperClass+" li:nth-child("+selectedIndex+")");
            var index = target.data("index");
            var value = target.data("value");
            var label = target.html();
            _this.selectedIndex = index;
            _this.selectedValue = value;
            $(_this.selectorId+" li").removeClass('active');
            target.addClass('active');
            $(_this.selectorId+" .label").html(label);
            $(_this.selectorId+" "+_this.listWrapperClass).hide();
        }   
        else { 
            for (var i = 0; i < _this.data.length; i++) {
                var obj = _this.data[i];
                if(obj.value==newValue) {
                    var selectedIndex = i + 2;
                    var target = $(_this.selectorId+" "+_this.listWrapperClass+" li:nth-child("+selectedIndex+")");
                    var index = target.data("index");
                    var value = target.data("value");
                    var label = target.html();
                    _this.selectedIndex = index;
                    _this.selectedValue = value;
                    $(_this.selectorId+" li").removeClass('active');
                    target.addClass('active');
                    $(_this.selectorId+" .label").html(_this.label);
                    $(_this.selectorId+" "+_this.listWrapperClass).hide();
                    break;
                }
            }
        }
    };
    
    this.disable = function() {
        _this.dropdownButtonSvg.select(".dropdownArrow path").attr({
            fill:_this.disabledColor
        }); 
        $(_this.selectorId+" .label").css('color',_this.disabledColor);
        _this.isDisabled = true;
    };
    
    this.enable = function() {
        _this.dropdownButtonSvg.select(".dropdownArrow path").attr({
            fill:_this.arrowcolor
        }); 
        $(_this.selectorId+" .label").css('color',_this.labelColor);
        _this.isDisabled = false;
    };
    
}



