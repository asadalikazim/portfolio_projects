package com.kgc.su.features.registration.signIn

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.kgc.su.repo.Repo
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class SignInViewModel @Inject constructor(val repo: Repo): ViewModel() {

    private val _result = MutableLiveData<SignInViewResult>()
    val result : LiveData<SignInViewResult> = _result

    private fun applyResult(result: SignInViewResult) {
        _result.postValue(result)
    }

    fun processInputs(input: SignInViewInput) {
        when (input) {
            is SignInViewInput.CheckSignIn -> checkSignIn(input.username, input.password)
        }
    }

    private fun checkSignIn(username: String, password: String) {
        //validations
        //null safety
        if (username == "") { applyResult(SignInViewResult.DataError(error = "Username can not be empty", isUsernameError = true)); return }
        if (password == "") { applyResult(SignInViewResult.DataError(error = "Password can not be empty", isPasswordError = true)); return }

        //validations complete
        //repo actions
        viewModelScope.launch(Dispatchers.IO) {
            when(repo.signInUser(username = username, password = password)) {
                is Repo.RepoResult.NegativeResult -> {
                    applyResult(SignInViewResult.DataError(error = "Invalid Username or Password"))
                    return@launch
                }
                is Repo.RepoResult.InternalError -> {
                    applyResult(SignInViewResult.MakeToast(toast = "Internal Error occurred. Please try again later", isErrorToast = true))
                    return@launch
                }
                is Repo.RepoResult.PositiveResult -> Unit
            }

            //all tasks done
            signInSuccess()
        }
    }

    private fun signInSuccess() {
        applyResult(SignInViewResult.MakeToast(toast = "Successful!"))
        viewModelScope.launch(Dispatchers.IO) { delay(3000); applyResult(SignInViewResult.SignInSuccess) }
    }
}