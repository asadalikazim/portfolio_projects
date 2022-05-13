package com.kgc.su.utils

import android.os.Bundle
import com.kgc.su.utils.sudokuGenerator.Classic
import com.kgc.su.utils.sudokuGenerator.Dots
import com.kgc.su.utils.sudokuGenerator.KnightsMove
import com.kgc.su.utils.sudokuGenerator.X

object PuzzleBuilder {

    /** helper variables */
    private var puzzleType = PuzzleType.NULL
    private var puzzleDifficulty = PuzzleDiff.NULL

    /**
     * public function
     */
    fun build(typeAndDifficultyBundle: Bundle): String {
        puzzleType = typeAndDifficultyBundle.get("puzzleType") as PuzzleType
        puzzleDifficulty = typeAndDifficultyBundle.get("puzzleDifficulty") as PuzzleDiff

        return getPuzzle()
    }

    /**
     * private functions
     */
    private fun getPuzzle(): String {
        return when(puzzleType) {
            PuzzleType.CLASSIC -> Classic(getHints()).createPuzzle()
            PuzzleType.X -> X(getHints()).createPuzzle()
            PuzzleType.DOTS -> Dots(getHints()).createPuzzle()
            PuzzleType.KNIGHTSMOVE -> KnightsMove(getHints()).createPuzzle()
            else -> TODO()
        }
    }

    private fun getHints(): Int {
        return when (puzzleDifficulty) {
            PuzzleDiff.EASY -> (DifficultyHints.LOWER_EASY..DifficultyHints.UPPER_EASY).random()
            PuzzleDiff.MEDIUM -> (DifficultyHints.LOWER_MEDIUM..DifficultyHints.UPPER_MEDIUM).random()
            PuzzleDiff.HARD -> (DifficultyHints.LOWER_HARD..DifficultyHints.UPPER_HARD).random()
            else -> TODO()
        }
    }

    enum class PuzzleType {
        NULL, CLASSIC, X, DOTS, KNIGHTSMOVE
    }

    enum class PuzzleDiff {
        NULL, EASY, MEDIUM, HARD
    }

    sealed class PuzzleResult {
        data class BoardSalvaged(val startingRow: Int = 0): PuzzleResult()
        object BuildComplete: PuzzleResult()
    }

    object DifficultyHints {
        const val LOWER_HARD = 31
        const val UPPER_HARD = 45
        const val LOWER_MEDIUM = 46
        const val UPPER_MEDIUM = 60
        const val LOWER_EASY = 61
        const val UPPER_EASY = 75
    }
}