package com.kgc.su.features.main

import android.os.Bundle

sealed class MainViewInput{
    object InitialSetup : MainViewInput()
    object NavigateToRankings: MainViewInput()
    object NavigateToGuides : MainViewInput()
    object NavigateToProfile : MainViewInput()
    object SignOut : MainViewInput()
    object SignIn: MainViewInput()
    object Play : MainViewInput()
}

sealed class MainViewResult{
    data class MakeToast(val toast: String) : MainViewResult()
    data class SetupUI(val signedIn: Boolean) : MainViewResult()
    object NavigateToRankings : MainViewResult()
    object NavigateToGuides : MainViewResult()
    data class NavigateToProfile(val networkBundle: Bundle) : MainViewResult()
    object SignOut : MainViewResult()
    object SignIn : MainViewResult()
    object Play : MainViewResult()
}