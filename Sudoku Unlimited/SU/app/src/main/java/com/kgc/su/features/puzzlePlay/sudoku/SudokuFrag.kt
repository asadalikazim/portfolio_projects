package com.kgc.su.features.puzzlePlay.sudoku

import android.graphics.Point
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.ViewGroup.LayoutParams.WRAP_CONTENT
import android.widget.Button
import android.widget.GridLayout
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.Observer
import androidx.navigation.fragment.findNavController
import com.google.android.material.snackbar.Snackbar
import com.kgc.su.databinding.FragPpaSudokuBinding
import com.kgc.su.features.puzzlePlay.PuzzlePlayActivity
import com.kgc.su.features.puzzlePlay.PuzzlePlayNavigation
import com.kgc.su.utils.*
import com.kgc.su.utils.PuzzleCosmetics.textAppearance
import com.kgc.su.utils.PuzzleCosmetics.textBackground
import com.kgc.su.utils.PuzzleCosmetics.textBackgroundChosen
import dagger.hilt.android.AndroidEntryPoint
import javax.inject.Inject

@AndroidEntryPoint
class SudokuFrag : Fragment() {

    private lateinit var binding: FragPpaSudokuBinding
    @Inject lateinit var navigation: PuzzlePlayNavigation
    private val viewModel: SudokuViewModel by viewModels()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        binding = FragPpaSudokuBinding.inflate(layoutInflater)
        with(navigation) {
            activity = getActivity() as PuzzlePlayActivity
            navController = findNavController()
        }
        viewModel.result.observe(viewLifecycleOwner, Observer { resultToViewState(it) })
        viewModel.processInputs(SudokuViewInput.InitialSetup(requireArguments()))

        return binding.root
    }

    private fun resultToViewState(result: SudokuViewResult) {
        when (result) {
            is SudokuViewResult.InitialSetup -> { binding.sudokuHeader.setText(result.headerStringRes); setupButtons(); }
            is SudokuViewResult.BoardButtonClicked -> boardButtonClicked(old = result.old, new = result.new)
            is SudokuViewResult.InputButtonClicked -> inputButtonClicked(cellAffected = result.cellAffected)
            is SudokuViewResult.ActionButtonClicked -> actionButtonClicked(result = result)
            is SudokuViewResult.Finish -> navigation.goToPuzzleFinish(puzzleFinishBundle = result.puzzleFinishBundle)
        }
    }

    private fun setupButtons() {
        setupBoardButtons()
        setupInputButtons()
        setupActionButtons()
    }

    private fun setupBoardButtons() {
        val size = Point()
        (activity as PuzzlePlayActivity).windowManager.defaultDisplay.getSize(size)
        val screenWidth: Int = size.x

        for (row in 0..8) {
            for (col in 0..8) {

                val gridLayoutParams = GridLayout.LayoutParams()
                with (gridLayoutParams) {
                    width = (screenWidth * 0.1).toInt()
                    height = (screenWidth * 0.1).toInt()
                }

                val button = Button(activity as PuzzlePlayActivity)
                with (button) {
                    id = idGenerator(row = row, col = col)
                    text = viewModel.puzzle.board[row][col].input
                    minWidth = 0
                    minHeight = 0
                    isElegantTextHeight = true
                    layoutParams = gridLayoutParams

                    setTypeface(null, textAppearance(isHint = viewModel.puzzle.board[row][col].isHint))
                    setBackgroundColor(textBackground(row = row, col = col, puzzleType = viewModel.puzzleType))

                    setOnClickListener { viewModel.processInputs(SudokuViewInput.BoardButtonClicked(row = row, col = col)) }
                }

                binding.puzzleBoard.addView(button)
            }
        }
    }

    private fun setupInputButtons() {
        with (binding.puzzleInput) {
            clearCell.setOnClickListener { viewModel.processInputs(SudokuViewInput.InputButtonClicked(userInput = INPUTS.CLEAR)) }
            i1.setOnClickListener { viewModel.processInputs(SudokuViewInput.InputButtonClicked(userInput = INPUTS.i1)) }
            i2.setOnClickListener { viewModel.processInputs(SudokuViewInput.InputButtonClicked(userInput = INPUTS.i2)) }
            i3.setOnClickListener { viewModel.processInputs(SudokuViewInput.InputButtonClicked(userInput = INPUTS.i3)) }
            i4.setOnClickListener { viewModel.processInputs(SudokuViewInput.InputButtonClicked(userInput = INPUTS.i4)) }
            i5.setOnClickListener { viewModel.processInputs(SudokuViewInput.InputButtonClicked(userInput = INPUTS.i5)) }
            i6.setOnClickListener { viewModel.processInputs(SudokuViewInput.InputButtonClicked(userInput = INPUTS.i6)) }
            i7.setOnClickListener { viewModel.processInputs(SudokuViewInput.InputButtonClicked(userInput = INPUTS.i7)) }
            i8.setOnClickListener { viewModel.processInputs(SudokuViewInput.InputButtonClicked(userInput = INPUTS.i8)) }
            i9.setOnClickListener { viewModel.processInputs(SudokuViewInput.InputButtonClicked(userInput = INPUTS.i9)) }
        }
    }

    private fun setupActionButtons() {
        with (binding.puzzleActions) {
            puzzleHint.setOnClickListener  { viewModel.processInputs(SudokuViewInput.ActionButtonClicked(action = ACTIONS.HINT)) }
            puzzleReset.setOnClickListener { viewModel.processInputs(SudokuViewInput.ActionButtonClicked(action = ACTIONS.RESET)) }
            puzzleCheck.setOnClickListener { viewModel.processInputs(SudokuViewInput.ActionButtonClicked(action = ACTIONS.CHECK)) }
            puzzleSolve.setOnClickListener { viewModel.processInputs(SudokuViewInput.ActionButtonClicked(action = ACTIONS.SOLVE)) }
        }
    }

    private fun boardButtonClicked(old: Pair<Int, Int>, new: Pair<Int,Int>) {
        with (binding.root) {
            findViewById<Button>(idGenerator(row = old.first, col = old.second)).setBackgroundColor(
                textBackground(row = old.first, col = old.second, puzzleType = viewModel.puzzleType)
            )
            findViewById<Button>(idGenerator(row = new.first, col = new.second)).setBackgroundColor(
                textBackgroundChosen()
            )

            if (viewModel.puzzleType == PuzzleBuilder.PuzzleType.KNIGHTSMOVE) {
                val knightsMovesOld = listOfKnightsMove(old.first, old.second)
                for (pair in knightsMovesOld) {
                    findViewById<Button>(idGenerator(row = pair.first, col = pair.second))
                        .setBackgroundColor(
                            textBackground(row = pair.first, col = pair.second, puzzleType = PuzzleBuilder.PuzzleType.KNIGHTSMOVE)
                        )
                }

                val knightsMovesNew = listOfKnightsMove(new.first, new.second)
                for (pair in knightsMovesNew) {
                    findViewById<Button>(idGenerator(row = pair.first, col = pair.second))
                        .setBackgroundColor(textBackgroundChosen(isKnightsMove = true))
                }
            }
        }
    }

    private fun inputButtonClicked(cellAffected: Pair<Int,Int>) {
        binding.root.findViewById<Button>(idGenerator(row = cellAffected.first, col = cellAffected.second)).text =
            viewModel.puzzle.board[cellAffected.first][cellAffected.second].input
    }

    private fun actionButtonClicked(result: SudokuViewResult.ActionButtonClicked) {
        with (result) {
            if (isToast) {
                Snackbar.make(binding.root, toast, Snackbar.LENGTH_SHORT).show()
            } else {
                when (action) {
                    ACTIONS.HINT -> {
                        val cell = binding.root.findViewById<Button>(idGenerator(row = cellAffected.first, col = cellAffected.second))
                        cell.text = viewModel.puzzle.board[cellAffected.first][cellAffected.second].input
                        cell.setTypeface(null, textAppearance(viewModel.puzzle.board[cellAffected.first][cellAffected.second].isHint))
                        cell.setBackgroundColor(textBackground(row = cellAffected.first, col = cellAffected.second, puzzleType = viewModel.puzzleType))
                    }
                    ACTIONS.RESET -> {
                        for (row in 0..8) {
                            for (col in 0..8) {
                                val cell = binding.root.findViewById<Button>(idGenerator(row = row, col = col))
                                cell.text = viewModel.puzzle.board[row][col].input
                            }
                        }
                    }
                    ACTIONS.CHECK -> viewModel.processInputs(SudokuViewInput.Finish(userSolved = true))
                    ACTIONS.SOLVE -> viewModel.processInputs(SudokuViewInput.Finish(userSolved = false))
                }
            }
        }
    }
}