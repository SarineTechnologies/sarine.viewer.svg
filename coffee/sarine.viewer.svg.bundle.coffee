###!
sarine.viewer.svg - v1.9.0 -  Sunday, January 28th, 2018, 9:31:14 AM 
 The source code, name, and look and feel of the software are Copyright © 2015 Sarine Technologies Ltd. All Rights Reserved. You may not duplicate, copy, reuse, sell or otherwise exploit any portion of the code, content or visual design elements without express written permission from Sarine Technologies Ltd. The terms and conditions of the sarine.com website (http://sarine.com/terms-and-conditions/) apply to the access and use of this software.
###
###!
sarine.viewer - v0.3.4 -  Wednesday, November 8th, 2017, 3:00:02 PM 
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
  loadAssets : (resources, onScriptLoadEnd) ->
    # resources item should contain 2 properties: element (script/css) and src.
    if (resources isnt null and resources.length > 0)
      scripts = []
      for resource in resources
          ###element = document.createElement(resource.element)
          if(resource.element == 'script')
            $(document.body).append(element)
            # element.onload = element.onreadystatechange = ()-> triggerCallback(callback)
            element.src = @resourcesPrefix + resource.src + cacheVersion
            element.type= "text/javascript"###
          if(resource.element == 'script')
            scripts.push(resource.src + cacheVersion)
          else
            element = document.createElement(resource.element)
            element.href = resource.src + cacheVersion
            element.rel= "stylesheet"
            element.type= "text/css"
            $(document.head).prepend(element)
      
      scriptsLoaded = 0;
      scripts.forEach((script) ->
          $.getScript(script,  () ->
              if(++scriptsLoaded == scripts.length) 
                onScriptLoadEnd();
          )
        )

    return      
  setTimeout : (delay,callback)-> rm.setTimeout.apply(@,[@delay,callback]) 
    
@Viewer = Viewer 



class SarineSvg extends Viewer
	
	constructor: (options) -> 			
		super(options)		
		{@imagesArr,@jsonFileName,@svg} = options	   		
		@version = $(@element).data("version") || "v1"
		@viewersBaseUrl = options.baseUrl
		@stoneProperties = options.stoneProperties

	convertElement : () ->				
		@element		

	first_init : ()->
		_t = @   
		defer = $.Deferred()
		
		if !@src
			@.failed().then( () -> 
				defer.resolve(_t)			
			)		
		else	
			@fullSrc = if @src.indexOf('##FILE_NAME##') != -1 then @src.replace '##FILE_NAME##' , @jsonFileName else @src + @jsonFileName   			
			$.getJSON @fullSrc , (data) ->
				if("Round" != _t.stoneProperties.shape)  
					arr = _t.svg.split('.') 
					arr.splice(1,0,_t.stoneProperties.shape.replace('Modified','')) 
					_t.svg = arr.join('.')
				stoneShape = _t.stoneProperties.shape.replace('Modified','')
				SVG_width_mm = if stoneShape == 'Round' then 'Diameter' else 'Width'
				_t.data = data			
				ver = window.cacheVersion || '?1'
				$(_t.element).load _t.viewersBaseUrl + "atomic/" + _t.version  + "/assets/" + _t.svg + ver , (data)-> 
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
				_t.failed().then( () -> 
					defer.resolve(_t)			
				)
		defer
	full_init : ()-> 
		defer = $.Deferred()
		defer.resolve(@)		
		defer
	failed : () ->
		defer = $.Deferred()
		_t = @ 
		_t.loadImage(_t.callbackPic).then (img)->
			canvas = $("<canvas >")
			canvas.attr({"class": "no_stone" ,"width": img.width, "height": img.height}) 
			canvas[0].getContext("2d").drawImage(img, 0, 0, img.width, img.height)
			_t.element.append(canvas)
			defer.resolve(_t)	
		defer		
	play : () -> return		
	stop : () -> return

@SarineSvg = SarineSvg
		


