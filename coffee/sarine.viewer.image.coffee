class SarineImage extends Viewer
	
	constructor: (options) ->			
		super(options)		
		{@imagesArr} = options			

	convertElement : () ->				
		@element		

	first_init : ()->
		defer = $.Deferred()
		defer.notify(@id + " : start load first image")						
		
		_t = @			
		for name, index in @imagesArr
			@loadImage(@src  + name).then((img)->
				canvas = $("<canvas>")
				ctx = canvas[0].getContext('2d')				
				canvas.attr({width : img.width, height : img.height})							
				ctx.drawImage(img, 0, 0, img.width, img.height)
				_t.element.append(canvas)
				defer.resolve(_t)												
			)
		defer

	full_init : ()-> return			
	play : () -> return		
	stop : () -> return

@SarineImage = SarineImage
		
