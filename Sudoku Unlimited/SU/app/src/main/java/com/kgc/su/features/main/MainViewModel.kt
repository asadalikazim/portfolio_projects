package com.kgc.su.features.main

import androidx.core.os.bundleOf
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.kgc.su.network.Network
import com.kgc.su.repo.Repo
import com.kgc.su.utils.BUNDLE.BUNDLE_NETWORK
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class MainViewModel @Inject constructor(val repo: Repo) : ViewModel()  {

    private var signOutAvailable = false

    private val _result = MutableLiveData<MainViewResult>()
    val result: LiveData<MainViewResult> = _result

    private fun applyResult(result: MainViewResult){
        _result.postValue(result)
    }

    fun processInputs(input: MainViewInput){
        when (input){
            is MainViewInput.InitialSetup -> initialSetup()
            is MainViewInput.SignOut -> signOut()
            is MainViewInput.SignIn -> {
                if (Network.isAvailable()) applyResult(MainViewResult.SignIn)
                else applyResult(MainViewResult.MakeToast(toast = "Go online to Sign In"))
            }
            is MainViewInput.NavigateToRankings -> {
                if (Network.isAvailable()) applyResult(MainViewResult.NavigateToRankings)
                else applyResult(MainViewResult.MakeToast(toast = "Go online to view rankings"))
            }
            is MainViewInput.NavigateToProfile -> {
                applyResult(MainViewResult.NavigateToProfile(bundleOf(Pair(BUNDLE_NETWORK, Network.isAvailable()))))
            }
            is MainViewInput.Play -> applyResult(MainViewResult.Play)
            is MainViewInput.NavigateToGuides -> applyResult(MainViewResult.NavigateToGuides)
        }
    }

    private fun signOut() {
        if (signOutAvailable) {
            viewModelScope.launch(Dispatchers.IO) {
                when (repo.signOutUser()) {
                    is Repo.RepoResult.PositiveResult -> {
                        applyResult(MainViewResult.SignOut)
                    }
                    else -> applyResult(MainViewResult.MakeToast("Internal error"))
                }
            }
        } else {
            signOutAvailable = true
            applyResult(MainViewResult.MakeToast(toast = "Any progress not saved online will be lost! Click again within 10 seconds to confirm"))
            viewModelScope.launch(Dispatchers.IO) { delay(10000); signOutAvailable = false }
        }
    }

    private fun initialSetup() {

        viewModelScope.launch(Dispatchers.IO) {
            val signedIn = repo.checkSignedIn() is Repo.RepoResult.PositiveResult
            applyResult(MainViewResult.SetupUI(signedIn = signedIn))

            delay(5000)

            if (Network.isAvailable() && signedIn) {
                applyResult(MainViewResult.MakeToast(toast = "Let's Play!"))
            } else if (!Network.isAvailable() && signedIn) {
                applyResult(MainViewResult.MakeToast(toast = "Go online to backup your progress"))
            } else if (Network.isAvailable() && !signedIn){
                applyResult(MainViewResult.MakeToast(toast = "Sign In to save your progress"))
            } else {
                applyResult(MainViewResult.MakeToast(toast = "Go online to Sign In"))
            }
        }
    }
}