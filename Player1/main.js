/**
 * Created by Dagli on 9/11/15.
 */

$(function() {
  init();
});


function init(){
  var gameBoard = new Firebase('https://battleshipgames.firebaseio.com/');

  var me = 'player1';
  var opponent = 'player2';
  var myStatusLink = new Firebase('https://battleshipgames.firebaseio.com/' + me + '/');
  var oppStatusLink = new Firebase('https://battleshipgames.firebaseio.com/' + opponent + '/');
  //var currentPlayer = "player1";

  var $gameBoard = $('.gameBoard');
  var $myGameBoard = $('#myGameBoard');
  var $theirGameBoard = $('#theirGameBoard');
  var $theirArena = $('#theirArena');
  var row;
  var col;
  var myShipCount = 0;
  var winGameCondition = 15;
  var opponentShips = 15;

  $(".makeBoardButton").click(makeGameBoard);
  $(".startGame").on("click", setMeAsReady);
  $myGameBoard.on("click",".tile",selectShipPlace);
  $theirGameBoard.on("click",".tile",opponentTileClicked);
  makeGameBoard();
  isMyOpponentReady();

  function clearDB(){
    var array1 = [];
    var array2 = ["","","","","","","","","",""];
    for(var i =0; i<10;i++){
      array1.push(array2);
    }
    console.log(array1);
    gameBoard.set({"player1" :array1,"player2" :array1, "row":"null", "col":"null"} );
    myStatusLink.update({status: "selecting"});
    oppStatusLink.update({status: "selecting"});
    console.log("DataBase Reset");
  }


  function makeGameBoard(){
    $gameBoard.empty();
    myShipCount=0;
    opponentShips=winGameCondition;
    $(".playerName").text(me.toUpperCase());
    $theirArena.addClass('hidden');
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
    gameBoard.child(me).child(row).child(col).update({ship: true, status: 'null'});
  }

  function selectShipPlace(){
    var tile = $(this);
    if(tile.attr('class').match(/shipIsHere/g)){
      $(".modal-title").text("You cannot place missiles on top of each other");
      $('#myModal').modal({
        show: 'false'
      });
    }
    else if (myShipCount < winGameCondition ) {
      myShipCount++;
      tile.addClass('shipIsHere');
      var rowSelected = tile.closest('.row').data('row');
      var colSelected = tile.data('col');
      sendUpdatedData(rowSelected, colSelected);
    } else {
      $(".modal-title").text("You cannot add any more Missiles");
      $('#myModal').modal({
        show: 'false'
      });
    }
  }

 function setMeAsReady () {
   console.log("I wanna be ready!");
   if (myShipCount < winGameCondition) {
     alert("You are not ready!");
   } else {
     myStatusLink.update({status: 'ready'});
   }
  }

  function isMyOpponentReady() {
    myStatusLink.on('value', function (snapshot) {
      var myStatus = snapshot.val().status;
      console.log("I am " + myStatus);
      oppStatusLink.on('value', function (snapshot) {
        console.log("opponent is " + snapshot.val().status);
        if (snapshot.val().status === "ready" && myStatus === "ready") {
          $theirArena.removeClass('hidden');
        }
      });


    });
  }

  function opponentTileClicked(){
    var tile = $(this);
    console.log(tile);
    var rowSelected = tile.closest('.row').data('row');
    var colSelected = tile.data('col');
    console.log(rowSelected);
    console.log(colSelected);
    isShipHit(rowSelected, colSelected,function(isShip){
      if(isShip) {
        tile.addClass('hit');
        gameBoard.child(opponent).child(rowSelected).child(colSelected).update({status: 'HIT'});
        opponentShips--;
        if(opponentShips ===0) {
          $(".modal-title").text("Congratulation!!! you've conquered the battle");
          $('#myModal').modal({
            show: 'false'
          });
          $gameBoard.addClass("done");
        }
      } else {
        tile.addClass('miss');
        gameBoard.child(opponent).child(rowSelected).child(colSelected).update({status: 'MISS'});
      }
    });
  }
  function isShipHit(row, col, callback){
    console.log("get get get get");
    console.log("passed"+row+" "+col);
    var gamePiece = new Firebase('https://battleshipgames.firebaseio.com/'+opponent+'/'+ row + '/' + col);
    gamePiece.on('value', function(snapshot) {
      console.log("ship "+snapshot.val().ship);
      callback(snapshot.val().ship);
    });
  }
};//end of init








