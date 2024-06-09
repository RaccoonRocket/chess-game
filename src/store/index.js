import { createStore } from 'vuex'

export default createStore({
  state: {
    board: [
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
      ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
      ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']
    ],
    currentPlayer: 'white',
    selectPiece: null,
    gameOver: false,
    moveHistory: []
  },
  getters: {
    getBoard: (state) => state.board,
    getCurrentPlayer: (state) => state.currentPlayer,
    getMoveHistory: (state) => state.moveHistory,
  },
  mutations: {
    SET_BOARD (state, board) {
      state.board = board
    },
    MOVE_PIECE (state, { from, to }) {
      const piece = state.board[from.row][from.col]
      state.board[from.row][from.col] = ''
      state.board[to.row][to.col] = piece
      state.moveHistory.push([...state.board])
    },
    SWITCH_PLAYER (state) {
      state.currentPlayer = state.currentPlayer === 'black' ? 'white' : 'black'
    }
  },
  actions: {
    initBoard ({ commit }) {
      const initialBoard = [
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']
      ]
      commit('SET_BOARD', initialBoard)
    },
    movePiece ({ commit, state }, move) {
      function isValidMove (board, from, to) {
        if (board[from.row][from.col] !== '' && board[to.row][to.col] === '') {
          return true
        }
        return false
      }
      if (isValidMove(state.board, move.from, move.to)) {
        commit('MOVE_PIECE', { from: move.from, to: move.to })
        commit('SWITCH_PLAYER')
      } else {
        console.log('Invalid move!')
      }
    }
  },
  modules: {
  }
})
