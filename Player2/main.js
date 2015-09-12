/**
 * Created by Dagli on 9/11/15.
 */

$(document).ready(init);



function init(){
  $(".resetButton").on("click",clearDB);
  $(".makeBoardButton").click(displayGameBoard);
  var gameBoard = new Firebase('https://battleshipgames.firebaseio.com/');
  var row;
  var col;
  $(".startGame").on("click", sendUpdatedData);
  $("#myGameBoard").on("click",".tile",selectShipPlace);
  $("#theirGameBoard").on("click",".tile",opponentCellClicked);
  function clearDB(){
         var array1 = [];
         var array2 = ["","","","","","","","","",""];
         for(var i =0; i<10;i++){
             array1.push(array2);
         }
         console.log(array1);
         gameBoard.set({"player1" :array1,"player2" :array1, "row":"null", "col":"null"});
   console.log("DataBase Reset");
 }

  function sendUpdatedData (row,col) {
    console.log("Did I go to soon >_<!");
    //var oldBoard = battleshipFirebaseData;
    gameBoard.child('player2').child(row).child(col).update({ship: true, status: 'njmk'});
  }
  function selectShipPlace(){
    var tile = $(this);
    tile.css("background-color","red");
    var rowSelected = tile.closest('.row').data('row');
    var colSelected = tile.data('col');
    console.log(rowSelected);
    console.log(colSelected);
    sendUpdatedData(rowSelected,colSelected);
  }
}//end of init
function isShipHit(row, col, callback){
  console.log("get get get get");
  console.log("passed"+row+" "+col);
  var gamePiece = new Firebase('https://battleshipgames.firebaseio.com/player1/'+ row + '/' + col);
    gamePiece.on('value', function(snapshot) {
    console.log("ship "+snapshot.val().ship);
    callback(snapshot.val().ship);
  });
}
  

function opponentCellClicked(){
    var tile = $(this);
    console.log(tile);
    var rowSelected = tile.closest('.row').data('row');
    var colSelected = tile.data('col');
    console.log(rowSelected);
    console.log(colSelected);
    isShipHit(rowSelected,colSelected,function(isShip){
    if(isShip)
      tile.css("background-image","url(blast.png)");
    else
      tile.css("background-image","url(miss.png)");
    });
  
}

function displayGameBoard(){
 var $gameBoard = $('.gameBoard');
 for (var j= 0; j < 10; j++) {
   var rowArray = [];
   $gameBoard.append('<div class="row" data-row=' + j +'></div>');
   for (var i = 0; i < 10; i++) {
     rowArray.push('<div class="tile" data-col=' + i + '></div>');
   }
   $gameBoard.find('.row:last').append(rowArray);
 }
}
