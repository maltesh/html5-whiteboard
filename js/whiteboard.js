var whiteboard = {
	canvasContext:false,
	canvasElement:false,
	init:function(canvas_config){
		if($('#'+canvas_config.canvas_ele).length === 0){
			alert('Canvas element not defined');
                        return;
		}
	        this.canvasElement = '#'+canvas_config.canvas_ele;	
		this.canvasContext = document.getElementById(canvas_config.canvas_ele).getContext('2d');
		wb_event.init(
			canvas_config
		);
	}
}
