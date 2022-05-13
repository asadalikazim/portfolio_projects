package com.kgc.su.utils.sudokuGenerator

import com.kgc.su.utils.EMPTY_CELL_VALUE
import com.kgc.su.utils.PuzzleBuilder
import com.kgc.su.utils.listOfDots

class Dots(numberOfHints: Int) : Classic(numberOfHints) {

    override fun findValueCustom(listOfRejections: MutableList<String>, row: Int, col: Int): MutableList<String> {
        /** if cell is a dot, then those values are also rejected */
        val listOfDots = listOfDots()
        if (listOfDots.contains(Pair(row,col))) {
            for (pair in listOfDots) {
                listOfRejections.add(puzzle.board[pair.first][pair.second].value)
            }
        }
        return listOfRejections
    }

    override fun canBeCleared(row: Int, col: Int): Boolean {
        return Pair(row, col) !in listOfDots()
    }

    override fun populateSpecialCells(): PuzzleBuilder.PuzzleResult {
        for (cell in listOfDots()){
            val value = findValue(cell.first, cell.second)
            if (value != EMPTY_CELL_VALUE) {
                puzzle.board[cell.first][cell.second].value = value
            } else {
                deleteRows(resetLevel = RESET_LEVEL_3)
                return PuzzleBuilder.PuzzleResult.BoardSalvaged()
            }
        }
        return PuzzleBuilder.PuzzleResult.BuildComplete
    }

    override fun canBeSetHint(row: Int, col: Int): Boolean {
        if (Pair(row,col) in listOfDots()) {
            return listOf(0,1,2,3,4,5,6,7,8,9).random() < 2
        }
        return true
    }
}