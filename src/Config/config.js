import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 960,
  height: 720,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
};