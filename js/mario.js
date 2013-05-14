//DrawingApp Demo Script by Maria Antonietta Perna 2011 
//http://www.mariaantoniettaperna.com/MyjQueryDemos/DrawingBoardDemo/PaintAppDemo.html

//Global vars
var canvas = null;
var context = null; //main canvas context
var mouseX = 0;
var mouseY = 0;
var startX = 0; //the moveTo method to draw lines: x coord of starting point
var startY = 0; //the moveTo method to draw lines: y coord of starting point
var offset = 0;
var isDrawToolSelected = false;
var isColorSelected = false;
var isEraserSelected = false;
var deselectMsg = '';
var lineWidth = 2;
var width = 0;
var height = 0;
var curColor = '';
var curDrawingTool = '';
var mouseDown = false;
var curFont = 'arial'; //variable to store font to draw text on canvas
var curFontSize = '20px';

//utility functions
function getContext(canvasId) {
  canvas = document.getElementById(canvasId);
  if (canvas.getContext) { context = canvas.getContext('2d'); }
  else { alert('update or change your browser to use the drawing board'); }
} //end of init function


function drawRect(mouseX, mouseY, width, height) {
  context.beginPath();
  context.rect(mouseX, mouseY, width, height);
  context.fillStyle = curColor;
  context.closePath();
  context.fill();
} //end of drawRect func

function drawLine(fromX, fromY, toX, toY) {
  context.lineWidth = lineWidth;
  context.strokeStyle = curColor;
  context.beginPath();
  context.moveTo(fromX, fromY); //moveTo starts the line (x,y coords of the initial point)
  context.lineTo(toX, toY); //lineTo ends the line (x,y coords of the final point)
  context.stroke();
} //end of drawLine func

function beginLine(fromX, fromY) //function to start drawing line for free-hand/pencil drawing
{
  context.lineWidth = lineWidth;
  context.strokeStyle = curColor;
  context.lineCap = 'round';
  context.beginPath();
  context.moveTo(fromX, fromY); //moveTo starts the line (x,y coords of the initial point)
}

function continueLine(toX, toY) //function to continue drawing line for free-hand/pencil drawing
{
  context.lineTo(toX, toY); //lineTo continues drawing the line (x,y coords of subsequent points)
  context.stroke();
}

function drawCircle(x, y, r) {
  context.beginPath();
  context.fillStyle = curColor;
  context.arc(x, y, r, 0, Math.PI * 2, true);
  context.closePath();
  context.fill();
} //end of draw circle func

function drawText(sampleText, x, y) {
  context.fillStyle = curColor;
  context.lineWidth = lineWidth;
  context.font = curFontSize + ' ' + curFont;
  context.fillText(sampleText, x, y);
} //end of drawText func

function clear() {
  context.clearRect(0, 0, 500, 500);

} //end of clear func


///////////////////////////////code running on page load////////////////////////////////////////////////
$(document).ready(function () {
  getContext('myCanvas');
  offset = $('#myCanvas').offset(); //get the offset 
  //when page loads, make sure everything is reset in the drop-down boxes 
  $('#selectDraw').val('0');
  $('#selectColor').val('0');
  //Make sure the instructions div is hidden on page load
  $('.Instructions').hide();
  $('.TextSettingsContainer').hide(); //make sure the font settings div is hidden on page load
  //make sure to deselect all radio buttons on page load
  $('.ToolsSettingsContainer [type=radio]').attr('checked', false);
  //hide the div containing the radio buttons list on page load
  $('.ToolsSettingsContainer').hide();
  //make sure text settings are unchecked when page loads
  $('#fontList [type=radio]').attr('checked', false);
  $('#fontSizeList [type=radio]').attr('checked', false);

  //When help link gets clicked, toggle the instructions div
  $('#helpLink').click(function (e) {
    $('.Instructions').slideToggle('slow');
    e.preventDefault();
  }); //end of click


  //selection of drawing tool
  $('#selectDraw').change(function () {
    curDrawingTool = $('#selectDraw option:selected').val();
    if (!curDrawingTool || curDrawingTool == '0') { isDrawToolSelected = false; return false; }
    else {
      if (curDrawingTool == 'Line' || curDrawingTool == 'Pencil') {
        $('.ToolsSettingsContainer').slideDown('slow'); //if the user selects a line or a pencil, offer the possibility
        //to choose a width, otherwise this defaults to 2
      } //end of inner if
      //if the user selects the text tool, slide down the text settings div	  
      else if (curDrawingTool == 'Text') {
        $('.TextSettingsContainer').slideDown('slow');
      } //end of else if
      isDrawToolSelected = true;
    } //end of else
  }); //end of change function for drawing tool selection

  //possible selection of line width from the radio button list
  $('.ToolsSettingsContainer input[type=radio]').click(function () {
    lineWidth = $(this).val();
  }); //end of select

  //Possible selection of font family for text tool
  $('#fontList input[type=radio]').click(function () {
    curFont = $(this).val();
  }); //end of click

  //Possible selection of font size for text tool
  $('#fontSizeList input[type=radio]').click(function () {
    curFontSize = $(this).val();
  }); //end of click

  //this closes the div containing the line width list if the user clicks it
  $('.ToolsSettingsContainer h2').click(function () {
    $(this).parent('div').slideUp('slow'); //hide the div
  }); //end of click

  //This closes the div containing the text settings: font family and size
  $('.TextSettingsContainer h2').click(function () {
    $(this).parent('div').slideUp('slow');
  }); //end of click

  //Selection of eraser
  $('#eraserLink').click(function (e) {
    $('#eraserLink img').removeClass('Unselected');
    $('#eraserLink img').addClass('Selected'); //add a border to the eraser to indicate that it has been selected
    curColor = '#FFF'; //set current color to white
    isEraserSelected = true;
    e.preventDefault();
  }); //end of click

  //click link to deselect eraser
  $('#deselectEraserLink').click(function (e) {
    e.preventDefault();
    isEraserSelected = false;
    $('#eraserLink img').removeClass('Selected');
    $('#eraserLink img').addClass('Unselected');
    curColor = $('#selectColor').val();
    curDrawingTool = $('#selectDraw').val();
  }); //end of click

  //selection of color: first make sure a color is selected
  $('#selectColor').change(function () {
    curColor = $('#selectColor option:selected').val();
    if (!curColor || curColor == '0') { isColorSelected = false; return false; }
    else {
      isColorSelected = true;
    } //end of else
  }); //end of change function for color selection

  $('#myCanvas').mousedown(function (e) {
    //mouseDown = true;  //make sure a drawing tool and a color, or the eraser, are selected
    mouseDown = true;
    if (isDrawToolSelected && isColorSelected || isEraserSelected) { //check that user has selected a drawing tool and a color
      startX = e.pageX - offset.left; //x coord as soon as the mouse is clicked inside the canvas
      startY = e.pageY - offset.top; //y coord as soon as the mouse is clicked inside the canvas
      if (curDrawingTool == 'Pencil' || isEraserSelected) //if the selected tool is the pencil/free-hand drawing tool ... 
      {
        beginLine(startX, startY); //start the line drawing
      } //end of if	
      //if the drawing tool is the text draw the text on canvas
      else if (curDrawingTool == 'Text') {
        var textToDraw = $('#txtArea').val();
        if (textToDraw) {
          drawText(textToDraw, startX, startY);
        } //end of inner if
        else {
          drawText('Type some text in the text area', startX, startY);
        } //end of inner else
      } //end of else if	  
    } //end of if
    else {
      mouseDown = false;
      alert('please select a drawing tool and/or a color before drawing');
      return false;
    } //end of else
  }); //end of mousedown func
  $('#myCanvas').mousemove(function (e) { //this code runs only if the mouse has been pressed inside the canvas
    if (mouseDown) {
      mouseX = e.pageX - offset.left; //x coord of mouse as it moves inside the canvas
      mouseY = e.pageY - offset.top; //y coord of mouse as it moves inside the canvas
      width = Math.abs(mouseX - startX); //width of rectangle to be drawn inside the canvas (absolute value)
      height = Math.abs(mouseY - startY); //height of rectangle to be drawn inside the canvas (absolute value)
      var beginrad = startX; //to calculate circle radius
      var endrad = mouseX;  //to calculate circle radius
      var radius = endrad - beginrad;  //to calculate circle radius
      if (curDrawingTool == 'Line' && isEraserSelected == false) //if the selected tool is the line ...   
      {
        drawLine(startX, startY, mouseX, mouseY); //call the function to draw the line
      } //end of if
      else if (curDrawingTool == 'Pencil' || isEraserSelected) //if the selected tool is the pencil/free-hand drawing tool ...
      {
        continueLine(mouseX + 1, mouseY + 1); //continue drawing the line from the previous func in mousedown event handler
      }  //end of else if  
      else if (curDrawingTool == 'Rectangle' && isEraserSelected == false) //if the selected tool is the rectangle ...
      {
        drawRect(startX, startY, width, height); //call the function to draw the rectangle
      } //end of else if
      else if (curDrawingTool == 'Circle' && isEraserSelected == false) //if the selected tool is the circle ...
      {
        drawCircle(startX, startY, radius); //call the function to draw the circle
      } //end of else if

    } //end of if
    else {
      return false;  //otherwise stop the app from processing the code
    } //end of else
  }); //end of mousemove func
  $('#myCanvas').mouseup(function (e) {
    mouseDown = false;
    return false;
  }); //end of mouseup func

  //Clear canvas
  $('#clearLink').click(function () {
    clear();
    return false;
  }); //end of click
}); //end of ready
//http://www.youtube.com/watch?v=CHLxtm5_HRs