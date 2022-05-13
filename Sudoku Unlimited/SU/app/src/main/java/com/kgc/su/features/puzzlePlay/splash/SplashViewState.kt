package com.kgc.su.features.puzzlePlay.splash

import android.os.Bundle

sealed class SplashViewInput{
    data class InitialSetup(val typeAndDifficultyBundle: Bundle): SplashViewInput()
    object CancelClicked: SplashViewInput()
}

sealed class SplashViewResult{
    data class NavToSudoku(val puzzleBundle: Bundle): SplashViewResult()
    object CancelClicked: SplashViewResult()
}