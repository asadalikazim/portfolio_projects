package com.kgc.su.features.registration.reg

sealed class RegViewInput {
    object SignInClicked: RegViewInput()
    object SignUpClicked: RegViewInput()
    object GuestClicked: RegViewInput()
}

sealed class RegViewResult {
    object SignInClicked: RegViewResult()
    object SignUpClicked: RegViewResult()
    object GuestClicked: RegViewResult()
}