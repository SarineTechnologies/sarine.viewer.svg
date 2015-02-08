class Viewer.Image extends Viewer

	constructor: (options) ->
		super(options)
		@debugBaseId = @id + "_" + @element.data("type")

	convertElement : () ->
		@img = $("<img>")				
		@element.append(@img)

	first_init : ()->
		defer = $.Deferred()
		defer.notify(@id + " : start load first image")						
		
		_t = @
		@loadImage(@src).then((img)->
			_t.img.attr {'src': img.src, 'width':img.width, 'height': img.height}				
			defer.resolve()				
		)
    	
		defer

	full_init : ()->  return			
	play : () -> return		
	stop : () -> return
		
