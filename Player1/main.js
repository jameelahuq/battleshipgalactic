/**
 * Created by Dagli on 9/11/15.
 */

$(document).ready(init);
function init(){
  var battleshipFirebaseData = getFirebaseData();
  var lastMove = sendUpdatedData();
  $(".startButton").click(displayGameBoard);
  $(".startGame").on("click", sendUpdatedData);

  getUpdatedData(lastMove);

  $("#myGameBoard").on("click",".tile",selectShipPlace);
}
function selectShipPlace(){
  var tile = $(this);
  tile.css("background-color","red");
  //update the database
}
function isShipHit(){
  //check if hit
  //change class to red
  //
}
function displayGameBoard(){
 var $gameBoard = $('.gameBoard');
 for (var j= 0; j < 10; j++) {
   var rowArray = [];
   $gameBoard.append('<div class="row"></div>');
   for (var i = 0; i < 10; i++) {
     rowArray.push('<div class="tile"/>');
   }
   $gameBoard.find('.row:last').append(rowArray);
 }
}

function getUpdatedData(lastMove){
  var battleshipFirebaseData = getFirebaseData();
   battleshipFirebaseData.on('child_changed', function(snapshot, lastMove) {
     console.log(snapshot.val());
     console.log("the child key???: " + lastMove);
     return snapshot.val();
  });
}

function sendUpdatedData() {
  var battleshipFirebaseData = getFirebaseData();
  var oldBoard = battleshipFirebaseData;
  battleshipFirebaseData.child('player1').child(5).child(7).update({ship: true, status: 'miss'});
  return oldBoard;
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