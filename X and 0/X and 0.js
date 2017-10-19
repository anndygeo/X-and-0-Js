var gameModule = (function() {

  var clickMatrix = [];
  var clickCount = 0;
  var isTurn = "X";
  var winPlayer1=0;
  var winPlayer2=0;

  function enterNamePlayer (player) {
      var playerName;
      while(!playerName || playerName.length == 0) {
        var playerName = prompt("Player "+player+", please enter your name.");
      }
      document.getElementById("player"+ player).value = playerName ;
      document.getElementById("player"+ player).setAttribute("disabled", true);
      document.getElementById("score").innerHTML = '<p id="user1">'+winPlayer1+'</p>  Vs  <p id="user2">'+winPlayer2+'</p>';
      return;
  };
  function startGame() {
    console.log('startGame');
      if(!document.getElementById("player1").getAttribute("disabled") ||
        !document.getElementById("player2").getAttribute("disabled")) {
        alert("Both players must enter their name!");
      } else if(document.getElementById("player1").value ===
        document.getElementById("player2").value) {
        alert("Players names must be different")
        return enterNamePlayer(1),enterNamePlayer(2);
      } else {
        document.getElementById("player1").className = "turnIsNow";
        document.getElementById("player2").className = "nextTurn";
        clickMatrix = [];
        clickCount = 0;
        isTurn = "X";
        table();
      }
  }
  function table() {
    var html ="";
      for (let i=0; i<3; ++i) {
        clickMatrix[i] = [];
        html += '<tr class="clear"></tr>';
          for (let j=0; j<3; ++j) {
             clickMatrix[i][j] = "";
             html += '<td class="cell" >'+clickMatrix[i][j]+
                    '<button onClick="gameModule.playRecordClick(event,'+i+','+j+')"></button></td>';
          }
      }
    document.getElementById("content").innerHTML  = html;
    return ;
  }
  function playRecordClick (event,x,y){
      clickCount++;
      if (clickMatrix[x][y]=="") {
          clickMatrix[x][y]=isTurn;
          console.log('isTurn',isTurn);
          event.target.textContent=isTurn;
          isTurn=(isTurn=="X")?"O":"X";
          event.target.setAttribute("disabled", true);
            if(isTurn == "X") {
              document.getElementById("player1").className = "turnIsNow";
              document.getElementById("player2").className = "nextTurn";
            } else {
              document.getElementById("player2").className = "turnIsNow";
              document.getElementById("player1").className = "nextTurn";
            }
      }
      setTimeout(function(){if(clickCount >= 5){
            check_game();
        }}, 500);
  }
  function check_game() {
            // check on lines
      for (let i=0; i<3; i++) {
        if(clickMatrix[i][0]==clickMatrix[i][1] &&
          clickMatrix[i][1]==clickMatrix[i][2] &&
          clickMatrix[i][0]!="") {
            return  playerWin(clickMatrix[i][0]);
        }
      }
            // check on columns
      for (let i=0; i<3; i++) {
        if(clickMatrix[0][i]==clickMatrix[1][i] &&
          clickMatrix[1][i]==clickMatrix[2][i]  &&
          clickMatrix[0][i]!="") {
            return  playerWin(clickMatrix[0][i]);
        }
      }
            // check on first diagonal \
      if(clickMatrix[0][0]==clickMatrix[1][1] &&
        clickMatrix[1][1]==clickMatrix[2][2]  &&
        clickMatrix[0][0]!="") {
          return  playerWin(clickMatrix[0][0]);
      }
            // check on second diagonal /
      if(clickMatrix[0][2]==clickMatrix[1][1] &&
        clickMatrix[1][1]==clickMatrix[2][0]  &&
        clickMatrix[1][1]!="") {
          return  playerWin(clickMatrix[0][2]);
      }
      if(clickCount == 9) {
        alert("We don\'t have a winner");
        return startGame();
      }
      function playerWin(prop) {
          if(prop == "X"){
              alert("Congratulations the player: "+document.getElementById("player1").value+" win!");
              winPlayer1++;
          } else {
              alert("Congratulations the player: "+document.getElementById("player2").value+" win!");
              winPlayer2++;
          }
            document.getElementById("score").innerHTML = '<p id="user1">'+winPlayer1+'</p>  Vs  <p id="user2">'+winPlayer2+'</p>';
          if(winPlayer1 > winPlayer2){
              document.getElementById("user1").className = "mostWins";
              document.getElementById("user2").className = "lessWins";
          } else if(winPlayer1 < winPlayer2) {
              document.getElementById("user1").className = "lessWins";
              document.getElementById("user2").className = "mostWins";
          } else if(winPlayer1 == winPlayer2) {
              document.getElementById("user1").className = "equalWins";
              document.getElementById("user2").className = "equalWins";
          }
          return startGame()
        }
  }
  return {
    enterNamePlayer: enterNamePlayer,
    startGame: startGame,
    table: table,
    playRecordClick: playRecordClick
  }
})();
