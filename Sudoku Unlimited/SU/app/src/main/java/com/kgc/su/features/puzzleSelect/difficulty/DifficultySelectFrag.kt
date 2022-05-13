package com.kgc.su.features.puzzleSelect.difficulty

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.Observer
import androidx.navigation.fragment.findNavController
import com.kgc.su.databinding.FragPsaDifficultySelectBinding
import com.kgc.su.features.puzzleSelect.PuzzleSelectActivity
import com.kgc.su.features.puzzleSelect.PuzzleSelectNavigation
import dagger.hilt.android.AndroidEntryPoint
import javax.inject.Inject

@AndroidEntryPoint
class DifficultySelectFrag : Fragment() {

    private lateinit var binding: FragPsaDifficultySelectBinding
    @Inject lateinit var navigation: PuzzleSelectNavigation
    private val viewModel: DifficultySelectViewModel by viewModels()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        binding = FragPsaDifficultySelectBinding.inflate(layoutInflater)
        with(navigation){
            activity = getActivity() as PuzzleSelectActivity
            navController = findNavController()
        }
        viewModel.result.observe(viewLifecycleOwner, Observer{ resultToViewState(it) })
        viewModel.processInputs(DifficultySelectViewInput.InitialSetup)
        setupButtons()

        return binding.root
    }

    private fun resultToViewState(result: DifficultySelectViewResult){
        when(result){
            is DifficultySelectViewResult.EasyClicked -> easyClicked()
            is DifficultySelectViewResult.MediumClicked -> mediumClicked()
            is DifficultySelectViewResult.HardClicked -> hardClicked()
            is DifficultySelectViewResult.NextClicked -> nextClicked(result)
        }

    }

    private fun setupButtons(){
        with(binding){
            checkBoxEasy.setOnClickListener { viewModel.processInputs(DifficultySelectViewInput.EasyClicked) }
            checkBoxMedium.setOnClickListener { viewModel.processInputs(DifficultySelectViewInput.MediumClicked) }
            checkBoxHard.setOnClickListener { viewModel.processInputs(DifficultySelectViewInput.HardClicked) }
            next.setOnClickListener { viewModel.processInputs(DifficultySelectViewInput.NextClicked) }
        }
    }

    private fun easyClicked(){
        with(binding){
            if (!checkBoxEasy.isChecked) checkBoxEasy.toggle()
            if (checkBoxMedium.isChecked) checkBoxMedium.toggle()
            if (checkBoxHard.isChecked) checkBoxHard.toggle()
        }
    }

    private fun mediumClicked(){
        with(binding){
            if (checkBoxEasy.isChecked) checkBoxEasy.toggle()
            if (!checkBoxMedium.isChecked) checkBoxMedium.toggle()
            if (checkBoxHard.isChecked) checkBoxHard.toggle()
        }
    }

    private fun hardClicked(){
        with(binding){
            if (checkBoxEasy.isChecked) checkBoxEasy.toggle()
            if (checkBoxMedium.isChecked) checkBoxMedium.toggle()
            if (!checkBoxHard.isChecked) checkBoxHard.toggle()
        }
    }

    private fun nextClicked(result: DifficultySelectViewResult.NextClicked){
        navigation.goToTypeSelect(result.difficultyBundle)
    }
}