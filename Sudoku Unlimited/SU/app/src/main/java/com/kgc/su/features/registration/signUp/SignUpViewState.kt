package com.kgc.su.features.registration.signUp

sealed class SignUpViewInput {
    data class CheckSignUp(val username: String, val password: String, val repeatPassword: String): SignUpViewInput()
}

sealed class SignUpViewResult {
    data class DataError(val error: String, val isUsernameError: Boolean = false, val isPasswordError: Boolean = false): SignUpViewResult()
    data class MakeToast(val toast: String, val isErrorToast: Boolean = false): SignUpViewResult()
    object SignUpSuccess: SignUpViewResult()
}