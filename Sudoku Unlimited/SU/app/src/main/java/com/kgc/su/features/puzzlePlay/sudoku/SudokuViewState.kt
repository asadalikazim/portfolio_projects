package com.kgc.su.features.puzzlePlay.sudoku

import android.os.Bundle
import com.kgc.su.utils.ACTIONS

sealed class SudokuViewInput {
    data class InitialSetup(val puzzleBundle: Bundle): SudokuViewInput()
    data class BoardButtonClicked(val row: Int, val col: Int): SudokuViewInput()
    data class InputButtonClicked(val userInput: String): SudokuViewInput()
    data class ActionButtonClicked(val action: ACTIONS): SudokuViewInput()
    data class Finish(val userSolved: Boolean): SudokuViewInput()
}

sealed class SudokuViewResult {
    data class InitialSetup(val headerStringRes: Int): SudokuViewResult()
    data class BoardButtonClicked(val old: Pair<Int,Int>, val new: Pair<Int, Int>): SudokuViewResult()
    data class InputButtonClicked(val cellAffected: Pair<Int,Int>): SudokuViewResult()
    data class ActionButtonClicked(val action: ACTIONS, val cellAffected: Pair<Int,Int> = Pair(0,0), val isToast: Boolean = false, val toast: String = ""): SudokuViewResult()
    data class Finish(val puzzleFinishBundle: Bundle): SudokuViewResult()
}