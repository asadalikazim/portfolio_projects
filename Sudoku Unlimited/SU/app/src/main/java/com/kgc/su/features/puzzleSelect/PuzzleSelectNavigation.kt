package com.kgc.su.features.puzzleSelect

import android.content.Intent
import android.os.Bundle
import androidx.navigation.NavController
import com.kgc.su.R
import com.kgc.su.features.main.MainActivity
import com.kgc.su.features.puzzlePlay.PuzzlePlayActivity
import javax.inject.Inject

class PuzzleSelectNavigation @Inject constructor() {

    lateinit var activity: PuzzleSelectActivity
    lateinit var navController: NavController

    fun gotoHomePage(){
        activity.startActivity(Intent(activity, MainActivity::class.java).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK))
    }

    fun goToTypeSelect(difficultyBundle: Bundle){
        navController.navigate(R.id.action_difficultySelectFrag_to_typeSelectFrag, difficultyBundle)
    }

    fun goToPuzzle(typeAndDifficultyBundle: Bundle){
        activity.startActivity(Intent(activity, PuzzlePlayActivity::class.java).putExtras(typeAndDifficultyBundle))
    }
}