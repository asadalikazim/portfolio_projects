package com.kgc.su.features.puzzleFinish.sudoku

import android.os.Bundle

sealed class SudokuViewInput{
    data class InitialSetup (val puzzleFinishBundle: Bundle): SudokuViewInput()
    object DoneButtonClicked: SudokuViewInput()
    object PlayAgainButtonClicked: SudokuViewInput()
}

sealed class SudokuViewResult{
    data class InitialSetup (
        val headerStringRes: Int,
        val footerStringRes: Int,
        val isUserSolved: Boolean = false,
        val userScore: String = "",
        val bonusDiff: String = "",
        val bonusHint: String = "",
        val gameScore: String = ""
    ): SudokuViewResult()
    data class MakeToast(val toast: String) : SudokuViewResult()
    object DoneButtonClicked: SudokuViewResult()
    object PlayAgainButtonClicked: SudokuViewResult()
}