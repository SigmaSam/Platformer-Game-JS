import Phaser from 'phaser';
import player from '../assets/player.png';
import platform from '../assets/platform.png';
import stars from '../assets/stars.png';
import bgImage from '../assets/background/bg.png';
import bgMusic from '../assets/awesomeness.wav';
import butOne from '../assets/ui/blue_button02.png';
import butTwo from '../assets/ui/blue_button03.png';
import checkedBox from '../assets/ui/blue_boxCheckmark.png';
import box from '../assets/ui/grey_box.png';


export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 70,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(2000, this.ready, [], this);

    this.load.image('bgImage', bgImage);
    this.load.spritesheet('player', player, {
      frameWidth: 73,
      frameHeight: 97,
    });
    this.load.image('stars', stars);
    this.load.image('platform', platform);
    this.load.image('butOne', butOne);
    this.load.image('butTwo', butTwo);
    this.load.image('checkedBox', checkedBox);
    this.load.image('box', box);
    this.load.image('stars', stars);
    this.load.audio('bgMusic', bgMusic);
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
}
