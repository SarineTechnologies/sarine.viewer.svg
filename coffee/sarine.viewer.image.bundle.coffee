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
		super(options)
		@debugBaseId = @id + "_" + @element.data("type")

	convertElement : () ->
		@img = $("<img>")				
		@element.append(@img)

	first_init : ()->
		defer = $.Deferred()
		defer.notify(@id + " : start load first image")						
		window.performance.measure(@debugBaseId + "_first_init")
		window.performance.mark(@debugBaseId + "_first_init_start")
		_t = @
		@loadImage(@src).then((img)->
			_t.img.attr {'src': img.src, 'width':img.width, 'height': img.height}				
			defer.resolve()	
			window.performance.mark(_t.debugBaseId + "_first_init_end")
			measure = window.performance.getEntriesByName(_t.debugBaseId + "_first_init")[0]	
			totalTime = measure.duration + measure.startTime
			performanceManager.WriteToLog(_t.debugBaseId + "_first_init", totalTime)							
		)
    	
		defer

	full_init : ()-> 
		performanceManager.WriteToLog(@debugBaseId + "_full_init", 0)	
		return			
	play : () -> return		
	stop : () -> return
		


