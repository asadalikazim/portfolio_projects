package com.kgc.su.features.puzzlePlay

import android.content.Intent
import android.os.Bundle
import androidx.navigation.NavController
import com.kgc.su.R
import com.kgc.su.features.main.MainActivity
import com.kgc.su.features.puzzleFinish.PuzzleFinishActivity
import javax.inject.Inject

class PuzzlePlayNavigation @Inject constructor() {

    lateinit var activity: PuzzlePlayActivity
    lateinit var navController: NavController

    fun gotoHomePage(){
        activity.startActivity(Intent(activity, MainActivity::class.java).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK))
    }

    fun goToSudoku(puzzleBundle: Bundle){
        navController.navigate(R.id.action_splashFrag_to_sudokuFrag, puzzleBundle)
    }

    fun goToPuzzleFinish(puzzleFinishBundle: Bundle) {
        activity.startActivity(Intent(activity, PuzzleFinishActivity::class.java).putExtras(puzzleFinishBundle))
    }
}