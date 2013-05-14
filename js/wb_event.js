var wb_event = {
	init:function (config){
            $('#'+config.pencil_ele).mousedown(
              function (){
                 $('#'+config.canvas_ele).unbind();
                 pencil.init(config);
            });
            $('#'+config.eraser).mousedown(
              function (){
                  $('#'+config.canvas_ele).unbind();
                  eraser.init(config);
            });
            $('#'+config.rectangle).mousedown(
              function()   {
                  $('#'+config.canvas_ele).unbind();
                  rectangle.init(config);
            });
            $('#'+config.oval).mousedown(
              function()   {
                  $('#'+config.canvas_ele).unbind();
                  oval.init(config);
            });
            $('#'+config.line).mousedown(
              function(){
                  $('#'+config.canvas_ele).unbind();
                  line.init(config);
            });
            
	}
}


