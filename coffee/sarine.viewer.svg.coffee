###!
sarine.viewer.svg - v0.0.0 -  Tuesday, April 28th, 2015, 2:19:01 PM 
 The source code, name, and look and feel of the software are Copyright © 2015 Sarine Technologies Ltd. All Rights Reserved. You may not duplicate, copy, reuse, sell or otherwise exploit any portion of the code, content or visual design elements without express written permission from Sarine Technologies Ltd. The terms and conditions of the sarine.com website (http://sarine.com/terms-and-conditions/) apply to the access and use of this software.
###
class SarineSvg extends Viewer
	
	constructor: (options) -> 			
		super(options)		
		{@imagesArr,@jsonFileName,@svg} = options	   		
		@version = $(@element).data("version") || "v1"
		@viewersBaseUrl = stones[0].viewersBaseUrl

	convertElement : () ->				
		@element		

	first_init : ()->
		_t = @
		defer = $.Deferred()
		$.getJSON @src + @jsonFileName , (data) ->
			_t.data = data
			$(_t.element).load _t.viewersBaseUrl + "atomic/" + _t.version  + "/assets/" + _t.svg , (data)->
				_t.element.find("#SVG_width_mm").text(_t.data.Width.mm + "mm") 
				_t.element.find("#SVG_table_pre").text(_t.data["Table Size"].percentages + "%")
				_t.element.find("#SVG_crown_pre").text(_t.data["Crown"]["height-percentages"] + "%")
				_t.element.find("#SVG_crown_mm").text(_t.data["Crown"]["height-mm"] + "mm")
				_t.element.find("#SVG_pavillion_pre").text(_t.data["Pavilion"]["height-percentages"] + "%")
				_t.element.find("#SVG_pavillion_mm").text(_t.data["Pavilion"]["height-mm"] + "mm")
				_t.element.find("#SVG_girdle_pre").text(_t.data["Girdle"]["Thickness-percentages"] + "%")
				_t.element.find("#SVG_girdle_mm").text(_t.data["Girdle"]["Thickness-mm"] + "mm")
				_t.element.find("#SVG_culet_mm").text(_t.data["Culet Size"].mm + "mm")
				_t.element.find("#SVG_crown_rounded").text(_t.data["Crown"]["angel-deg"] + "°")
				_t.element.find("#SVG_pavillion_rounded").text(_t.data["Pavilion"]["angel-deg"] + "°")
				defer.resolve(_t)
		defer
	full_init : ()-> 
		defer = $.Deferred()
		defer.resolve(@)		
		defer
	play : () -> return		
	stop : () -> return

@SarineSvg = SarineSvg
		
