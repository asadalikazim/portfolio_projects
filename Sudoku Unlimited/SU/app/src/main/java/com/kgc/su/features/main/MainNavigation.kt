package com.kgc.su.features.main

import android.content.Intent
import android.os.Bundle
import androidx.navigation.NavController
import com.kgc.su.features.guide.GuideActivity
import com.kgc.su.features.profile.ProfileActivity
import com.kgc.su.features.puzzleSelect.PuzzleSelectActivity
import com.kgc.su.features.ranking.RankingActivity
import com.kgc.su.features.registration.RegistrationActivity
import javax.inject.Inject

class MainNavigation @Inject constructor() {

    lateinit var activity: MainActivity

    fun showRankings(){
        activity.startActivity(Intent(activity, RankingActivity::class.java))
    }

    fun showGuides(){
        activity.startActivity(Intent(activity, GuideActivity::class.java))
    }

    fun showProfile(networkBundle: Bundle){
        activity.startActivity(Intent(activity, ProfileActivity::class.java).putExtras(networkBundle))
    }

    fun signIn(){
        activity.startActivity(Intent(activity, RegistrationActivity::class.java))
    }

    fun play(){
        activity.startActivity(Intent(activity, PuzzleSelectActivity::class.java))
    }

}