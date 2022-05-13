package com.kgc.su.features.puzzlePlay.sudoku

import android.os.Bundle
import androidx.core.os.bundleOf
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.kgc.su.R
import com.kgc.su.utils.*
import com.kgc.su.utils.BUNDLE.BUNDLE_BONUS_DIFF
import com.kgc.su.utils.BUNDLE.BUNDLE_BONUS_HINT
import com.kgc.su.utils.BUNDLE.BUNDLE_DIFF
import com.kgc.su.utils.BUNDLE.BUNDLE_GAME_SCORE
import com.kgc.su.utils.BUNDLE.BUNDLE_PUZZ
import com.kgc.su.utils.BUNDLE.BUNDLE_TYPE
import com.kgc.su.utils.BUNDLE.BUNDLE_USER_SCORE
import com.kgc.su.utils.BUNDLE.BUNDLE_USER_SOLVE
import com.kgc.su.utils.CONSTANT_HINTS.EASY_HINTS
import com.kgc.su.utils.CONSTANT_HINTS.HARD_HINTS
import com.kgc.su.utils.CONSTANT_HINTS.MEDIUM_HINTS
import com.kgc.su.utils.sudokuBuildingBlocks.Puzzle
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.*
import javax.inject.Inject
import kotlin.math.pow

@HiltViewModel
class SudokuViewModel @Inject constructor(): ViewModel() {

    /** puzzle stuff */
    lateinit var puzzle: Puzzle
    lateinit var puzzleDiff: PuzzleBuilder.PuzzleDiff// = PuzzleBuilder.PuzzleDiff.NULL
    lateinit var puzzleType: PuzzleBuilder.PuzzleType// = PuzzleBuilder.PuzzleType.NULL

    /** board or input button clicked */
    private var lastBoardButtonClicked: Pair<Int, Int> = Pair(-1,-1)

    /** score stuff */
    private var timeStart: Long = 0
    private var userScore: Int = 0
    private var bonusHint: Int = 0
    private var bonusDiff: Int = 0
    private var gameScore: Int = 0

    /** action button clicked */
    private lateinit var hintJob: Job
    private var hintsRemaining = -1
    private var availableHint = false
    private var availableReset = false
    private var availableSolve = false

    private val _result = MutableLiveData<SudokuViewResult>()
    val result: LiveData<SudokuViewResult> = _result

    private fun applyResult(result: SudokuViewResult) {
        _result.value = result
    }

    fun processInputs(input: SudokuViewInput) {
        when (input) {
            is SudokuViewInput.InitialSetup -> initialSetup(puzzleBundle = input.puzzleBundle)
            is SudokuViewInput.BoardButtonClicked -> boardButtonClicked(row = input.row, col = input.col)
            is SudokuViewInput.InputButtonClicked -> inputButtonClicked(userInput = input.userInput)
            is SudokuViewInput.ActionButtonClicked -> actionButtonClicked(action = input.action)
            is SudokuViewInput.Finish -> puzzleFinish(userSolved = input.userSolved)
        }
    }

    private fun initialSetup(puzzleBundle: Bundle) {
        puzzleDiff = puzzleBundle.get(BUNDLE_DIFF) as PuzzleBuilder.PuzzleDiff
        puzzleType = puzzleBundle.get(BUNDLE_TYPE) as PuzzleBuilder.PuzzleType
        puzzle = Puzzle.Builder().deserialize(puzzleBundle.get(BUNDLE_PUZZ) as String)

        var headerStringRes = 0

        when (puzzleDiff) {
            PuzzleBuilder.PuzzleDiff.EASY -> { hintsRemaining = EASY_HINTS; headerStringRes = R.string.rka_frag_tab_easy; }
            PuzzleBuilder.PuzzleDiff.MEDIUM -> { hintsRemaining = MEDIUM_HINTS; headerStringRes = R.string.rka_frag_tab_medium; }
            PuzzleBuilder.PuzzleDiff.HARD -> { hintsRemaining = HARD_HINTS; headerStringRes = R.string.rka_frag_tab_hard; }
        }

        timeStart = System.currentTimeMillis()/1000

        applyResult(SudokuViewResult.InitialSetup(headerStringRes = headerStringRes))
    }

    private fun boardButtonClicked(row: Int, col: Int) {
        if (!puzzle.board[row][col].isHint) {
            val old = if (lastBoardButtonClicked.first != -1) lastBoardButtonClicked else Pair(row, col)
            lastBoardButtonClicked = Pair(row, col)
            applyResult(SudokuViewResult.BoardButtonClicked(old = old, new = lastBoardButtonClicked))
        }
    }

    private fun inputButtonClicked(userInput: String) {
        if (lastBoardButtonClicked.first != -1) {
            puzzle.board[lastBoardButtonClicked.first][lastBoardButtonClicked.second].input = userInput
            applyResult(SudokuViewResult.InputButtonClicked(lastBoardButtonClicked))
        }
    }

    private fun actionButtonClicked(action: ACTIONS) {
        when (action) {
            ACTIONS.HINT -> {
                if (hintsRemaining <= 0) {
                    applyResult(SudokuViewResult.ActionButtonClicked(action = ACTIONS.HINT, isToast = true, toast = "No more hints available!"))
                } else if (!availableHint) {
                    availableHint = true
                    applyResult(SudokuViewResult.ActionButtonClicked(action = ACTIONS.HINT, isToast = true, toast = "Click again within 10 seconds to confirm"))
                    hintJob = viewModelScope.launch(Dispatchers.IO) { delay(10000); if (isActive) availableHint = false }
                } else {
                    viewModelScope.launch(Dispatchers.IO) { hintJob.cancelAndJoin() }
                    availableHint = false
                    hintsRemaining -= 1

                    var row = (0..8).random()
                    var col = (0..8).random()

                    with (puzzle) {
                        while (board[row][col].isHint) {
                            row = (0..8).random()
                            col = (0..8).random()
                        }
                        board[row][col].isHint = true
                        board[row][col].input =  board[row][col].value
                    }

                    applyResult(SudokuViewResult.ActionButtonClicked(action = ACTIONS.HINT, cellAffected = Pair(row,col)))
                }
            }
            ACTIONS.RESET -> {
                if (!availableReset) {
                    availableReset = true
                    applyResult(SudokuViewResult.ActionButtonClicked(action = ACTIONS.RESET, isToast = true, toast = "Click again within 10 seconds to confirm"))
                    viewModelScope.launch(Dispatchers.IO) { delay(10000); availableReset = false }
                } else {
                    availableReset = false

                    with (puzzle) {
                        for (row in 0..8) {
                            for (col in 0..8) {
                                board[row][col].input = if (board[row][col].isHint) board[row][col].value else EMPTY_CELL_INPUT
                            }
                        }
                    }

                    applyResult(SudokuViewResult.ActionButtonClicked(action = ACTIONS.RESET))
                }
            }
            ACTIONS.CHECK -> {
                with (puzzle) {
                    for (row in 0..8) {
                        for (col in 0..8) {
                            if (board[row][col].value != board[row][col].input) {
                                applyResult(SudokuViewResult.ActionButtonClicked(action = ACTIONS.CHECK, isToast = true, toast = "That doesn't look quite right!"))
                                return@with
                            }
                        }
                    }
                    //user successfully solved puzzle
                    applyResult(SudokuViewResult.ActionButtonClicked(action = ACTIONS.CHECK))
                }

            }
            ACTIONS.SOLVE -> {
                if (!availableSolve) {
                    availableSolve = true
                    applyResult(SudokuViewResult.ActionButtonClicked(action = ACTIONS.SOLVE, isToast = true, toast = "Click again within 10 seconds to confirm"))
                    viewModelScope.launch(Dispatchers.IO) { delay(10000); availableSolve = false }
                } else {
                    applyResult(SudokuViewResult.ActionButtonClicked(action = ACTIONS.SOLVE))
                }
            }
        }
    }

    private fun puzzleFinish(userSolved: Boolean) {
        if (userSolved) {
            userScore = getScore()
            bonusDiff = when (puzzleDiff) {
                PuzzleBuilder.PuzzleDiff.EASY -> CONSTANT_BONUS_DIFF.EASY_BONUS
                PuzzleBuilder.PuzzleDiff.MEDIUM -> CONSTANT_BONUS_DIFF.MEDIUM_BONUS
                PuzzleBuilder.PuzzleDiff.HARD -> CONSTANT_BONUS_DIFF.HARD_BONUS
                else -> 0
            }
            bonusHint = hintsRemaining * CONSTANT_BONUS_HINT.BONUS
            gameScore = userScore + bonusDiff + bonusHint
        }

        val puzzleFinishBundle = bundleOf(
            Pair(BUNDLE_DIFF, puzzleDiff),
            Pair(BUNDLE_TYPE, puzzleType),
            Pair(BUNDLE_PUZZ, puzzle.serialize()),
            Pair(BUNDLE_USER_SOLVE, userSolved),
            Pair(BUNDLE_USER_SCORE, userScore),
            Pair(BUNDLE_BONUS_DIFF, bonusDiff),
            Pair(BUNDLE_BONUS_HINT, bonusHint),
            Pair(BUNDLE_GAME_SCORE, gameScore)
        )
        applyResult(SudokuViewResult.Finish(puzzleFinishBundle = puzzleFinishBundle))
    }

    private fun getScore(): Int {
        val timeTaken = (System.currentTimeMillis()/1000) - timeStart
        val score = (20000) / (1 + ( (timeTaken + 360) / 50 ).toDouble().pow(1.5) )

        return score.toInt()
    }
}