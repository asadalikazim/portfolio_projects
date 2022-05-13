package com.kgc.su.features.puzzleFinish.sudoku

import android.os.Bundle
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.kgc.su.R
import com.kgc.su.repo.Repo
import com.kgc.su.utils.BUNDLE
import com.kgc.su.utils.PuzzleBuilder
import com.kgc.su.utils.sudokuBuildingBlocks.Puzzle
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class SudokuViewModel @Inject constructor(val repo: Repo): ViewModel() {

    /** puzzle stuff */
    lateinit var puzzle: Puzzle
    lateinit var puzzleDiff: PuzzleBuilder.PuzzleDiff// = PuzzleBuilder.PuzzleDiff.NULL
    lateinit var puzzleType: PuzzleBuilder.PuzzleType// = PuzzleBuilder.PuzzleType.NULL
    private var userSolved: Boolean = false
    private var userScored: Int = 0
    private var bonusDiff: Int = 0
    private var bonusHint: Int = 0
    private var gameScore: Int = 0

    private val _result = MutableLiveData<SudokuViewResult>()
    val result: LiveData<SudokuViewResult> = _result

    private fun applyResult (result: SudokuViewResult) {
        _result.postValue(result)
    }

    fun processInputs(input: SudokuViewInput) {
        when (input) {
            is SudokuViewInput.InitialSetup -> initialSetup(puzzleFinishBundle = input.puzzleFinishBundle)
            is SudokuViewInput.DoneButtonClicked -> applyResult(SudokuViewResult.DoneButtonClicked)
            is SudokuViewInput.PlayAgainButtonClicked -> applyResult(SudokuViewResult.PlayAgainButtonClicked)
        }
    }

    private fun initialSetup(puzzleFinishBundle: Bundle) {
        puzzle = Puzzle.Builder().deserialize(puzzleFinishBundle.get(BUNDLE.BUNDLE_PUZZ) as String)
        puzzleDiff = puzzleFinishBundle.get(BUNDLE.BUNDLE_DIFF) as PuzzleBuilder.PuzzleDiff
        puzzleType = puzzleFinishBundle.get(BUNDLE.BUNDLE_TYPE) as PuzzleBuilder.PuzzleType
        userSolved = puzzleFinishBundle.get(BUNDLE.BUNDLE_USER_SOLVE) as Boolean
        userScored = puzzleFinishBundle.get(BUNDLE.BUNDLE_USER_SCORE) as Int
        bonusDiff  = puzzleFinishBundle.get(BUNDLE.BUNDLE_BONUS_DIFF) as Int
        bonusHint  = puzzleFinishBundle.get(BUNDLE.BUNDLE_BONUS_HINT) as Int
        gameScore = puzzleFinishBundle.get(BUNDLE.BUNDLE_GAME_SCORE) as Int

        if (userSolved) {
            applyResult(SudokuViewResult.InitialSetup(
                headerStringRes = R.string.pfa_solved_frag_label_top_sentence,
                footerStringRes = R.string.pfa_solved_frag_label_bottom_sentence,
                isUserSolved = true,
                userScore = userScored.toString(),
                bonusDiff = bonusDiff.toString(),
                bonusHint = bonusHint.toString(),
                gameScore = gameScore.toString()
            ))
            repoActions()
        } else {
            applyResult(SudokuViewResult.InitialSetup(
                headerStringRes = R.string.pfa_solution_frag_label_top_sentence,
                footerStringRes = R.string.pfa_solution_frag_label_bottom_sentence))
        }
    }

    private fun repoActions() {

        viewModelScope.launch(Dispatchers.IO) {
            delay(2000)
            val signedIn = repo.checkSignedIn() is Repo.RepoResult.PositiveResult

            if (signedIn) {
                when (repo.saveGame(gameScore = gameScore)) {
                    is Repo.RepoResult.PositiveResult -> applyResult(SudokuViewResult.MakeToast(toast = "Game saved successfully!"))
                    is Repo.RepoResult.NegativeResult -> applyResult(SudokuViewResult.MakeToast(toast = "Game saved locally. Go online and sync your profile to back it up!"))
                    is Repo.RepoResult.InternalError -> applyResult(SudokuViewResult.MakeToast(toast = "Internal error. Unable to save game."))
                }
            } else {
                applyResult(SudokuViewResult.MakeToast(toast = "Sign In to save your games!"))
            }
        }
    }
}