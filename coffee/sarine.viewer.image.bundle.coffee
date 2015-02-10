class Viewer
	rm = ResourceManager.getInstance();
	constructor: (options) ->
		@first_init_defer = $.Deferred()
		@full_init_defer = $.Deferred()
		{@src, @element,@autoPlay} = options
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
	setTimeout : (fun,delay)-> rm.setTimeout.apply(@,[@delay])
    

		  
console.log ""
@Viewer = Viewer





class Viewer.Image extends Viewer
	
	constructor: (options) ->
		{@imagesArr} = options		
		super(options)				

	convertElement : () ->				
		@element		

	first_init : ()->
		defer = $.Deferred()
		defer.notify(@id + " : start load first image")						
		
		_t = @			
		for name, index in @imagesArr
			@loadImage(_t.src  + name).then((img)->
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
		


