###!
sarine.viewer.svg - v1.3.0 -  Thursday, July 23rd, 2015, 3:48:48 PM 
 The source code, name, and look and feel of the software are Copyright © 2015 Sarine Technologies Ltd. All Rights Reserved. You may not duplicate, copy, reuse, sell or otherwise exploit any portion of the code, content or visual design elements without express written permission from Sarine Technologies Ltd. The terms and conditions of the sarine.com website (http://sarine.com/terms-and-conditions/) apply to the access and use of this software.
###
class SarineSvg extends Viewer
	
	constructor: (options) -> 			
		super(options)		
		{@imagesArr,@jsonFileName,@svg} = options	   		
		@version = $(@element).data("version") || "v1"
		@viewersBaseUrl = options.baseUrl
		@stopneProperties = options.stoneProperties

	convertElement : () ->				
		@element		

	first_init : ()->
		_t = @
		defer = $.Deferred() 
		$.getJSON @src + @jsonFileName , (data) ->
			if("Round" != _t.stopneProperties.shape)  
				arr = _t.svg.split('.') 
				arr.splice(1,0,_t.stopneProperties.shape.replace('Modified','')) 
				_t.svg = arr.join('.')
			SVG_width_mm = if _t.stopneProperties.shape == 'Round' then 'Diameter' else 'Width'
			_t.data = data
			$(_t.element).load _t.viewersBaseUrl + "atomic/" + _t.version  + "/assets/" + _t.svg , (data)-> 
				_t.element.find("#SVG_width_mm").text(parseFloat(_t.data[SVG_width_mm].mm ).toFixed(2)+ "mm") 
				_t.element.find("#SVG_table_pre").text(parseFloat(_t.data["Table Size"].percentages) + "%")
				_t.element.find("#SVG_crown_pre").text(parseFloat(_t.data["Crown"]["height-percentages"]).toFixed(1) + "%")
				_t.element.find("#SVG_crown_mm").text(parseFloat(_t.data["Crown"]["height-mm"] ).toFixed(2)+ "mm")
				_t.element.find("#SVG_pavillion_pre").text(parseFloat(_t.data["Pavilion"]["height-percentages"]).toFixed(1) + "%")
				_t.element.find("#SVG_pavillion_mm").text(parseFloat(_t.data["Pavilion"]["height-mm"] ).toFixed(2)+ "mm") 
				_t.element.find("#SVG_girdle_pre").text(parseFloat(_t.data["Girdle"]["Thickness-percentages"]).toFixed(1) + "%")
				_t.element.find("#SVG_girdle_mm").text(parseFloat(_t.data["Girdle"]["Thickness-mm"] ).toFixed(2)+ "mm")
				_t.element.find("#SVG_culet_mm").text(parseFloat(_t.data["Culet Size"].percentages) + "%" )
				_t.element.find("#SVG_crown_rounded").text(parseFloat(_t.data["Crown"]["angel-deg"]).toFixed(1) + "°")
				_t.element.find("#SVG_pavillion_rounded").text(parseFloat(_t.data["Pavilion"]["angel-deg"]).toFixed(1) + "°")
				_t.element.find("#SVG_total_depth_per").text(parseFloat(_t.data["Total Depth"]["mm"] ).toFixed(2)+ "mm")
				_t.element.find("#SVG_total_depth_mm").text(parseFloat(_t.data["Total Depth"]["percentages"]) + "%")
				defer.resolve(_t)
		.fail ()->
			_t.loadImage(_t.callbackPic).then (img)->
				canvas = $("<canvas >")
				canvas.attr({"class": "no_stone" ,"width": img.width, "height": img.height}) 
				canvas[0].getContext("2d").drawImage(img, 0, 0, img.width, img.height)
				_t.element.append(canvas)
				defer.resolve(_t)
		defer
	full_init : ()-> 
		defer = $.Deferred()
		defer.resolve(@)		
		defer
	play : () -> return		
	stop : () -> return

@SarineSvg = SarineSvg
		
