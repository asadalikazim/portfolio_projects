package com.kgc.su.features.puzzleSelect

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.kgc.su.databinding.ActivityPuzzleSelectBinding
import dagger.hilt.android.AndroidEntryPoint
import javax.inject.Inject

@AndroidEntryPoint
class PuzzleSelectActivity : AppCompatActivity() {

    private lateinit var binding: ActivityPuzzleSelectBinding
    @Inject lateinit var navigation: PuzzleSelectNavigation

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        navigation.activity = this@PuzzleSelectActivity
        binding = ActivityPuzzleSelectBinding.inflate(layoutInflater)
        setContentView(binding.root)
    }

    override fun onBackPressed() {
        navigation.gotoHomePage()
    }
}