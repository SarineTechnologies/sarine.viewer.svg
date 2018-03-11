
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
		configArray = window.configuration.experiences.filter((i)-> return i.atom == 'cut2DView')
		cut2DView = null
		if (configArray.length > 0)
			cut2DView = configArray[0]
		if(cut2DView && cut2DView["customized"])
			_t.svgCustomized = true;
			_t.shapesArray = cut2DView["customized"].split(',');
		
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
				if(_t.svgCustomized && _t.shapesArray.find((item)-> return	item.toLowerCase() == stoneShape.toLowerCase()).length>0)
					svgSrc = window.templateUrl+'/media/2DCut.'+stoneShape+".svg"
				else	
					svgSrc= _t.viewersBaseUrl + "atomic/" + _t.version  + "/assets/" + _t.svg + ver
				$(_t.element).load svgSrc, (data)-> 
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
		
