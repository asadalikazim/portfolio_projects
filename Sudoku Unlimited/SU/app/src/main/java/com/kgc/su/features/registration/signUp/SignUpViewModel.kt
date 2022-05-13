package com.kgc.su.features.registration.signUp

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
class SignUpViewModel @Inject constructor(val repo: Repo): ViewModel() {

    private val _result = MutableLiveData<SignUpViewResult>()
    val result : LiveData<SignUpViewResult> = _result

    private fun applyResult(result: SignUpViewResult) {
        _result.postValue(result)
    }

    fun processInputs(input: SignUpViewInput) {
        when (input) {
            is SignUpViewInput.CheckSignUp -> checkSignUp(input.username, input.password, input.repeatPassword)
        }
    }

    private fun checkSignUp(username: String, password: String, repeatPassword: String) {
        //validations
        //null safety
        if (username == "") { applyResult(SignUpViewResult.DataError(error = "Username can not be empty", isUsernameError = true)); return }
        if (password == "") { applyResult(SignUpViewResult.DataError(error = "Password can not be empty", isPasswordError = true)); return }
        if (repeatPassword == "") { applyResult(SignUpViewResult.DataError(error = "Repetition can not be empty")); return}
        //length checks
        if (username.length < 8) { applyResult(SignUpViewResult.DataError(error = "Username can not be less than 8 characters", isUsernameError = true)); return }
        if (password.length < 8) { applyResult(SignUpViewResult.DataError(error = "Password can not be less than 8 characters", isPasswordError = true)); return }
        //password check
        if (password != repeatPassword) { applyResult(SignUpViewResult.DataError(error = "Passwords must match")); return }

        //validation complete
        //repo actions
        viewModelScope.launch(Dispatchers.IO) {
            when (repo.checkUserNameAvailable(username = username)) {
                is Repo.RepoResult.NegativeResult -> {
                    applyResult(SignUpViewResult.DataError(error = "Username already taken!", isUsernameError = true))
                    return@launch
                }
                is Repo.RepoResult.InternalError -> {
                    applyResult(SignUpViewResult.MakeToast(toast = "Internal Error occurred. Please try again later", isErrorToast = true))
                    return@launch
                }
                else -> Unit
            }

            when (repo.signUpUser(username = username, password = password)) {
                is Repo.RepoResult.NegativeResult -> {
                    applyResult(SignUpViewResult.MakeToast(toast = "Sign Up failed. Please try again later", isErrorToast = true))
                    return@launch
                }
                is Repo.RepoResult.InternalError -> {
                    applyResult(SignUpViewResult.MakeToast(toast = "Internal Error occurred. Please try again later", isErrorToast = true))
                    return@launch
                }
                is Repo.RepoResult.PositiveResult -> Unit
            }

            //all tasks done
            signUpSuccess()
        }
    }

    private fun signUpSuccess() {
        applyResult(SignUpViewResult.MakeToast(toast = "Successful!"))
        viewModelScope.launch(Dispatchers.IO) { delay(3000); applyResult(SignUpViewResult.SignUpSuccess) }
    }
}