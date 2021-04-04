import Phaser from'phaser';
import gameOptions from '../Config/gameOptions';
 
export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }
  
  create () {    
    this.add.image(480, 360, 'bgImage');

    // group with all active platforms.
    this.platformGroup = this.add.group({
      removeCallback(platform) {
        platform.scene.platformPool.add(platform);
      },
    });
    // pool
    this.platformPool = this.add.group({
      removeCallback(platform) {
        platform.scene.platformGroup.add(platform);
      },
    });
    // number of consecutive jumps made by the player
    this.playerJumps = 0;
    
    this.addPlatform(game.config.width, game.config.width / 2, game.config.height * gameOptions.platformVerticalLimit[1]);

    this.addPlatform(this.game.config.width, this.game.config.width / 2, game.config.height * gameOptions.platformVerticalLimit[1]);

    this.player = this.physics.add.sprite(100, 250, 'player');

    this.player.setBounce(0.2);
    this.player.setGravityY(gameOptions.playerGravity);

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.physics.add.collider(this.player, this.platformGroup, function(){
      if(!this.player.anims.isPlaying){
          this.player.anims.play("right");
      }
  }, null, this);

    this.input.on("pointerdown", this.jump, this);
  }

  addPlatform(platformWidth, posX, posY){
    this.addedPlatforms += 1;
    let platform;
    if(this.platformPool.getLength()){
        platform = this.platformPool.getFirst();
        platform.x = posX;
        platform.active = true;
        platform.visible = true;
        this.platformPool.remove(platform);
    }
    else{
        platform = this.physics.add.sprite(posX, posY, "platform");
        platform.setImmovable(true);
        platform.setVelocityX(Phaser.Math.Between(gameOptions.platformSpeedRange[0], gameOptions.platformSpeedRange[0]) * -1);
        this.platformGroup.add(platform);
    }
    platform.displayWidth = platformWidth;
    this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);
}
  
jump(){
  if(this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)){
      if(this.player.body.touching.down){
          this.playerJumps = 0;
      }
      this.player.setVelocityY(gameOptions.jumpForce * -1);
      this.playerJumps += 1;

      this.player.anims.stop();
  }
}

update() {
   if(this.player.y > game.config.height){
    this.scene.start("Title");
  }
  this.player.x = gameOptions.playerStartPosition;

  let minDistance = game.config.width;
  let rightmostPlatformHeight = 0;
  this.platformGroup.getChildren().forEach(function(platform){
      let platformDistance = game.config.width - platform.x - platform.displayWidth / 2;
      if(platformDistance < minDistance){
          minDistance = platformDistance;
          rightmostPlatformHeight = platform.y;
      }
      if(platform.x < - platform.displayWidth / 2){
          this.platformGroup.killAndHide(platform);
          this.platformGroup.remove(platform);
      }
  }, this);

  this.platformGroup.getChildren().forEach((platform) => {
    const platformDistance = this.game.config.width - platform.x - platform.displayWidth / 2;
    minDistance = Math.min(minDistance, platformDistance);
    if (platform.x < -platform.displayWidth / 2) {
      this.platformGroup.killAndHide(platform);
      this.platformGroup.remove(platform);
    }
  }, this);

  if(minDistance > this.nextPlatformDistance){
    const nextPlatformWidth = Phaser.Math.Between(
      gameOptions.platformSizeRange[0],
       gameOptions.platformSizeRange[1]
      );
    const platformRandomHeight = gameOptions.platformHeighScale * Phaser.Math.Between(
      gameOptions.platformHeightRange[0],
      gameOptions.platformHeightRange[1]
    );

    let nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
    let minPlatformHeight = game.config.height * gameOptions.platformVerticalLimit[0];
    let maxPlatformHeight = game.config.height * gameOptions.platformVerticalLimit[1];
    let nextPlatformHeight = Phaser.Math.Clamp(
      nextPlatformGap,
      minPlatformHeight,
      maxPlatformHeight
    );
    this.addPlatform(nextPlatformWidth, this.game.config.width + nextPlatformWidth / 2, nextPlatformHeight);
  }
}

};
