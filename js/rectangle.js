/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var rectangle = {
   canvasContext:false,
   canvasEle : false,
   x_cor:false,
   y_cor:false,
   color:'black',
   rectangeleSelect:false,
   init:function(config){
      this.canvasEle     = config.canvas_ele;
      this.pencil_color  = config.pencil_color;
      this.pencil_size   = config.pencil_size;
      this.canvasContext = document.getElementById(this.canvasEle).getContext('2d');	
      this.canvasContext.fillStyle = this.getColor();
      this.canvasContext.beginPath();
      $('#'+this.canvasEle).bind('mousedown',this.mouseDown.bind(this));
   },
   mouseDown:function(e){
      this.rectangeleSelect =true;
      this.x_cor= e.pageX-$('#'+this.canvasEle).offset().left;
      this.y_cor= e.pageY-$('#'+this.canvasEle).offset().top;
      this.canvasContext.beginPath();
      this.canvasContext.moveTo(this.x_cor,this.y_cor);
      $('#'+this.canvasEle).bind('mousemove',this.mouseMove.bind(this)).bind('mouseout',this.removeContext.bind(this));
      //this.canvasContext.fill();
   },
   mouseMove:function(e){
      if(this.rectangeleSelect){
            this.canvasContext.lineTo(this.x_cor,this.y_cor);
            $('#'+this.canvasEle).bind('mouseup',this.mouseUp.bind(this));
      }
   },
   mouseUp:function(e){
      var width  = e.pageX-$('#'+this.canvasEle).offset().left-this.x_cor;
      var height = e.pageY-$('#'+this.canvasEle).offset().top-this.y_cor;
      this.canvasContext.lineWidth  = $('#'+this.pencil_size).val();
      this.canvasContext.fillStyle = this.getColor();
      this.canvasContext.strokeRect(this.x_cor,this.y_cor, width, height  );
       
       //this.canvasContext.closePath();
   },
    getColor:function(){
                //return '#FFF';
		return ($('#'+this.pencil_color).val()=='')?this.color:$('#'+this.pencil_color).val();
    },     
    removeContext:function(e){
      this.rectangeleSelect=false;
    }
}