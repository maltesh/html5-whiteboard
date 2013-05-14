var line = {
   canvasContext: false,
   canvasEle: false,
   x_cor: false,
   y_cor: false,
   color: 'black',
   lineSelect: false,
   init: function(config) {
      this.canvasEle     = config.canvas_ele;
      this.pencil_color  = config.pencil_color;
      this.pencil_size   = config.pencil_size;
      this.canvasContext = document.getElementById(this.canvasEle).getContext('2d');
      this.canvasContext.lineWidth  = $('#'+this.pencil_size).val();
      this.canvasContext.fillStyle=this.getColor();
      $('#' + this.canvasEle).bind('mousedown', this.mouseDown.bind(this));
   },
   mouseDown:function(e){
      this.lineSelect=true;
      this.canvasContext.beginPath();
      this.x_cor= e.pageX-$('#'+this.canvasEle).offset().left;
      this.y_cor= e.pageY-$('#'+this.canvasEle).offset().top;
      
      
      $('#'+this.canvasEle).bind('mousemove',this.mouseMove.bind(this));
   },
   mouseMove:function(e){
      if(this.lineSelect){
            this.canvasContext.beginPath();
            this.canvasContext.fillStyle = this.getColor();
            this.canvasContext.moveTo(this.x_cor,this.y_cor);
            var x = e.pageX-$('#'+this.canvasEle).offset().left;
            var y= e.pageY-$('#'+this.canvasEle).offset().top;
            this.canvasContext.lineTo(x,y);
            this.canvasContext.lineWidth  = $('#'+this.pencil_size).val();
            this.canvasContext.lineWidth  = $('#'+this.pencil_size).val();
     
            $('#'+this.canvasEle).bind('mouseup',this.mouseUp.bind(this)).bind('mouseout',this.removeContext.bind(this));;
      }
   },
   mouseUp:function(e){
      if(this.lineSelect){
          this.mouseMove(e);
          this.canvasContext.stroke();
          this.canvasContext.closePath();
          this.canvasContext.fillStyle = this.getColor();
          this.lineSelect=false;
      }
   },
   getColor:function(){
   	return ($('#'+this.pencil_color).val()=='')?this.color:$('#'+this.pencil_color).val();
   },
   removeContext:function(e){
      this.lineSelect=false;
   }
   
}