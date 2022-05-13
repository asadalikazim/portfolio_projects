package com.kgc.su.features.registration.signIn

sealed class SignInViewInput {
    data class CheckSignIn(val username: String, val password: String): SignInViewInput()
}

sealed class SignInViewResult {
    data class DataError(val error: String, val isUsernameError: Boolean = false, val isPasswordError: Boolean = false): SignInViewResult()
    data class MakeToast(val toast: String, val isErrorToast: Boolean = false): SignInViewResult()
    object SignInSuccess: SignInViewResult()
}