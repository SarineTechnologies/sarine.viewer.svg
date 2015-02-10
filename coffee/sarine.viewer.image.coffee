class Viewer.Image extends Viewer
	
	constructor: (options) ->
		{@imagesArr} = options
		@canvasObj = {}
		super(options)				

	convertElement : () ->				
		@element		

	first_init : ()->
		defer = $.Deferred()
		defer.notify(@id + " : start load first image")						
		
		_t = @			
		for name, index in @imagesArr
			_t.loadImage(_t.src  + name).then((img)->
				canvas = $("<canvas>")
				ctx = canvas[0].getContext('2d')				
				canvas.attr({width : img.width, height : img.height})							
				ctx.drawImage(img, 0, 0, img.width, img.height)
				_t.element.append(canvas)
				defer.resolve()												
			)
		defer

	full_init : ()-> return			
	play : () -> return		
	stop : () -> return
		
