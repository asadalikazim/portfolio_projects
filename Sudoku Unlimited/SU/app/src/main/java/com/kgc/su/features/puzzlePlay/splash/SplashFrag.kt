package com.kgc.su.features.puzzlePlay.splash

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.Observer
import androidx.navigation.fragment.findNavController
import com.kgc.su.databinding.FragPpaSplashBinding
import com.kgc.su.features.puzzlePlay.PuzzlePlayActivity
import com.kgc.su.features.puzzlePlay.PuzzlePlayNavigation
import dagger.hilt.android.AndroidEntryPoint
import javax.inject.Inject

@AndroidEntryPoint
class SplashFrag: Fragment() {

    private lateinit var binding: FragPpaSplashBinding
    @Inject lateinit var navigation: PuzzlePlayNavigation
    private val viewModel: SplashViewModel by viewModels()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        binding = FragPpaSplashBinding.inflate(layoutInflater)
        with(navigation){
            activity = getActivity() as PuzzlePlayActivity
            navController = findNavController()
        }
        viewModel.result.observe(viewLifecycleOwner, Observer { resultToViewState(it) })
        setupButtons()

        return binding.root
    }

    override fun onResume() {
        super.onResume()
        viewModel.processInputs(SplashViewInput.InitialSetup((activity as PuzzlePlayActivity).intent.extras!!))
    }

    private fun resultToViewState(result: SplashViewResult){
        when(result){
            is SplashViewResult.CancelClicked -> {
                navigation.gotoHomePage()
            }
            is SplashViewResult.NavToSudoku -> {
                navigation.goToSudoku(result.puzzleBundle)
            }
        }
    }

    private fun setupButtons(){
        binding.cancel.setOnClickListener { viewModel.processInputs(SplashViewInput.CancelClicked) }
    }
}