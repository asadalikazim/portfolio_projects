package com.kgc.su.features.puzzleFinish

import android.content.Intent
import androidx.navigation.NavController
import com.kgc.su.features.main.MainActivity
import com.kgc.su.features.puzzleSelect.PuzzleSelectActivity
import javax.inject.Inject

class PuzzleFinishNavigation @Inject constructor() {

    lateinit var activity: PuzzleFinishActivity
    lateinit var navController: NavController

    fun gotoHomePage(){
        activity.startActivity(Intent(activity, MainActivity::class.java).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK))
    }

    fun playAgain(){
        activity.startActivity(Intent(activity, PuzzleSelectActivity::class.java).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK))
    }
}