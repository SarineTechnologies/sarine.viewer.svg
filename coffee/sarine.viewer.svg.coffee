
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
				shapeExist = if _t.shapesArray then _t.shapesArray.find((item)-> return	item.toLowerCase() == stoneShape.toLowerCase()) else null
				
				if(_t.svgCustomized && shapeExist && shapeExist.length>0)
					svgSrc = window.templateUrl+'/media/2DCut.'+shapeExist+".svg"
				else	
					svgSrc= _t.viewersBaseUrl + "atomic/" + _t.version  + "/assets/" + _t.svg + ver
				$(_t.element).load svgSrc, (data)-> 
				
					$( "text[id^='SVG_']" ).text ""	
					for key of _t.data 
						obj = _t.data[key]
						for prop of obj
							if(obj.hasOwnProperty(prop))
							    elem = _t.element.find("#SVG_"+key.replace(" ","_")+"_"+prop.replace(" ","_"))
								if elem.length>0
									trim = elem.data "trimming"
									round = elem.data "rounding"
									suffix = elem.data "suffix"
									value=obj[prop]
									if $.isNumeric(value)
										value = if trim then value.toString().substring(0,value.toString().indexOf(".")+1+trim)  else if round != undefined then parseFloat(value).toFixed(round) else parseFloat(value).toFixed(2)
									value = if suffix then value+suffix else value
									elem.text value						
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
		
