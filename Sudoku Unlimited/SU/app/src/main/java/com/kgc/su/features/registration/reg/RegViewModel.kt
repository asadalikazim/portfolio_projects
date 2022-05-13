package com.kgc.su.features.registration.reg

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import javax.inject.Inject

class RegViewModel @Inject constructor(): ViewModel() {

    private val _result = MutableLiveData<RegViewResult>()
    val result: LiveData<RegViewResult> = _result

    private fun applyResult(result: RegViewResult) {
        _result.value = result
    }

    fun processInputs(input: RegViewInput) {
        when (input) {
            is RegViewInput.SignInClicked -> applyResult(RegViewResult.SignInClicked)
            is RegViewInput.SignUpClicked -> applyResult(RegViewResult.SignUpClicked)
            is RegViewInput.GuestClicked -> applyResult(RegViewResult.GuestClicked)
        }
    }
}