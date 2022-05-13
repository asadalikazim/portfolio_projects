package com.kgc.su.features.puzzlePlay

import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.Navigation.findNavController
import androidx.navigation.fragment.findNavController
import com.google.android.material.snackbar.Snackbar
import com.kgc.su.R
import com.kgc.su.databinding.ActivityPuzzlePlayBinding
import com.kgc.su.features.puzzlePlay.sudoku.SudokuViewModel
import dagger.hilt.android.AndroidEntryPoint
import javax.inject.Inject

@AndroidEntryPoint
class PuzzlePlayActivity : AppCompatActivity() {

    private lateinit var binding: ActivityPuzzlePlayBinding
    @Inject lateinit var navigation: PuzzlePlayNavigation
    private var backAvailable: Boolean = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        navigation.activity = this@PuzzlePlayActivity
        binding = ActivityPuzzlePlayBinding.inflate(layoutInflater)
        setContentView(binding.root)
    }

    override fun onBackPressed() {
        if (!backAvailable) {
            backAvailable = true
            Snackbar.make(binding.root, getString(R.string.on_back_pressed), Snackbar.LENGTH_LONG).show()
            Handler(Looper.getMainLooper()).postDelayed({ backAvailable = false }, 10000)
        } else {
            navigation.gotoHomePage()
        }
    }
}