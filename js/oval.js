var oval = {
   canvasContext: false,
   canvasEle: false,
   x_cor: false,
   y_cor: false,
   color: 'black',
   ovalSelect: false,
   init: function(config) {
      this.canvasEle     = config.canvas_ele;
      this.pencil_color  = config.pencil_color;
      this.pencil_size   = config.pencil_size;
      this.canvasContext = document.getElementById(this.canvasEle).getContext('2d');
      this.canvasContext.fillStyle=this.getColor();
      this.canvasContext.beginPath();
      $('#' + this.canvasEle).bind('mousedown', this.mouseDown.bind(this));
   },
   mouseDown:function(e){
      this.ovalSelect=true;
      this.x_cor= e.pageX-$('#'+this.canvasEle).offset().left;
      this.y_cor= e.pageY-$('#'+this.canvasEle).offset().top;
      this.canvasContext.beginPath();
      this.canvasContext.moveTo(this.x_cor,this.y_cor);
      $('#'+this.canvasEle).bind('mousemove',this.mouseMove.bind(this));
   },
   mouseMove:function(e){
      if(this.ovalSelect){
            this.canvasContext.lineTo(this.x_cor,this.y_cor);
            $('#'+this.canvasEle).bind('mouseup',this.mouseUp.bind(this)).bind('mouseout',this.removeContext.bind(this));;
      }
   },
   mouseUp:function(e){
      var w = e.pageX-$('#'+this.canvasEle).offset().left-this.x_cor;
      var h = e.pageY-$('#'+this.canvasEle).offset().top-this.y_cor;
      this.canvasContext.fillStyle = this.getColor();
      var kappa = .5522848,
      ox = (w / 2) * kappa, // control point offset horizontal
      oy = (h / 2) * kappa, // control point offset vertical
      xe = this.x_cor + w,           // x-end
      ye = this.y_cor + h,           // y-end
      xm = this.x_cor + w / 2,       // x-middle
      ym = this.y_cor + h / 2;       // y-middle
      var x = this.x_cor;
      var y =this.y_cor;
      this.canvasContext.lineWidth  = $('#'+this.pencil_size).val();
      this.canvasContext.beginPath();
      this.canvasContext.moveTo(x, ym);
      this.canvasContext.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
      this.canvasContext.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
      this.canvasContext.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
      this.canvasContext.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
      this.canvasContext.fillStyle = this.getColor();
      this.canvasContext.closePath();
      this.canvasContext.stroke();
   },
   getColor:function(){
   	return ($('#'+this.pencil_color).val()=='')?this.color:$('#'+this.pencil_color).val();
   },
   removeContext:function(e){
      this.ovalSelect=false;
   }
   
}