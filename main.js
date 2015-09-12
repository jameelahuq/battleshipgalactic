/**
 * Created by HUQ on 9/11/15.
 */

$(function() {
  init();
});


function init() {
  console.log("Hello World!");
  var boardSize = 10;
  var $gameBoard = $('.gameBoard');
  makeGameBoard($gameBoard, boardSize);
}


var makeGameBoard = function(gameBoard, boardSize) {
  for (var j= 0; j < boardSize; j++) {
    var rowArray = [];
    gameBoard.append('<div class="row"></div>');
    for (var i = 0; i < boardSize; i++) {
      rowArray.push('<div/>');
      //$("p").append("Some appended text.");
    }
    gameBoard.find('.row:last').append(rowArray);
  }
};