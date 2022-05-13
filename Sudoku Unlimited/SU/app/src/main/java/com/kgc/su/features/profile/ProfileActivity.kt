package com.kgc.su.features.profile

import android.os.Bundle
import android.text.InputType
import android.text.method.PasswordTransformationMethod
import android.view.View
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.biometric.BiometricManager.Authenticators.BIOMETRIC_STRONG
import androidx.biometric.BiometricManager.Authenticators.DEVICE_CREDENTIAL
import androidx.biometric.BiometricPrompt
import androidx.core.content.ContextCompat
import androidx.lifecycle.Observer
import com.google.android.material.snackbar.Snackbar
import com.kgc.su.databinding.ActivityProfileBinding
import com.kgc.su.network.Network
import com.kgc.su.utils.BUNDLE.BUNDLE_NETWORK
import dagger.hilt.android.AndroidEntryPoint
import java.util.concurrent.Executor


@AndroidEntryPoint
class ProfileActivity : AppCompatActivity() {

    private lateinit var executor: Executor
    private lateinit var biometricPrompt: BiometricPrompt
    private lateinit var promptInfo: BiometricPrompt.PromptInfo

    private var isPasswordRevealed = false

    private lateinit var binding: ActivityProfileBinding
    private val viewModel: ProfileViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityProfileBinding.inflate(layoutInflater)
        val networkAvailable = intent.extras!!.get(BUNDLE_NETWORK) as Boolean
        if (!networkAvailable) {
            with (binding) {
                userScoreHeader.visibility = View.GONE
                userScore.visibility = View.GONE
                puzzlesSolvedHeader.visibility = View.GONE
                puzzlesSolved.visibility = View.GONE
            }
        }

        binding.password.transformationMethod = PasswordTransformationMethod.getInstance()

        viewModel.result.observe(this, Observer { resultToViewState(it) })
        viewModel.processInputs(ProfileViewInput.InitialSetup(networkAvailable = networkAvailable))
        setupUI()

        setContentView(binding.root)
    }

    override fun onStart() {
        super.onStart()
        Network.build(this@ProfileActivity)
    }

    override fun onResume() {
        super.onResume()
        Network.register()
    }

    override fun onPause() {
        super.onPause()
        Network.unregister()
    }

    private fun resultToViewState(result: ProfileViewResult) {
        when (result) {
            is ProfileViewResult.InitialSetup -> initialSetup(result)
            is ProfileViewResult.ProfileSynced -> profileSynced(result)
            is ProfileViewResult.MakeToast -> makeToast(toast = result.toast)
            is ProfileViewResult.UserAuth -> authUser()
            is ProfileViewResult.PasswordClicked -> passwordClicked()
        }
    }

    private fun initialSetup(result: ProfileViewResult.InitialSetup) {
        if (!result.networkAvailable) makeToast("Go online and sync to view full profile")

        with (binding) {
            username.text = result.username
            password.text = result.password
            userScore.text = result.userScore
            puzzlesSolved.text = result.numGames
        }
    }

    private fun setupUI() {
        with (binding) {
            password.setOnClickListener { viewModel.processInputs(ProfileViewInput.PasswordClicked) }
            syncProfile.setOnClickListener { viewModel.processInputs(ProfileViewInput.SyncButtonClicked) }
        }
    }

    private fun profileSynced(result: ProfileViewResult.ProfileSynced) {
        with (binding) {
            userScoreHeader.visibility = View.VISIBLE
            userScore.visibility = View.VISIBLE
            userScore.text = result.userScore
            puzzlesSolvedHeader.visibility = View.VISIBLE
            puzzlesSolved.visibility = View.VISIBLE
            puzzlesSolved.text = result.numGames
        }

        makeToast("Profile synced!")
    }

    private fun authUser() {
        executor = ContextCompat.getMainExecutor(this)
        biometricPrompt = BiometricPrompt(this, executor,
            object : BiometricPrompt.AuthenticationCallback() {
                override fun onAuthenticationError(errorCode: Int,
                                                   errString: CharSequence) {
                    super.onAuthenticationError(errorCode, errString)
                    makeToast("Authentication error")
                }

                override fun onAuthenticationSucceeded(
                    result: BiometricPrompt.AuthenticationResult) {
                    super.onAuthenticationSucceeded(result)
                    makeToast("Authentication succeeded")
                    viewModel.processInputs(ProfileViewInput.UserAuth)
                }

                override fun onAuthenticationFailed() {
                    super.onAuthenticationFailed()
                    makeToast("Authentication failed")
                }
            })

        promptInfo = BiometricPrompt.PromptInfo.Builder()
            .setTitle("Please provide authentication")
            .setSubtitle("Authenticate to view sensitive information")
            .setAllowedAuthenticators(BIOMETRIC_STRONG or DEVICE_CREDENTIAL)
            .build()
        biometricPrompt.authenticate(promptInfo)
    }
    private fun passwordClicked() {
        with (binding.password) {
            if (isPasswordRevealed) {
                isPasswordRevealed = false
                transformationMethod = PasswordTransformationMethod.getInstance()
            } else {
                isPasswordRevealed = true
                transformationMethod = null
            }
        }
    }

    private fun makeToast(toast: String) {
        Snackbar.make(binding.root, toast, Snackbar.LENGTH_LONG).show()
    }
}