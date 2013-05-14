var pencil ={
        canvasContext:false,
	canvasEle : false,
	color:'black',
	x_cor:false,
	y_cor:false,
        pencilSelect:false,
        init:function (config){
		this.canvasEle     = config.canvas_ele;
                this.pencil_color  = config.pencil_color;
                this.pencil_ele    = config.pencil_ele;
                this.pencil_size   = config.pencil_size;
		this.canvasContext = document.getElementById(this.canvasEle).getContext('2d');	
		this.color = ($('#'+this.pencil_color).val()=='')?this.color:$('#'+this.pencil_color).val();
		this.canvasContext.fillStyle = this.color;
		this.canvasContext.beginPath();
	  	$('#'+this.canvasEle).bind('mousedown',this.mouseDown.bind(this)).bind('mousemove',this.mouseMove.bind(this)).bind('mouseup',this.mouseUp.bind(this));
	},
        mouseUp:function(e){
            this.pencilSelect=false;
	},
	mouseDown:function(e){
                this.pencilSelect=true;
		this.x_cor=e.clientX-$('#'+this.canvasEle).offset().left;
		this.y_cor=e.clientY-$('#'+this.canvasEle).offset().top;
		this.canvasContext.beginPath();
		this.canvasContext.moveTo(this.x_cor,this.y_cor);
	},
	mouseMove:function(e){
		 e.preventDefault();
                 if(this.pencilSelect){
                     if (this.x_cor == null || this.y_cor == null) {
                             return;
                     }
                     x = e.clientX-$('#'+this.canvasEle).offset().left;
                     y = e.clientY-$('#'+this.canvasEle).offset().top;

                     this.x_cor = x;
                     this.y_cor = y;
                     this.setPencilConfig();
                     this.canvasContext.lineTo(this.x_cor,this.y_cor);
    //                 this.canvasContext.closePath();
                     this.canvasContext.stroke();
                 }
		//    this.canvasContext.moveTo(this.x_cor,this.y_cor);
	},
        getColor:function(){
		return ($('#'+this.pencil_color).val()=='')?this.color:$('#'+this.pencil_color).val();
	},
	setPencilConfig:function(){
		this.canvasContext.strokeStyle = this.getColor();
		this.canvasContext.lineWidth   = $('#'+this.pencil_size).val();
		this.canvasContext.lineCap     = 'round';
		$('#'+this.canvasEle).css('class','pencil')
	}
}