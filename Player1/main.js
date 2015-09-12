/**
 * Created by Dagli on 9/11/15.
 */

$(document).ready(init);



function init(){
  $(".makeBoardButton").click(displayGameBoard);

  var gameBoard = new Firebase('https://battleshipgames.firebaseio.com/');


  var row;
  var col;
  $(".startGame").on("click", sendUpdatedData);

  $("#myGameBoard").on("click",".tile",selectShipPlace);

  function sendUpdatedData (row,col) {
    console.log("Did I go to soon >_<!");
    //var oldBoard = battleshipFirebaseData;
    gameBoard.child('player1').child(row).child(col).update({ship: true, status: 'njmk'});
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
}





function isShipHit(){}




  function getUpdatedData(row, col){
    console.log("get get get get");
    var gamePiece = new Firebase('https://battleshipgames.firebaseio.com/player1/'+ row + '/' + col);
    gamePiece.on('child_changed', function(snapshot) {
      console.log(snapshot.val());
      return snapshot.val();
    });
  }
  //$(".row").on("click",".rowElement",cellClicked);
  //$(".imagePlaced").on("click",".rowElement",cellClicked)

function cellClicked(){
  //when cell clicked 
  //1.check if hit call shipHit
  //2.send data back  --- call sendUpdatedData
}

function shipHit(){

  //check if hit
  //change class to red
  //
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






function getFirebaseData(){
  return new Firebase('https://battleshipgames.firebaseio.com/');
}
function createDB(){
   var myDataRef = getFirebaseData();
         var array1 = [];
         var array2 = ["","","","","","","","","",""];
         for(var i =0; i<10;i++){
             array1.push(array2);
         }
         console.log(array1);
         myDataRef.update({"player1" :array1,"player2" :array1});
   console.log("child added");
 }
