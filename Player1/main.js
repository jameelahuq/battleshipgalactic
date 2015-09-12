/**
 * Created by Dagli on 9/11/15.
 */

$(document).ready(init);



function init(){
  var gameBoard = new Firebase('https://battleshipgames.firebaseio.com/');
  var $gameBoard = $('.gameBoard');
  var $myGameBoard = $('.myGameBoard');
  var $theirGameBoard = $('.theirGameBoard');
  var row;
  var col;

  $(".resetButton").on("click",clearDB);
  $(".startGame").on("click", sendUpdatedData);
  $("#myGameBoard").on("click",".tile",selectShipPlace);
  $("#theirGameBoard").on("click", ".tile", opponentTileClicked);
  $(".makeBoardButton").click(makeGameBoard);

  makeGameBoard();

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

  function makeGameBoard(){
    $gameBoard.empty();
    $myGameBoard.val("My Galaxy");
    $theirGameBoard.val("Opponent's Galaxy");
    clearDB();
    for (var j= 0; j < 10; j++) {
      var rowArray = [];
      $gameBoard.append('<div class="row" data-row=' + j +'></div>');
      for (var i = 0; i < 10; i++) {
        rowArray.push('<div class="tile" data-col=' + i + '></div>');
      }
      $gameBoard.find('.row:last').append(rowArray);
    }
  }

  function sendUpdatedData (row,col) {
    gameBoard.child('player1').child(row).child(col).update({ship: true, status: 'njmk'});
  }

  function selectShipPlace(){
    var tile = $(this);
    tile.addClass('shipIsHere');
    var rowSelected = tile.closest('.row').data('row');
    var colSelected = tile.data('col');
    sendUpdatedData(rowSelected,colSelected);
  }
}

function opponentTileClicked(){
  var tile = $(this);
  console.log(tile);
  var rowSelected = tile.closest('.row').data('row');
  var colSelected = tile.data('col');
  console.log(rowSelected);
  console.log(colSelected);
  isShipHit(rowSelected,colSelected, function(isShip) {
    if(isShip)
      tile.addClass('hit');
    else
      tile.addClass('miss');
  });
}




function isShipHit(row, col, callback) {
  console.log("get get get get");
  console.log("passed" + row + " " + col);
  var gamePiece = new Firebase('https://battleshipgames.firebaseio.com/player2/' + row + '/' + col);
  gamePiece.on('value', function (snapshot) {
    console.log("ship " + snapshot.val().ship);
    callback(snapshot.val().ship);
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


