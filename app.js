new Vue({
	el: '#app',
  data: {
  	playerHealth: 100,
  	monsterHealth: 100,
  	gameIsRuning: false,
  	turns: []
  },
  methods: {
  	startNewGame: function () {
  		this.playerHealth = 100,
  		this.monsterHealth = 100,
  		this.gameIsRuning = true,
  		this.turns = []  	
  	},
  	attack: function () {
  		var damage = this.calculateDamage(3,10);
  		this.monsterHealth -= damage;
  		this.turns.unshift({
  			playerTurn: true,
  			text: 'Player hits Monster for ' + damage
  		})
  		if(this.checkwin()) {
  			return;
  		}
  		this.monsterAttack();
  	},
  	specialAttack: function () {
  		var damage = this.calculateDamage(5,15);
  		this.monsterHealth -= damage;
  		this.turns.unshift({
  			playerTurn: true,
  			text: 'Player hits Monster for ' + damage
  		})
  		if(this.checkwin()) {
  			return;
  		}
  		this.monsterAttack();
  	},
  	heal: function () {
  		if (this.playerHealth <= 90) {
  			this.playerHealth += 10;
  		}
  		else {
  			this.playerHealth = 100;
  		}
  		this.turns.unshift({
  			playerTurn: true,
  			text: 'Player healed for 10 '
  		})
  		this.monsterAttack();
  	},
  	giveUp: function () {
		this.gameIsRuning = false;
  	},
  	monsterAttack: function () {
  		var damage = this.calculateDamage(4,12);
  		this.playerHealth -= damage;
  		this.turns.unshift({
  			playerTurn: false,
  			text: 'Monster hits Player for ' + damage
  		})
  		this.checkwin();
  	},
  	calculateDamage: function (min, max) {
  		return Math.max(Math.floor(Math.random() * max) + 1, min);
  	},
  	checkwin: function () {
  		if (this.monsterHealth <= 0) {
  			if(confirm('You won! New Game?')) {
  				this.startNewGame();
  			}
  			else {
  				this.gameIsRuning = false;
  			}
  		return true;
  		};
  		if (this.playerHealth <= 0) {
  			if(confirm('You lost! New Game?')) {
  				this.startNewGame();
  			}
  			else {
  				this.gameIsRuning = false;
  			}
  		return true;
  		};
  		return false;

  	}

  }
});