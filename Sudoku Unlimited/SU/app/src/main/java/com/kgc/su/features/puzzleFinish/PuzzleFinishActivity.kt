package com.kgc.su.features.puzzleFinish

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.kgc.su.databinding.ActivityPuzzleFinishBinding
import com.kgc.su.network.Network
import dagger.hilt.android.AndroidEntryPoint
import javax.inject.Inject

@AndroidEntryPoint
class PuzzleFinishActivity : AppCompatActivity() {

    private lateinit var binding: ActivityPuzzleFinishBinding
    @Inject lateinit var navigation: PuzzleFinishNavigation

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        navigation.activity = this@PuzzleFinishActivity
        binding = ActivityPuzzleFinishBinding.inflate(layoutInflater)
        setContentView(binding.root)
    }

    override fun onBackPressed() {
        navigation.gotoHomePage()
    }

    override fun onStart() {
        super.onStart()
        Network.build(this@PuzzleFinishActivity)
    }

    override fun onResume() {
        super.onResume()
        Network.register()
    }

    override fun onPause() {
        super.onPause()
        Network.unregister()
    }
}