import Phaser from 'phaser';
import loader from '../loaders/loader';
import config from '../Config/config';
import Button from '../Objects/Button';
import 'regenerator-runtime/runtime';

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super('Leader');
  }

  async create() {
    const scores = await loader
      .fetchScores()
      .then((scoresObject) => scoresObject.result);
    const topScores = scores.sort((a, b) => b.score - a.score).slice(0, 10);

    this.zone = this.add.zone(
      this.game.config.width / 2,
      this.game.config.height / 2,
      this.game.config.width * (3 / 4),
      this.game.config.height * (4 / 5),
    );
    Phaser.Display.Align.In.TopCenter(
      this.add.text(0, 0, 'Leaderboard', { fontSize: '55px' }),
      this.zone,
    );
    const firstScoreHeight = 140;
    const leftColumn = this.game.config.width / 3;
    const rightColumn = this.game.config.width - leftColumn;
    const fontSize = '30px';
    const rowGap = 30;

    for (let i = 0; i < topScores.length; i += 1) {
      let textColour;
      switch (i) {
        case 0:
          textColour = 'green';
          break;
        default:
          textColour = 'white';
          break;
      }

      this.add.text(
        leftColumn,
        firstScoreHeight + rowGap * i,
        topScores[i].user,
        {
          fontSize,
          color: textColour,
        },
      );

      this.add.text(
        rightColumn,
        firstScoreHeight + rowGap * i,
        topScores[i].score,
        {
          fontSize,
          color: textColour,
        },
      );
    }

    this.gameButton = new Button(this, config.width / 2, config.height / 2 + 300, 'butOne', 'butTwo', 'Menu', 'Title');
  }
}
