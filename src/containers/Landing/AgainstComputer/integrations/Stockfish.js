import { Component } from "react";
import PropTypes from "prop-types";
import Chess from "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess not being a constructor

const STOCKFISH = window.STOCKFISH;
const game = new Chess();

class Stockfish extends Component {
  static propTypes = { children: PropTypes.func };

  state = {
    fen: "start",
    draggable: true,
    engine: {},
    side: "black",
  };

  constructor(props) {
    super(props);
    const engine_options = {
      game: game,
      position: this.fen,
      player_color: props.side,
      level: props.difficultyLevel,
    };
    this.side = props.side;
    this.handleChangeMoves = props.handleChangeMoves;
    this.onOpponentWin = props.onOpponentWin;
    this.onYourWin = props.onYourWin;
    this.engine = this.engineGame(engine_options);
  }

  componentDidMount() {
    this.setState({ fen: game.fen() });
    if (this.side === "black") {
      this.setState({ draggable: false });
      setTimeout(() => {
        this.engine.prepareMove();
        this.setState({ draggable: true });
      }, 2000);
    }
  }

  onDrop = ({ sourceSquare, targetSquare }) => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) return;

    this.setState({ draggable: false });

    this.handleChangeMoves(this.engine.getGameHistory(), game.turn());

    return new Promise((resolve) => {
      this.setState({ fen: game.fen() });
      resolve();
    }).then(() => {
      setTimeout(() => {
        this.engine.prepareMove();
        this.setState({ draggable: true });
      }, 2000);
    });
  };

  engineGame = (options) => {
    options = options || {};

    let engine =
      typeof STOCKFISH === "function"
        ? STOCKFISH()
        : new Worker(options.stockfishjs || "/stockfish.js");
    let evaler =
      typeof STOCKFISH === "function"
        ? STOCKFISH()
        : new Worker(options.stockfishjs || "/stockfish.js");
    let engineStatus = {};
    let time = { wtime: 3000, btime: 3000, winc: 1500, binc: 1500 };
    let playerColor = "black";
    if (options.player_color !== "random") {
      playerColor = options.player_color;
    }
    setSkillLevel(options.level);
    let clockTimeoutID = null;
    let announced_game_over;

    setInterval(function () {
      if (announced_game_over) {
        return;
      }

      if (game.game_over()) {
        announced_game_over = true;
      }
    }, 500);

    function uciCmd(cmd, which) {
      // console.log('UCI: ' + cmd);

      (which || engine).postMessage(cmd);
    }
    uciCmd("uci");

    function clockTick() {
      let t =
        (time.clockColor === "white" ? time.wtime : time.btime) +
        time.startTime -
        Date.now();
      let timeToNextSecond = (t % 1000) + 1;
      clockTimeoutID = setTimeout(clockTick, timeToNextSecond);
    }

    function stopClock() {
      if (clockTimeoutID !== null) {
        clearTimeout(clockTimeoutID);
        clockTimeoutID = null;
      }
      if (time.startTime > 0) {
        let elapsed = Date.now() - time.startTime;
        time.startTime = null;
        if (time.clockColor === "white") {
          time.wtime = Math.max(0, time.wtime - elapsed);
        } else {
          time.btime = Math.max(0, time.btime - elapsed);
        }
      }
    }

    function startClock() {
      if (game.turn() === "w") {
        time.wtime += time.winc;
        time.clockColor = "white";
      } else {
        time.btime += time.binc;
        time.clockColor = "black";
      }
      time.startTime = Date.now();
      clockTick();
    }

    function setSkillLevel(skill) {
      const level = skillLevels[skill];
      time.depth = level.depth;
      uciCmd("setoption name Skill Level value " + level.skill);
      uciCmd(
        "setoption name Skill Level Maximum Error value " + level.maximumError
      );
      uciCmd(
        "setoption name Skill Level Probability value " + level.errorProbability
      );
    }

    function getGameHistory() {
      const history = game.history();
      return history;
    }

    function get_moves() {
      let moves = "";
      let history = game.history({ verbose: true });

      for (let i = 0; i < history.length; ++i) {
        let move = history[i];
        moves +=
          " " + move.from + move.to + (move.promotion ? move.promotion : "");
      }

      return moves;
    }

    const prepareMove = () => {
      stopClock();
      let turn = game.turn() === "w" ? "white" : "black";
      if (!game.game_over()) {
        // if (turn === playerColor) {
        if (turn !== playerColor) {
          // playerColor = playerColor === 'white' ? 'black' : 'white';
          uciCmd("position startpos moves" + get_moves());
          uciCmd("position startpos moves" + get_moves(), evaler);
          uciCmd("eval", evaler);

          if (time && time.wtime) {
            uciCmd(
              "go " +
                (time.depth ? "depth " + time.depth : "") +
                " wtime " +
                time.wtime +
                " winc " +
                time.winc +
                " btime " +
                time.btime +
                " binc " +
                time.binc
            );
          } else {
            uciCmd("go " + (time.depth ? "depth " + time.depth : ""));
          }
        } else {
          this.handleChangeMoves(this.engine.getGameHistory(), game.turn());
        }
        if (game.history().length >= 2 && !time.depth && !time.nodes) {
          startClock();
        }
      } else {
        if (turn === this.side[0]) {
          this.onOpponentWin();
        } else {
          this.onYourWin();
        }
      }
    };

    evaler.onmessage = function (event) {
      let line;

      if (event && typeof event === "object") {
        line = event.data;
      } else {
        line = event;
      }

      // console.log('evaler: ' + line);

      /// Ignore some output.
      if (
        line === "uciok" ||
        line === "readyok" ||
        line.substr(0, 11) === "option name"
      ) {
        return;
      }
    };

    engine.onmessage = (event) => {
      let line;

      if (event && typeof event === "object") {
        line = event.data;
      } else {
        line = event;
      }
      // console.log('Reply: ' + line);
      if (line === "uciok") {
        engineStatus.engineLoaded = true;
      } else if (line === "readyok") {
        engineStatus.engineReady = true;
      } else {
        let match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/);
        /// Did the AI move?
        if (match) {
          // isEngineRunning = false;
          game.move({ from: match[1], to: match[2], promotion: match[3] });
          this.setState({ fen: game.fen() });
          prepareMove();
          uciCmd("eval", evaler);
          //uciCmd("eval");
          /// Is it sending feedback?
        } else if (
          (match = line.match(/^info .*\bdepth (\d+) .*\bnps (\d+)/))
        ) {
          engineStatus.search = "Depth: " + match[1] + " Nps: " + match[2];
        }

        /// Is it sending feed back with a score?
        if ((match = line.match(/^info .*\bscore (\w+) (-?\d+)/))) {
          let score = parseInt(match[2], 10) * (game.turn() === "w" ? 1 : -1);
          /// Is it measuring in centipawns?
          if (match[1] === "cp") {
            engineStatus.score = (score / 100.0).toFixed(2);
            /// Did it find a mate?
          } else if (match[1] === "mate") {
            engineStatus.score = "Mate in " + Math.abs(score);
          }

          /// Is the score bounded?
          if ((match = line.match(/\b(upper|lower)bound\b/))) {
            engineStatus.score =
              ((match[1] === "upper") === (game.turn() === "w")
                ? "<= "
                : ">= ") + engineStatus.score;
          }
        }
      }
      // displayStatus();
    };

    return {
      start: function () {
        uciCmd("ucinewgame");
        uciCmd("isready");
        engineStatus.engineReady = false;
        engineStatus.search = null;
        prepareMove();
        announced_game_over = false;
      },
      prepareMove: function () {
        prepareMove();
      },
      getGameHistory: function () {
        return getGameHistory();
      },
    };
  };

  render() {
    const { fen, draggable } = this.state;
    return this.props.children({
      position: fen,
      onDrop: this.onDrop,
      draggable: draggable,
    });
  }
}

var skillLevels = {
  1: {
    skill: 1,
    depth: 1,
    mintime: 100,
    maxtime: 500,
    confidence: 10,
    maximumError: 350,
    errorProbability: 20,
  },
  2: {
    skill: 2,
    depth: 2,
    mintime: 150,
    maxtime: 750,
    confidence: 20,
    maximumError: 250,
    errorProbability: 40,
  },
  3: {
    skill: 4,
    depth: 4,
    mintime: 200,
    maxtime: 1e3,
    confidence: 30,
    maximumError: 200,
    errorProbability: 60,
  },
  4: {
    skill: 8,
    depth: 5,
    mintime: 250,
    maxtime: 1200,
    confidence: 40,
    maximumError: 170,
    errorProbability: 70,
  },
  5: {
    skill: 10,
    depth: 8,
    mintime: 275,
    maxtime: 1500,
    confidence: 50,
    maximumError: 130,
    errorProbability: 80,
  },
  6: {
    skill: 12,
    depth: 8,
    mintime: 300,
    maxtime: 2e3,
    confidence: 60,
    maximumError: 80,
    errorProbability: 90,
  },
  7: {
    skill: 14,
    depth: 8,
    mintime: 325,
    maxtime: 2500,
    confidence: 70,
    maximumError: 60,
    errorProbability: 100,
  },
  8: {
    skill: 16,
    depth: 9,
    mintime: 350,
    maxtime: 3e3,
    confidence: 80,
    maximumError: 30,
    errorProbability: 110,
  },
  9: {
    skill: 18,
    depth: 9,
    mintime: 375,
    maxtime: 3450,
    confidence: 90,
    maximumError: 20,
    errorProbability: 115,
  },
  10: {
    skill: 20,
    depth: 10,
    mintime: 200,
    maxtime: 4e3,
    confidence: 200,
    maximumError: 0,
    errorProbability: 124,
  },
};

export default Stockfish;
