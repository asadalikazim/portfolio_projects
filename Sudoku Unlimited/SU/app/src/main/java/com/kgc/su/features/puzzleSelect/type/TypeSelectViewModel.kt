package com.kgc.su.features.puzzleSelect.type

import android.os.Bundle
import androidx.core.os.bundleOf
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.kgc.su.utils.PuzzleBuilder
import com.kgc.su.utils.BUNDLE.BUNDLE_DIFF
import com.kgc.su.utils.BUNDLE.BUNDLE_TYPE
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject

@HiltViewModel
class TypeSelectViewModel @Inject constructor() : ViewModel() {

    private val _result = MutableLiveData<TypeSelectViewResult>()
    val result : LiveData<TypeSelectViewResult> = _result

    private lateinit var puzzleDiff: PuzzleBuilder.PuzzleDiff
    private lateinit var puzzleType: PuzzleBuilder.PuzzleType

    private fun applyResult(result: TypeSelectViewResult){
        _result.value = result
    }

    fun processInputs(input: TypeSelectViewInput){
        when(input){
            is TypeSelectViewInput.InitialSetup -> initialSetup(input.difficultyBundle)
            is TypeSelectViewInput.NextClicked -> nextClicked()
            else -> typeSwitched(newType = input)
        }
    }

    private fun initialSetup(difficultyBundle: Bundle){
        puzzleDiff = difficultyBundle.get(BUNDLE_DIFF) as PuzzleBuilder.PuzzleDiff
        puzzleType = PuzzleBuilder.PuzzleType.CLASSIC
        applyResult(TypeSelectViewResult.ClassicClicked)
    }

    private fun typeSwitched(newType: TypeSelectViewInput){
        when (newType){
            is TypeSelectViewInput.ClassicClicked -> {
                puzzleType = PuzzleBuilder.PuzzleType.CLASSIC
                applyResult(TypeSelectViewResult.ClassicClicked)
            }
            is TypeSelectViewInput.XClicked -> {
                puzzleType = PuzzleBuilder.PuzzleType.X
                applyResult(TypeSelectViewResult.XClicked)
            }
            is TypeSelectViewInput.DotsClicked -> {
                puzzleType = PuzzleBuilder.PuzzleType.DOTS
                applyResult(TypeSelectViewResult.DotsClicked)
            }
            is TypeSelectViewInput.KnightsMoveClicked -> {
                puzzleType = PuzzleBuilder.PuzzleType.KNIGHTSMOVE
                applyResult(TypeSelectViewResult.KnightsMoveClicked)
            }
            else -> TODO()
        }
    }

    private fun nextClicked(){
        applyResult(TypeSelectViewResult.NextClicked(
            bundleOf(Pair(BUNDLE_DIFF, puzzleDiff), Pair(BUNDLE_TYPE, puzzleType))))
    }
}