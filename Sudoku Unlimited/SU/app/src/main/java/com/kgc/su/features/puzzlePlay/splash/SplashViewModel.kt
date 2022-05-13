package com.kgc.su.features.puzzlePlay.splash

import android.os.Bundle
import androidx.core.os.bundleOf
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.kgc.su.utils.PuzzleBuilder
import com.kgc.su.utils.BUNDLE.BUNDLE_DIFF
import com.kgc.su.utils.BUNDLE.BUNDLE_PUZZ
import com.kgc.su.utils.BUNDLE.BUNDLE_TYPE
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class SplashViewModel @Inject constructor(): ViewModel() {

    private val _result = MutableLiveData<SplashViewResult>()
    val result : LiveData<SplashViewResult> = _result

    private fun applyResult(result: SplashViewResult){
        _result.postValue(result)
    }

    fun processInputs(input: SplashViewInput){
        when(input){
            is SplashViewInput.InitialSetup -> initialSetup(typeAndDifficultyBundle = input.typeAndDifficultyBundle)
            is SplashViewInput.CancelClicked -> applyResult(SplashViewResult.CancelClicked)
        }
    }

    private fun initialSetup(typeAndDifficultyBundle: Bundle){
        viewModelScope.launch(Dispatchers.IO) {
            val serializedPuzzle = PuzzleBuilder.build(typeAndDifficultyBundle = typeAndDifficultyBundle)
            val puzzleBundle = bundleOf(
                Pair(BUNDLE_DIFF, typeAndDifficultyBundle.get(BUNDLE_DIFF)),
                Pair(BUNDLE_TYPE, typeAndDifficultyBundle.get(BUNDLE_TYPE)),
                Pair(BUNDLE_PUZZ, serializedPuzzle))

            applyResult(SplashViewResult.NavToSudoku(puzzleBundle = puzzleBundle))
        }
    }
}