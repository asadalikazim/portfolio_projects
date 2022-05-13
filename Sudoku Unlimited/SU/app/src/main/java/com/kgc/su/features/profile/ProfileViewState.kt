package com.kgc.su.features.profile

sealed class ProfileViewInput{
    data class InitialSetup(val networkAvailable: Boolean): ProfileViewInput()
    object PasswordClicked: ProfileViewInput()
    object UserAuth: ProfileViewInput()
    object SyncButtonClicked: ProfileViewInput()
}

sealed class ProfileViewResult{
    data class InitialSetup(
        val username: String = "",
        val password: String = "",
        val userScore: String = "",
        val numGames: String = "",
        val networkAvailable: Boolean): ProfileViewResult()
    data class MakeToast(val toast: String): ProfileViewResult()
    data class ProfileSynced(
        val userScore: String = "",
        val numGames: String = ""): ProfileViewResult()
    object PasswordClicked: ProfileViewResult()
    object UserAuth: ProfileViewResult()
}