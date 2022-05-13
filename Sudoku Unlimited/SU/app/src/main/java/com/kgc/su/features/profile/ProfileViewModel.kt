package com.kgc.su.features.profile

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.kgc.su.R
import com.kgc.su.network.Network
import com.kgc.su.repo.Repo
import com.kgc.su.repo.repoLocal.Game
import com.kgc.su.repo.repoLocal.User
import com.kgc.su.repo.repoRemote.FirestoreENT
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ProfileViewModel @Inject constructor(val repo: Repo) : ViewModel() {

    private var isUserAuth = false

    private val _result = MutableLiveData<ProfileViewResult>()
    val result: LiveData<ProfileViewResult> = _result

    private fun applyResult(result: ProfileViewResult){
        _result.postValue(result)
    }

    fun processInputs(input: ProfileViewInput){
        when(input){
            is ProfileViewInput.InitialSetup -> initialSetup(networkAvailable = input.networkAvailable)
            is ProfileViewInput.PasswordClicked -> passwordClicked()
            is ProfileViewInput.UserAuth -> {isUserAuth = true; passwordClicked()}
            is ProfileViewInput.SyncButtonClicked -> syncButtonClicked()
        }
    }

    private fun initialSetup(networkAvailable: Boolean){
        viewModelScope.launch(Dispatchers.IO) {
            val user = when (val userResult = repo.getUser()) {
                is Repo.RepoResult.PositiveResult -> userResult.data as User
                else -> null
            }

            val game = if (!networkAvailable) null else when (val gameResult = repo.getGame()) {
                is Repo.RepoResult.PositiveResult -> gameResult.data as FirestoreENT.GameInfo
                else -> null
            }

            applyResult(ProfileViewResult.InitialSetup(
                username = user?.username ?: "",
                password = user?.password ?: "",
                userScore = game?.totalScore?.toString() ?: "",
                numGames = game?.numberOfGames?.toString() ?: "",
                networkAvailable = networkAvailable
            ))
        }
    }

    private fun passwordClicked() {
        if (isUserAuth) {
            applyResult(ProfileViewResult.PasswordClicked)
        } else {
            applyResult(ProfileViewResult.UserAuth)
        }
    }

    private fun syncButtonClicked() {
        if (Network.isAvailable()) {
            viewModelScope.launch(Dispatchers.IO) {
                when (val syncResult = repo.syncProfile()) {
                    is Repo.RepoResult.PositiveResult -> {
                        applyResult(ProfileViewResult.ProfileSynced(
                            userScore = (syncResult.data as FirestoreENT.GameInfo).totalScore.toString(),
                            numGames = syncResult.data.numberOfGames.toString()
                        ))
                    }
                    else -> applyResult(ProfileViewResult.MakeToast(toast = "Internal Error occurred. Please try again later"))
                }
            }
        } else {
            applyResult(ProfileViewResult.MakeToast(toast = "Go online to sync your profile"))
        }
    }
}