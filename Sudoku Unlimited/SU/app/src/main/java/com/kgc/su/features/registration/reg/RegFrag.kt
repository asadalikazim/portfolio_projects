package com.kgc.su.features.registration.reg

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.Observer
import androidx.navigation.fragment.findNavController
import com.kgc.su.databinding.FragRaRegBinding
import com.kgc.su.features.registration.RegistrationActivity
import com.kgc.su.features.registration.RegistrationNavigation
import dagger.hilt.android.AndroidEntryPoint
import javax.inject.Inject

@AndroidEntryPoint
class RegFrag : Fragment() {

    private lateinit var binding: FragRaRegBinding
    @Inject lateinit var navigation: RegistrationNavigation
    private val viewModel: RegViewModel by viewModels()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        binding = FragRaRegBinding.inflate(layoutInflater)
        with (navigation) {
            activity = getActivity() as RegistrationActivity
            navController = findNavController()
        }
        viewModel.result.observe(viewLifecycleOwner, Observer{ resultToViewState(it) })
        setupButtons()

        return binding.root
    }

    private fun resultToViewState(result: RegViewResult) {
        when (result) {
            is RegViewResult.SignInClicked -> navigation.goToSignIn()
            is RegViewResult.SignUpClicked -> navigation.goToSignUp()
            is RegViewResult.GuestClicked -> navigation.gotoHomePage()
        }
    }

    private fun setupButtons() {
        with (binding) {
            with (viewModel) {
                signIn.setOnClickListener { processInputs(RegViewInput.SignInClicked) }
                signUp.setOnClickListener { processInputs(RegViewInput.SignUpClicked) }
                proceedAsGuest.setOnClickListener { processInputs(RegViewInput.GuestClicked) }
            }
        }
    }
}