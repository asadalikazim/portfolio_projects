package com.kgc.su.utils.sudokuGenerator

import com.kgc.su.utils.*
import com.kgc.su.utils.sudokuBuildingBlocks.*

open class Classic(private var numberOfHints: Int) {
    protected lateinit var puzzle: Puzzle
    private var numberOfResets: Int = 0
    private var lastReset: Int = RESET_LEVEL_3 //RESET_LEVEL_3 marks the fact that the entire board is completely empty

    /** need to be implemented as per each puzzle class logic requirements */
    protected open fun findValueCustom(listOfRejections: MutableList<String>, row: Int, col: Int): MutableList<String> {
        return listOfRejections
    }

    protected open fun canBeCleared(row: Int, col: Int): Boolean {
        return true
    }

    protected open fun populateSpecialCells(): PuzzleBuilder.PuzzleResult {
        return PuzzleBuilder.PuzzleResult.BuildComplete
    }

    protected open fun canBeSetHint(row: Int, col: Int): Boolean {
        return true
    }

    /** general logic */
    /** public call */
    fun createPuzzle() : String {
        /** get board instance */
        buildBoard()

        /** build puzzle */
        var result = populatePuzzle()
        while (result is PuzzleBuilder.PuzzleResult.BoardSalvaged) {
            result = populatePuzzle(startingRow = result.startingRow)
        }

        /** board is ready at this point */
        setHints()
        return puzzle.serialize()
    }

    /** private functions */
    private fun buildBoard() {
        puzzle = Puzzle.Builder().build()
    }

    private fun populatePuzzle(startingRow: Int = 0, startingCol: Int = 0): PuzzleBuilder.PuzzleResult {
        if (lastReset == RESET_LEVEL_3) {
            var result = populateSpecialCells()
            while (result is PuzzleBuilder.PuzzleResult.BoardSalvaged) {
                result = populateSpecialCells()
            }
        }

        var row = startingRow
        /** go through all rows */
        while (row < 9){
            var col = startingCol
            /** go through all columns */
            while (col < 9){
                /** if value not already set */
                if (puzzle.board[row][col].value == EMPTY_CELL_VALUE){
                    /** try to find a value */
                    val value = findValue(row, col)
                    if (value != EMPTY_CELL_VALUE){
                        /** found value, input it */
                        puzzle.board[row][col].value = value
                    } else {
                        /** could not find value, salvage board, nothing more to do here */
                        return salvageBoard(row)
                    }
                }
                col++
            }
            row++
        }
        /** if we reach this point, puzzle is ready */
        return PuzzleBuilder.PuzzleResult.BuildComplete
    }

    protected fun findValue(row: Int, col: Int): String {
        var listOfRejections = mutableListOf<String>()

        /** all values in same row are rejected */
        for (i in 0..8) listOfRejections.add(puzzle.board[row][i].value)
        /** all values in same col are rejected */
        for (j in 0..8) listOfRejections.add(puzzle.board[j][col].value)

        /** all values in same three by three grid are rejected */
        val rowStart = findGridRowStart(row)
        val colStart = findGridColStart(col)
        for (i in 0..2){
            for (j in 0..2){
                listOfRejections.add(puzzle.board[rowStart + i][colStart + j].value)
            }
        }

        /** custom logic for each puzzle type */
        listOfRejections = findValueCustom(listOfRejections, row, col)

        /** get possibilities */
        val listOfPossibilities = cleanListOfNine(listOfRejections)

        /** return zero if no possibilities, else a random possibility */
        return if (listOfPossibilities.isEmpty()) EMPTY_CELL_VALUE else listOfPossibilities.random()
    }

    private fun salvageBoard(row: Int): PuzzleBuilder.PuzzleResult.BoardSalvaged {
        /** determine number of rows to reset, handle numberOfResets */
        val resetLevel: Int = when(numberOfResets){
            MAX_RESETS -> {
                numberOfResets = 0
                lastReset = RESET_LEVEL_3
                RESET_LEVEL_3
            }
            else -> {
                numberOfResets += 1
                when (lastReset){
                    RESET_LEVEL_0 -> {lastReset = RESET_LEVEL_1; RESET_LEVEL_1}
                    RESET_LEVEL_1 -> {lastReset = RESET_LEVEL_2; RESET_LEVEL_2}
                    RESET_LEVEL_2 -> {lastReset = RESET_LEVEL_0; RESET_LEVEL_0}
                    else -> {lastReset = RESET_LEVEL_0; RESET_LEVEL_0}
                }
            }
        }

        /** reset rows, return salvage result */
        return PuzzleBuilder.PuzzleResult.BoardSalvaged(startingRow = deleteRows(startingRow = row, resetLevel = resetLevel))
    }

    /** returns the row to start from again*/
    protected fun deleteRows(startingRow: Int = 0, resetLevel: Int): Int {
         return if (resetLevel != RESET_LEVEL_3){
            /** not whole board needs to be scrapped, take care about clearing special cells */
            var row = startingRow
            var numberOfRowsToReset = resetLevel

            while (numberOfRowsToReset > 0 && row > -1) {
                /** reset values for entire row */
                for (col in 0..8){
                    if (canBeCleared(row = row, col = col)) puzzle.board[row][col].value = EMPTY_CELL_VALUE
                }
                numberOfRowsToReset--
                row--
            }
            if (row < 0) 0 else row
        } else {
            /** whole board needs to be scrapped */
            for (row in 0..8){
                for (col in 0..8){
                    puzzle.board[row][col].value = EMPTY_CELL_VALUE
                }
            }
            0
        }
    }

    private fun setHints() {
        var hintsSet = 0
        while (hintsSet < numberOfHints){
            val row = (0..8).random()
            val col = (0..8).random()
            if (!puzzle.board[row][col].isHint && canBeSetHint(row, col)){
                puzzle.board[row][col].isHint = true
                hintsSet++
            }
        }
    }

    companion object {
        const val RESET_LEVEL_0 = 2
        const val RESET_LEVEL_1 = 4
        const val RESET_LEVEL_2 = 6
        const val RESET_LEVEL_3 = 9
        const val MAX_RESETS = 21000
    }
}