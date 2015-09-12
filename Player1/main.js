/**
 * Created by Dagli on 9/11/15.
 */
$(document).ready(init);


function init(){
  var gameBoard = new Firebase('https://battleshipgames.firebaseio.com/');
  var rowClicked = new Firebase('https://battleshipgames.firebaseio.com/row');
  var colClicked = new Firebase('https://battleshipgames.firebaseio.com/col');

  //var battleshipFirebaseData = getFirebaseData();
  //var lastMove =
  //$(".startButton").click(displayGameBoard);
  var row;
  var col;
  $(".startGame").on("click", sendUpdatedData);
  $(".pretendShip").on("click", getPositionofTileClick);
  getPositionofTileClick();

  function sendUpdatedData () {
    console.log("Did I go to soon >_<!");
    //var oldBoard = battleshipFirebaseData;
    gameBoard.child('player1').child(row).child(col).update({ship: false, status: 'pinak'});
  }

  function getPositionofTileClick() {
    console.log("Button clicked!!");
    //row = 0;
    //col = 0;
    rowClicked.on('value', function(snapshot) {
      console.log("Row clicked!!" + snapshot.val());
      row = snapshot.val();
    });

    colClicked.on('value', function(snapshot) {
      console.log("Col clicked!!" + snapshot.val());
      col = snapshot.val();
    });
    getUpdatedData(row, col);
  }

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
}

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
//function displayGameBoard(){
//  var $gameBoard = $('.gameBoard');
//  for (var j= 0; j < 10; j++) {
//    var rowArray = [];
//    gameBoard.append('<div class="row"></div>');
//    var newdiv = $('<div/>').addclass("rowElement");
//    for (var i = 0; i < 10; i++) {
//      rowArray.push(newdiv);
//      //$("p").append("Some appended text.");
//    }
//    gameBoard.find('.row:last').append(rowArray);
//  }
//}





function getFirebaseData(){
  return new Firebase('https://battleshipgames.firebaseio.com/');
}
//function createDB(){
//    var myDataRef = getFirebaseData();
//          var array1 = [];
//          var array2 = ["","","","","","","","","",""];
//          for(var i =0; i<10;i++){
//              array1.push(array2);
//          }
//          console.log(array1);
//          myDataRef.update({"player1" :array1,"player2" :array1});
//    console.log("child added");
//  }