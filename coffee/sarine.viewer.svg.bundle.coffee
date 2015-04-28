###!
sarine.viewer.svg - v0.1.0 -  Tuesday, April 28th, 2015, 3:49:38 PM 
 The source code, name, and look and feel of the software are Copyright © 2015 Sarine Technologies Ltd. All Rights Reserved. You may not duplicate, copy, reuse, sell or otherwise exploit any portion of the code, content or visual design elements without express written permission from Sarine Technologies Ltd. The terms and conditions of the sarine.com website (http://sarine.com/terms-and-conditions/) apply to the access and use of this software.
###

class Viewer
  rm = ResourceManager.getInstance();
  constructor: (options) ->
    console.log("")
    @first_init_defer = $.Deferred()
    @full_init_defer = $.Deferred()
    {@src, @element,@autoPlay,@callbackPic} = options
    @id = @element[0].id;
    @element = @convertElement()
    Object.getOwnPropertyNames(Viewer.prototype).forEach((k)-> 
      if @[k].name == "Error" 
          console.error @id, k, "Must be implement" , @
    ,
      @)
    @element.data "class", @
    @element.on "play", (e)-> $(e.target).data("class").play.apply($(e.target).data("class"),[true])
    @element.on "stop", (e)-> $(e.target).data("class").stop.apply($(e.target).data("class"),[true])
    @element.on "cancel", (e)-> $(e.target).data("class").cancel().apply($(e.target).data("class"),[true])
  error = () ->
    console.error(@id,"must be implement" )
  first_init: Error
  full_init: Error
  play: Error
  stop: Error
  convertElement : Error
  cancel : ()-> rm.cancel(@)
  loadImage : (src)-> rm.loadImage.apply(@,[src])
  setTimeout : (delay,callback)-> rm.setTimeout.apply(@,[@delay,callback]) 
    
@Viewer = Viewer 

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
				_t.element.find("#SVG_total_depth_per").text(_t.data["Total Depth"]["mm"] + "mm")
				_t.element.find("#SVG_total_depth_mm").text(_t.data["Total Depth"]["percentages"] + "%")
				defer.resolve(_t)
		defer
	full_init : ()-> 
		defer = $.Deferred()
		defer.resolve(@)		
		defer
	play : () -> return		
	stop : () -> return

@SarineSvg = SarineSvg
		


