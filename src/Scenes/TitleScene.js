import Phaser from 'phaser';
import config from '../Config/config';
 
export default class TitleScene extends Phaser.Scene {
  constructor () {
    super('Title');
  }

  
  create () {   
    this.add.image(400, 300, 'bgImage');
    
    // Play
    this.gameButton = this.add.sprite(100, 200, 'butOne').setInteractive();
    this.centerButton(this.gameButton, 1);
    this.gameText = this.add.text(0, 0, 'Play', { fontSize: '32px', fill: '#fff' });
    Phaser.Display.Align.In.Center(this.gameText, this.gameButton);

    this.gameButton.on('pointerdown', () => {
      this.scene.start('Game');
    });
  
    // Options
     
    this.gameButton = this.add.sprite(300, 200, 'butOne').setInteractive();
    this.centerButton(this.gameButton);
    this.gameText = this.add.text(0, 0, 'Options', { fontSize: '32px', fill: '#fff' });
    Phaser.Display.Align.In.Center(this.gameText, this.gameButton);

    this.gameButton.on('pointerdown', () => {
      this.scene.start('Options');
    });  
    
    // Credits
    
    this.gameButton = this.add.sprite(300, 200, 'butOne').setInteractive();
    this.centerButton(this.gameButton, -1);
    this.gameText = this.add.text(0, 0, 'Credits', { fontSize: '32px', fill: '#fff' });
    Phaser.Display.Align.In.Center(this.gameText, this.gameButton);

    this.gameButton.on('pointerdown', () => {
      this.scene.start('Credits');
    });  
    
    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('butTwo');
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('butOne');
    });

    this.input.on('pointerover', (event, gameObjects) => {
      gameObjects[0].setTexture('butTwo');
    });

    this.input.on('pointerout', (event, gameObjects) => {
      gameObjects[0].setTexture('butOne');
    });  

  }
    centerButton(gameObject, offset = 0) {
      Phaser.Display.Align.In.Center(
        gameObject, this.add.zone(
          config.width / 2,
          config.height / 2 - offset * 100,
          config.width, config.height,
        ),
      );
    } 
  };