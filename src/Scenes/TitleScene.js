import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
 
export default class TitleScene extends Phaser.Scene {
  constructor () {
    super('Title');
  }

  
  create () {   
    this.add.image(480, 360, 'bgImage');
    
    // Play
    this.gameButton = new Button(this, config.width/2, config.height/2 - 100, 'butOne', 'butTwo', 'Play', 'Game');
  
    // Options
    this.optionsButton = new Button(this, config.width/2, config.height/2, 'butOne', 'butTwo', 'Options', 'Options');
    
    // Credits
    this.creditsButton = new Button(this, config.width/2, config.height/2 + 100, 'butOne', 'butTwo', 'Credits', 'Credits');
    

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
};