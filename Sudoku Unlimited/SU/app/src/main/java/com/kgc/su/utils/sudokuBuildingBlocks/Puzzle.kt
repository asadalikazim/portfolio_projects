package com.kgc.su.utils.sudokuBuildingBlocks

class Puzzle {
    /** the board */
    lateinit var board: Array<Array<Cell>>

    fun serialize() : String {
        var values = ""
        var hints = ""
        for (row in 0..8) {
            for (col in 0..8) {
                values += board[row][col].value
                hints += if (board[row][col].isHint) "1" else "0"
            }
        }
        return values + hints
    }

    class Builder {
        fun build() : Puzzle {
            val puzzle = Puzzle()
            puzzle.board = Array(9) { Array(9) { Cell() } }
            return puzzle
        }

        fun deserialize(serialized: String) : Puzzle {
            val puzzle = Puzzle()
            puzzle.board = Array(9) { Array(9) { Cell() } }

            val values = serialized.substring(0,81)
            val hints = serialized.substring(81)

            for (row in 0..8) {
                for (col in 0..8) {
                    puzzle.board[row][col].value = values[row * 9 + col].toString()
                    if (hints[row * 9 + col].toString() == "1") {
                        puzzle.board[row][col].isHint = true
                        puzzle.board[row][col].input = puzzle.board[row][col].value
                    }
                }
            }

            return puzzle
        }
    }
}