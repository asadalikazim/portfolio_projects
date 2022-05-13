package com.kgc.su.features.puzzleSelect.difficulty

import androidx.core.os.bundleOf
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.kgc.su.utils.PuzzleBuilder
import com.kgc.su.utils.BUNDLE.BUNDLE_DIFF
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class DifficultySelectViewModel @Inject constructor() : ViewModel() {

    private val _result = MutableLiveData<DifficultySelectViewResult>()
    val result : LiveData<DifficultySelectViewResult> = _result

    private lateinit var puzzleDiff: PuzzleBuilder.PuzzleDiff

    private fun applyResult(result: DifficultySelectViewResult){
        _result.value = result
    }

    fun processInputs(input: DifficultySelectViewInput){
        when(input){
            is DifficultySelectViewInput.InitialSetup -> initialSetup()
            is DifficultySelectViewInput.NextClicked -> nextClicked()
            else -> difficultySwitched(input)
        }
    }

    private fun initialSetup(){
        puzzleDiff = PuzzleBuilder.PuzzleDiff.EASY
        applyResult(DifficultySelectViewResult.EasyClicked)
    }

    private fun difficultySwitched(newDifficulty: DifficultySelectViewInput) {
        when (newDifficulty) {
            is DifficultySelectViewInput.EasyClicked -> {
                puzzleDiff = PuzzleBuilder.PuzzleDiff.EASY
                applyResult(DifficultySelectViewResult.EasyClicked)
            }
            is DifficultySelectViewInput.MediumClicked -> {
                puzzleDiff = PuzzleBuilder.PuzzleDiff.MEDIUM
                applyResult(DifficultySelectViewResult.MediumClicked)
            }
            is DifficultySelectViewInput.HardClicked -> {
                puzzleDiff = PuzzleBuilder.PuzzleDiff.HARD
                applyResult(DifficultySelectViewResult.HardClicked)
            }
            else -> TODO()
        }
    }

    private fun nextClicked(){
        applyResult(DifficultySelectViewResult.NextClicked(bundleOf(Pair(BUNDLE_DIFF, puzzleDiff))))
    }
}