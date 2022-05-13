package com.kgc.su.features.puzzleSelect.difficulty

import android.os.Bundle

sealed class DifficultySelectViewInput{
    object InitialSetup: DifficultySelectViewInput()
    object EasyClicked: DifficultySelectViewInput()
    object MediumClicked: DifficultySelectViewInput()
    object HardClicked: DifficultySelectViewInput()
    object NextClicked: DifficultySelectViewInput()
}

sealed class DifficultySelectViewResult{
    object EasyClicked: DifficultySelectViewResult()
    object MediumClicked: DifficultySelectViewResult()
    object HardClicked: DifficultySelectViewResult()
    data class NextClicked(val difficultyBundle: Bundle): DifficultySelectViewResult()
}