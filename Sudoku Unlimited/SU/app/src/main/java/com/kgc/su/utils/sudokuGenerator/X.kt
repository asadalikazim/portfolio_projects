package com.kgc.su.utils.sudokuGenerator

import com.kgc.su.utils.EMPTY_CELL_VALUE
import com.kgc.su.utils.PuzzleBuilder
import com.kgc.su.utils.listOfX

class X(numberOfHints: Int) : Classic(numberOfHints) {

    override fun findValueCustom(listOfRejections: MutableList<String>, row: Int, col: Int): MutableList<String> {
        /** if cell is on the major diagonal, those values are rejected as well */
        if (row == col) {
            for (i in 0..8) {
                listOfRejections.add(puzzle.board[i][i].value)
            }
        }
        /** if cell is on the minor diagonal, those values aer rejected as well */
        if (row + col == 8) {
            for (i in 0..8) {
                listOfRejections.add(puzzle.board[i][8 - i].value)
            }
        }
        return listOfRejections
    }

    override fun canBeCleared(row: Int, col: Int): Boolean {
        return Pair(row, col) !in listOfX()
    }

    override fun populateSpecialCells(): PuzzleBuilder.PuzzleResult {
        for (i in 0..8){
            val valueMajor = findValue(i,i)
            if (valueMajor != EMPTY_CELL_VALUE) {
                puzzle.board[i][i].value = valueMajor
            } else {
                deleteRows(resetLevel = RESET_LEVEL_3)
                return PuzzleBuilder.PuzzleResult.BoardSalvaged()
            }

            val valueMinor = findValue(i,8 - 1)
            if (valueMinor != EMPTY_CELL_VALUE) {
                puzzle.board[i][8-i].value = valueMinor
            } else {
                deleteRows(resetLevel = RESET_LEVEL_3)
                return PuzzleBuilder.PuzzleResult.BoardSalvaged()
            }
        }
        return PuzzleBuilder.PuzzleResult.BuildComplete
    }

    override fun canBeSetHint(row: Int, col: Int): Boolean {
        if (Pair(row,col) in listOfX()) {
            return listOf(0,1,2,3,4,5,6,7,8,9).random() < 2
        }
        return true
    }
}