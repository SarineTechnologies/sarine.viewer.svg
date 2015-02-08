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
		
