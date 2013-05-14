var eraser = {
   x_cor:false,
   y_cor:false,
   eraserSelect:false,
   init:function (config){
        this.canvasEle     = config.canvas_ele;
        this.pencil_size   = config.pencil_size;
        this.canvasContext = document.getElementById(this.canvasEle).getContext('2d');	
        this.canvasContext.beginPath();
        //$('#'+config.eraser).bind('mousedown',this.activateEraser.bind(this));
        $('#'+this.canvasEle).bind('mousedown',this.mouseDown.bind(this));
        //bind('mousemove',this.mouseMove.bind(this)).
   },
   activateEraser:function(e){
       $('#'+this.canvasEle).mousedown(this.mouseDown.bind(this));
       $('#'+this.canvasEle).mousemove(this.mouseMove.bind(this));
               //.bind('mouseout',this.mouseOut.bind(this)).bind('mouseup',this.mouseUp.bind(this));
         
        //this.canvasContext.beginPath();
//        x = e.clientX-$('#'+this.canvasEle).offset().left;
//        y = e.clientY-$('#'+this.canvasEle).offset().top;
//        this.canvasContext.globalCompositeOperation ='destination-out';
//        this.canvasContext.strokeStyle = 'rgba(0,0,0,1)';
//        this.canvasContext.moveTo(x,y);
//        this.canvasContext.stroke();
//        console.log(x+'sss'+y);
   },
   mouseDown:function(e){
      this.eraserSelect=true;
      this.x_cor=e.clientX-$('#'+this.canvasEle).offset().left;
      this.y_cor=e.clientY-$('#'+this.canvasEle).offset().top;
      this.canvasContext.beginPath();
      $('#'+this.canvasEle).bind('mousemove',this.mouseMove.bind(this)).bind('mouseup',this.removeContext.bind(this)).bind('mouseout',this.removeContext.bind(this));
//      this.canvasContext.moveTo(this.x_cor,this.y_cor);
      
      //this.canvasContext.globalCompositeOperation ='destination-out';   
     // this.canvasContext.strokeStyle = '#FFF';
      ////'rgba(0,0,0,1)';
      
   },
   mouseMove:function(e){
      if(this.eraserSelect){
         this.x_cor = e.clientX-$('#'+this.canvasEle).offset().left;
         this.y_cor = e.clientY-$('#'+this.canvasEle).offset().top;
         this.canvasContext.strokeStyle = '#FFF';
         this.canvasContext.lineTo(this.x_cor,this.y_cor);
         this.canvasContext.stroke();
      }
   //   this.canvasContext.closePath();
      
   },
   removeContext:function(e){
      this.eraserSelect=false;
   }
   
   
}