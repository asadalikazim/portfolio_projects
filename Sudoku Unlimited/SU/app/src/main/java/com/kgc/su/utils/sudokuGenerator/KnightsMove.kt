package com.kgc.su.utils.sudokuGenerator

import com.kgc.su.utils.listOfKnightsMove

class KnightsMove(numberOfHints: Int) : Classic(numberOfHints) {

    override fun findValueCustom(listOfRejections: MutableList<String>, row: Int, col: Int): MutableList<String> {
        /** all values at knights moves are also rejected */
        val listOfKnightsMove = listOfKnightsMove(row = row, col = col)
        for (pair in listOfKnightsMove) {
            listOfRejections.add(puzzle.board[pair.first][pair.second].value)
        }
        return listOfRejections
    }
}