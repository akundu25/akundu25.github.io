var UIController = (function() {
    
    var DOMStrings = {
        start_game: '.play-game',
        player_1: '#player1',
        player_2: '#player2',
        structure: '.structure',
        turn: '.turn',
        current_player: '.player-name',
        winner: '.winner',
        box1: '.box1',
        box2: '.box2',
        box3: '.box3',
        box4: '.box4',
        box5: '.box5',
        box6: '.box6',
        box7: '.box7',
        box8: '.box8',
        box9: '.box9'
    };
    
    
    return {
    
        getDOM: function() {
            return DOMStrings;
        },
        
        getPlayer: function() {
            
            return {
                name1: document.querySelector(DOMStrings.player_1).value,
                name2: document.querySelector(DOMStrings.player_2).value
            }
        }
        
    };
    
})();



var Controller = (function(UICtrl) {
    
    var player1, player2, currentPlayer, DOM, gamePlaying;
    
    var gameData = {
        
        cross: [],
        zero: [],
        boxes: []
    }
    
    var callEventListeners = function() {
        DOM = UICtrl.getDOM();
        
        document.querySelector(DOM.start_game).addEventListener('click', inputData);
        
         document.querySelector(DOM.box1).addEventListener('click', function anonymous1() {
            actionBox(1);
            document.querySelector(DOM.box1).removeEventListener('click', anonymous1);
        });
        
       document.querySelector(DOM.box2).addEventListener('click', function anonymous2() {
            actionBox(2);
            document.querySelector(DOM.box2).removeEventListener('click', anonymous2);
        });
        
        document.querySelector(DOM.box3).addEventListener('click', function anonymous3() {
            actionBox(3);
            document.querySelector(DOM.box3).removeEventListener('click', anonymous3);
        });
        
        document.querySelector(DOM.box4).addEventListener('click', function anonymous4() {
            actionBox(4);
            document.querySelector(DOM.box4).removeEventListener('click', anonymous4);
        });
        
        document.querySelector(DOM.box5).addEventListener('click', function anonymous5() {
            actionBox(5);
            document.querySelector(DOM.box5).removeEventListener('click', anonymous5);
        });
        
        document.querySelector(DOM.box6).addEventListener('click', function anonymous6() {
            actionBox(6);
            document.querySelector(DOM.box6).removeEventListener('click', anonymous6);
        });
        
        document.querySelector(DOM.box7).addEventListener('click', function anonymous7() {
            actionBox(7);
            document.querySelector(DOM.box7).removeEventListener('click', anonymous7);
        });
        
        document.querySelector(DOM.box8).addEventListener('click', function anonymous8() {
            actionBox(8);
            document.querySelector(DOM.box8).removeEventListener('click', anonymous8);
        });
        
        document.querySelector(DOM.box9).addEventListener('click', function anonymous9() {
            actionBox(9);
            document.querySelector(DOM.box9).removeEventListener('click', anonymous9);
        });
    }
    
    
    var inputData = function() {
        var players, body;
        
        body = document.querySelector(DOM.structure);
        players = UICtrl.getPlayer();
        body.style.display = 'block';

        player1 = players.name1;
        player2 = players.name2;

        document.querySelector(DOM.current_player).textContent = player1;
       
    }
    
    
    var actionBox = function(box_number) {
        
        if(gamePlaying) {
            
            if(currentPlayer === 'player1'){
                document.querySelector('.box'+box_number.toString()).style.backgroundImage = 'url(images/cross.png)';
                document.querySelector('.box'+box_number.toString()).style.backgroundRepeat = 'no-repeat';
                gameData.cross.push(box_number);
                gameData.boxes.push(box_number);
                checkWinner();
                currentPlayer = 'player2';
                document.querySelector(DOM.current_player).textContent = player2;
           
            }else if(currentPlayer === 'player2'){
                document.querySelector('.box'+box_number.toString()).style.backgroundImage = 'url(images/zero.png)';
                document.querySelector('.box'+box_number.toString()).style.backgroundRepeat = 'no-repeat';
                gameData.zero.push(box_number);
                gameData.boxes.push(box_number);
                checkWinner();
                currentPlayer = 'player1';
                document.querySelector(DOM.current_player).textContent = player1;
        
            }
       
        }
            
    }
    
    var checkWinner = function() {
        
        if(currentPlayer === 'player1'){
            document.querySelector(DOM.winner).textContent = player1 + ' Won!!!';
        }else {
            document.querySelector(DOM.winner).textContent = player2 + ' Won!!!';
        }
        
        
        if(gameData.cross.includes(1) && gameData.cross.includes(2) && gameData.cross.includes(3)) {
            document.querySelector(DOM.turn).style.display = 'none';
            document.querySelector(DOM.winner).style.display = 'block';
            winnerAnimation(1, 2, 3);
            gamePlaying = false;
        }else if(gameData.cross.includes(4) && gameData.cross.includes(5) && gameData.cross.includes(6)) {
            document.querySelector(DOM.turn).style.display = 'none';
            document.querySelector(DOM.winner).style.display = 'block';
            winnerAnimation(4, 5, 6);
            gamePlaying = false;
        }else if(gameData.cross.includes(7) && gameData.cross.includes(8) && gameData.cross.includes(9)) {
            document.querySelector(DOM.turn).style.display = 'none';
            document.querySelector(DOM.winner).style.display = 'block';
            winnerAnimation(7, 8, 9);
            gamePlaying = false;
        }else if(gameData.cross.includes(1) && gameData.cross.includes(4) && gameData.cross.includes(7)) {
            document.querySelector(DOM.turn).style.display = 'none';
            document.querySelector(DOM.winner).style.display = 'block';
            winnerAnimation(1, 4, 7);
            gamePlaying = false;
        }else if(gameData.cross.includes(2) && gameData.cross.includes(5) && gameData.cross.includes(8)) {
            document.querySelector(DOM.turn).style.display = 'none';
            document.querySelector(DOM.winner).style.display = 'block';
            winnerAnimation(2, 5, 8);
            gamePlaying = false;
        }else if(gameData.cross.includes(3) && gameData.cross.includes(6) && gameData.cross.includes(9)) {
            document.querySelector(DOM.turn).style.display = 'none';
            document.querySelector(DOM.winner).style.display = 'block';
            winnerAnimation(3, 6, 9);
            gamePlaying = false;
        }else if(gameData.cross.includes(1) && gameData.cross.includes(5) && gameData.cross.includes(9)) {
            document.querySelector(DOM.turn).style.display = 'none';
            document.querySelector(DOM.winner).style.display = 'block';
            winnerAnimation(1, 5, 9);
            gamePlaying = false;
        }else if(gameData.cross.includes(3) && gameData.cross.includes(5) && gameData.cross.includes(7)) {
            document.querySelector(DOM.turn).style.display = 'none';
            document.querySelector(DOM.winner).style.display = 'block';
            winnerAnimation(3, 5, 7);
            gamePlaying = false;
        }else if(gameData.zero.includes(1) && gameData.zero.includes(2) && gameData.zero.includes(3)) {
            document.querySelector(DOM.turn).style.display = 'none';
            document.querySelector(DOM.winner).style.display = 'block';
            winnerAnimation(1, 2, 3);
            gamePlaying = false;
        }else if(gameData.zero.includes(4) && gameData.zero.includes(5) && gameData.zero.includes(6)) {
            document.querySelector(DOM.turn).style.display = 'none';
            document.querySelector(DOM.winner).style.display = 'block';
            winnerAnimation(4, 5, 6);
            gamePlaying = false;
        }else if(gameData.zero.includes(7) && gameData.zero.includes(8) && gameData.zero.includes(9)) {
            document.querySelector(DOM.turn).style.display = 'none';
            document.querySelector(DOM.winner).style.display = 'block';
            winnerAnimation(7, 8, 9);
            gamePlaying = false;
        }else if(gameData.zero.includes(1) && gameData.zero.includes(4) && gameData.zero.includes(7)) {
            document.querySelector(DOM.turn).style.display = 'none';
            document.querySelector(DOM.winner).style.display = 'block';
            winnerAnimation(1, 4, 7);
            gamePlaying = false;
        }else if(gameData.zero.includes(2) && gameData.zero.includes(5) && gameData.zero.includes(8)) {
            document.querySelector(DOM.turn).style.display = 'none';
            document.querySelector(DOM.winner).style.display = 'block';
            winnerAnimation(2, 5, 8);
            gamePlaying = false;
        }else if(gameData.zero.includes(3) && gameData.zero.includes(6) && gameData.zero.includes(9)) {
            document.querySelector(DOM.turn).style.display = 'none';
            document.querySelector(DOM.winner).style.display = 'block';
            winnerAnimation(3, 6, 9);
            gamePlaying = false;
        }else if(gameData.zero.includes(1) && gameData.zero.includes(5) && gameData.zero.includes(9)) {
            document.querySelector(DOM.turn).style.display = 'none';
            document.querySelector(DOM.winner).style.display = 'block';
            winnerAnimation(1, 5, 9);
            gamePlaying = false;
        }else if(gameData.zero.includes(3) && gameData.zero.includes(5) && gameData.zero.includes(7)) {
            document.querySelector(DOM.turn).style.display = 'none';
            document.querySelector(DOM.winner).style.display = 'block';
            winnerAnimation(3, 5, 7);
            gamePlaying = false;
        }else if(gameData.boxes.length === 9) {
            gamePlaying = false;
            document.querySelector(DOM.winner).textContent = 'Match Tied!!!';
            document.querySelector(DOM.turn).style.display = 'none';
            document.querySelector(DOM.winner).style.display = 'block';
        }
        
    }
    
    
    var winnerAnimation = function(box1, box2, box3) {
        
        document.querySelector('.box'+box1.toString()).style.borderColor = 'red';
        document.querySelector('.box'+box2.toString()).style.borderColor = 'red';
        document.querySelector('.box'+box3.toString()).style.borderColor = 'red';
        document.querySelector('.box'+box1.toString()).style.borderWidth = 'medium';
        document.querySelector('.box'+box2.toString()).style.borderWidth = 'medium';
        document.querySelector('.box'+box3.toString()).style.borderWidth = 'medium';
        
    }
    
    
    return {
        
        init: function() {
            currentPlayer = 'player1';
            gamePlaying = true;
            callEventListeners();
        }
    };
    
})(UIController);


Controller.init();
