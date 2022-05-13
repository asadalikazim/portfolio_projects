package com.kgc.su.features.registration

import android.content.Intent
import androidx.navigation.NavController
import com.kgc.su.R
import com.kgc.su.features.main.MainActivity
import javax.inject.Inject

class RegistrationNavigation @Inject constructor() {

    lateinit var activity: RegistrationActivity
    lateinit var navController: NavController

    fun gotoHomePage(){
        activity.startActivity(Intent(activity, MainActivity::class.java).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK))
    }

    fun goToSignIn(){
        navController.navigate(R.id.action_regFrag_to_signInFrag)
    }

    fun goToSignUp(){
        navController.navigate(R.id.action_regFrag_to_signUpFrag)
    }
}