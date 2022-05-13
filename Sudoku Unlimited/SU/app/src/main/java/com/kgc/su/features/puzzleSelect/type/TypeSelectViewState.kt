package com.kgc.su.features.puzzleSelect.type

import android.os.Bundle

sealed class TypeSelectViewInput{
    data class InitialSetup(val difficultyBundle: Bundle): TypeSelectViewInput()
    object ClassicClicked: TypeSelectViewInput()
    object XClicked: TypeSelectViewInput()
    object DotsClicked: TypeSelectViewInput()
    object KnightsMoveClicked: TypeSelectViewInput()
    object NextClicked: TypeSelectViewInput()
}

sealed class TypeSelectViewResult{
    object ClassicClicked: TypeSelectViewResult()
    object XClicked: TypeSelectViewResult()
    object DotsClicked: TypeSelectViewResult()
    object KnightsMoveClicked: TypeSelectViewResult()
    data class NextClicked(val typeAndDifficultyBundle: Bundle): TypeSelectViewResult()
}