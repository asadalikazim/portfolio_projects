package com.kgc.su.features.puzzleSelect.type

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.Observer
import androidx.navigation.fragment.findNavController
import com.kgc.su.databinding.FragPsaTypeSelectBinding
import com.kgc.su.features.puzzleSelect.PuzzleSelectActivity
import com.kgc.su.features.puzzleSelect.PuzzleSelectNavigation
import dagger.hilt.android.AndroidEntryPoint
import javax.inject.Inject

@AndroidEntryPoint
class TypeSelectFrag : Fragment() {

    private lateinit var binding: FragPsaTypeSelectBinding
    @Inject lateinit var navigation: PuzzleSelectNavigation
    private val viewModel: TypeSelectViewModel by viewModels()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        binding = FragPsaTypeSelectBinding.inflate(layoutInflater)
        with(navigation){
            activity = getActivity() as PuzzleSelectActivity
            navController = findNavController()
        }
        viewModel.result.observe(viewLifecycleOwner, Observer { resultToViewState(it) })
        viewModel.processInputs(TypeSelectViewInput.InitialSetup(requireArguments()))
        setupButtons()

        return binding.root
    }

    private fun resultToViewState(result: TypeSelectViewResult){
        when(result){
            is TypeSelectViewResult.ClassicClicked -> {
                uncheckAll()
                binding.typeClassic.toggle()
            }
            is TypeSelectViewResult.XClicked -> {
                uncheckAll()
                binding.typeX.toggle()
            }
            is TypeSelectViewResult.DotsClicked -> {
                uncheckAll()
                binding.typeDots.toggle()
            }
            is TypeSelectViewResult.KnightsMoveClicked -> {
                uncheckAll()
                binding.typeKnightsMove.toggle()
            }
            is TypeSelectViewResult.NextClicked -> nextClicked(result)
        }
    }

    private fun setupButtons(){
        with(binding){
            typeClassic.setOnClickListener { viewModel.processInputs(TypeSelectViewInput.ClassicClicked) }
            typeX.setOnClickListener { viewModel.processInputs(TypeSelectViewInput.XClicked) }
            typeDots.setOnClickListener { viewModel.processInputs(TypeSelectViewInput.DotsClicked) }
            typeKnightsMove.setOnClickListener { viewModel.processInputs(TypeSelectViewInput.KnightsMoveClicked) }

            next.setOnClickListener { viewModel.processInputs(TypeSelectViewInput.NextClicked) }
        }
    }

    private fun uncheckAll(){
        with(binding){
            if (typeClassic.isChecked) typeClassic.toggle()
            if (typeX.isChecked) typeX.toggle()
            if (typeDots.isChecked) typeDots.toggle()
            if (typeKnightsMove.isChecked) typeKnightsMove.toggle()
        }
    }

    private fun nextClicked(result: TypeSelectViewResult.NextClicked){
        navigation.goToPuzzle(result.typeAndDifficultyBundle)
    }
}