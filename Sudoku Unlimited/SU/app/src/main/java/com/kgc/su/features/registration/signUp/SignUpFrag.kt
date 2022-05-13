package com.kgc.su.features.registration.signUp

import android.os.Bundle
import android.text.Editable
import android.text.SpannableStringBuilder
import android.text.TextWatcher
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.inputmethod.EditorInfo
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.Observer
import com.google.android.material.snackbar.Snackbar
import com.kgc.su.databinding.FragRaSignUpBinding
import com.kgc.su.features.registration.RegistrationActivity
import com.kgc.su.features.registration.RegistrationNavigation
import dagger.hilt.android.AndroidEntryPoint
import javax.inject.Inject

@AndroidEntryPoint
class SignUpFrag : Fragment() {

    private lateinit var binding: FragRaSignUpBinding
    @Inject lateinit var navigation: RegistrationNavigation
    private val viewModel: SignUpViewModel by viewModels()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        binding = FragRaSignUpBinding.inflate(layoutInflater)
        navigation.activity = activity as RegistrationActivity

        viewModel.result.observe(viewLifecycleOwner, Observer { resultToViewState(it) })
        setupUI()

        return binding.root
    }

    private fun resultToViewState(result: SignUpViewResult) {
        when (result) {
            is SignUpViewResult.DataError -> dataError(result.error, result.isUsernameError, result.isPasswordError)
            is SignUpViewResult.MakeToast -> makeToast(toast = result.toast, isErrorToast = result.isErrorToast)
            is SignUpViewResult.SignUpSuccess -> navigation.gotoHomePage()
        }
    }

    private fun setupUI() {
        setupFields()
        setupButtons()
    }

    private fun setupFields() {
        with(binding) {
            with(usernameSignUp) {
                imeOptions = EditorInfo.IME_ACTION_NEXT
                addTextChangedListener(object : TextWatcher {
                    var isUser: Boolean = true
                    override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
                    override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {}
                    override fun afterTextChanged(s: Editable?) {
                        if (isUser) {
                            isUser = false
                            var amended = ""
                            if (s != null) {
                                for (char in s) {
                                    if (char.isLetterOrDigit()) amended = amended.plus(char)
                                }
                                s.replace(0, s.length, SpannableStringBuilder(amended))
                            }
                            isUser = true
                        }
                    }
                })
            }

            passwordSignUp.imeOptions = EditorInfo.IME_ACTION_NEXT
            repeatPasswordSignUp.imeOptions = EditorInfo.IME_ACTION_DONE
        }
    }

    private fun setupButtons() {
        with(binding) {
            signUp.setOnClickListener {
                viewModel.processInputs(
                    SignUpViewInput.CheckSignUp(
                        username = usernameSignUp.text.toString(),
                        password = passwordSignUp.text.toString(),
                        repeatPassword = repeatPasswordSignUp.text.toString()
                    )
                )
            }
        }
    }

    private fun dataError(error: String, isUsernameError: Boolean, isPasswordError: Boolean) {
        when {
            isUsernameError -> {
                with(binding.usernameSignUp) {
                    setError(error)
                    setOnClickListener {
                        setError(null)
                        setOnClickListener(null)
                    }
                }
            }
            isPasswordError -> {
                with(binding.passwordSignUp) {
                    setError(error)
                    setOnClickListener {
                        setError(null)
                        setOnClickListener(null)
                    }
                }
            }
            else -> {
                with(binding.repeatPasswordSignUp) {
                    setError(error)
                    setOnClickListener {
                        setError(null)
                        setOnClickListener(null)
                    }
                }
            }
        }
    }

    private fun makeToast(toast: String, isErrorToast: Boolean) {
        Snackbar.make(binding.root, toast, Snackbar.LENGTH_LONG).show()
    }
}