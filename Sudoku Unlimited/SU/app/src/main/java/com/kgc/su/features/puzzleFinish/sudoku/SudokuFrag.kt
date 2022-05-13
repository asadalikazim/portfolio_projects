package com.kgc.su.features.puzzleFinish.sudoku

import android.graphics.Point
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.GridLayout
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.Observer
import androidx.navigation.fragment.findNavController
import com.google.android.material.snackbar.Snackbar
import com.kgc.su.databinding.FragPfaSudokuBinding
import com.kgc.su.features.puzzleFinish.PuzzleFinishActivity
import com.kgc.su.features.puzzleFinish.PuzzleFinishNavigation
import com.kgc.su.utils.PuzzleCosmetics.textAppearance
import com.kgc.su.utils.PuzzleCosmetics.textBackground
import com.kgc.su.utils.idGenerator
import dagger.hilt.android.AndroidEntryPoint
import javax.inject.Inject

@AndroidEntryPoint
class SudokuFrag: Fragment() {

    private lateinit var binding: FragPfaSudokuBinding
    @Inject lateinit var navigation: PuzzleFinishNavigation
    private val viewModel: SudokuViewModel by viewModels()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        binding = FragPfaSudokuBinding.inflate(layoutInflater)
        with(navigation){
            activity = getActivity() as PuzzleFinishActivity
            navController = findNavController()
        }
        viewModel.result.observe(viewLifecycleOwner, Observer { resultToViewState(it) })

        return binding.root
    }

    override fun onResume() {
        super.onResume()
        viewModel.processInputs(SudokuViewInput.InitialSetup((activity as PuzzleFinishActivity).intent.extras!!))
    }

    private fun resultToViewState(result: SudokuViewResult) {
        when (result) {
            is SudokuViewResult.InitialSetup -> setupButtons(result)
            is SudokuViewResult.DoneButtonClicked -> navigation.gotoHomePage()
            is SudokuViewResult.PlayAgainButtonClicked -> navigation.playAgain()
            is SudokuViewResult.MakeToast -> Snackbar.make(binding.root, result.toast, Snackbar.LENGTH_LONG).show()
        }
    }

    private fun setupButtons(result: SudokuViewResult.InitialSetup) {
        val size = Point()
        (activity as PuzzleFinishActivity).windowManager.defaultDisplay.getSize(size)
        val screenWidth: Int = size.x

        for (row in 0..8) {
            for (col in 0..8) {

                val gridLayoutParams = GridLayout.LayoutParams()
                with (gridLayoutParams) {
                    width = (screenWidth * 0.1).toInt()
                    height = (screenWidth * 0.1).toInt()
                }

                val button = Button(activity as PuzzleFinishActivity)
                with (button) {
                    id = idGenerator(row = row, col = col)
                    text = viewModel.puzzle.board[row][col].value
                    minWidth = 0
                    minHeight = 0
                    isElegantTextHeight = true
                    layoutParams = gridLayoutParams

                    setTypeface(null, textAppearance(isHint = viewModel.puzzle.board[row][col].isHint))
                    setBackgroundColor(textBackground(row = row, col = col, puzzleType = viewModel.puzzleType))
                }

                binding.puzzleBoard.addView(button)
            }
        }

        with (binding) {
            sudokuHeader.setText(result.headerStringRes)
            sudokuFooter.setText(result.footerStringRes)

            if (result.isUserSolved) {
                userScore.text = result.userScore
                bonusDiff.text = result.bonusDiff
                bonusHint.text = result.bonusHint
                gameScore.text = result.gameScore
            } else {
                scoreCard.visibility = View.GONE
            }

            playAgain.setOnClickListener { viewModel.processInputs(SudokuViewInput.PlayAgainButtonClicked) }
            done.setOnClickListener { viewModel.processInputs(SudokuViewInput.DoneButtonClicked) }
        }
    }
}