package com.kgc.su.features.registration.signIn

import android.content.res.Resources
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
import com.kgc.su.databinding.FragRaSignInBinding
import com.kgc.su.features.registration.RegistrationActivity
import com.kgc.su.features.registration.RegistrationNavigation
import dagger.hilt.android.AndroidEntryPoint
import javax.inject.Inject

@AndroidEntryPoint
class SignInFrag: Fragment() {

    private lateinit var binding: FragRaSignInBinding
    @Inject lateinit var navigation: RegistrationNavigation
    private val viewModel: SignInViewModel by viewModels()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        binding = FragRaSignInBinding.inflate(layoutInflater)
        navigation.activity = activity as RegistrationActivity

        viewModel.result.observe(viewLifecycleOwner, Observer{ resultToViewState(it) })
        setupUI()

        return binding.root
    }

    private fun resultToViewState(result: SignInViewResult) {
        when (result) {
            is SignInViewResult.DataError -> dataError(result.error, result.isUsernameError, result.isPasswordError)
            is SignInViewResult.MakeToast -> makeToast(toast = result.toast, isErrorToast = result.isErrorToast)
            is SignInViewResult.SignInSuccess -> navigation.gotoHomePage()
        }
    }

    private fun setupUI() {
        setupFields()
        setupButtons()
    }

    private fun setupFields() {
        with (binding) {
            with (usernameSignIn) {
                imeOptions = EditorInfo.IME_ACTION_NEXT
                addTextChangedListener(object: TextWatcher {
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

            passwordSignIn.imeOptions = EditorInfo.IME_ACTION_DONE
        }
    }

    private fun setupButtons() {
        with (binding) {
            signIn.setOnClickListener {
                viewModel.processInputs(SignInViewInput.CheckSignIn(
                    username = usernameSignIn.text.toString(),
                    password = passwordSignIn.text.toString()
                ))
            }
        }
    }

    private fun dataError(error: String, isUsernameError: Boolean, isPasswordError: Boolean) {
        when {
            isUsernameError -> {
                with (binding.usernameSignIn) {
                    setError(error)
                    setOnClickListener {
                        setError(null)
                        setOnClickListener(null)
                    }
                }
            }
            isPasswordError -> {
                with (binding.passwordSignIn) {
                    setError(error)
                    setOnClickListener {
                        setError(null)
                        setOnClickListener(null)
                    }
                }
            }
            else -> {
                makeToast(toast = error, isErrorToast = true)

                val icon = Resources.getSystem().getIdentifier("indicator_input_error", "drawable", "android")
                with (binding) {
                    usernameSignIn.setCompoundDrawablesWithIntrinsicBounds(0, 0, icon, 0)
                    passwordSignIn.setCompoundDrawablesWithIntrinsicBounds(0, 0, icon, 0)

                    usernameSignIn.setOnClickListener {
                        usernameSignIn.setCompoundDrawablesWithIntrinsicBounds(0, 0, 0, 0)
                        passwordSignIn.setCompoundDrawablesWithIntrinsicBounds(0, 0, 0, 0)
                    }

                    passwordSignIn.setOnClickListener {
                        usernameSignIn.setCompoundDrawablesWithIntrinsicBounds(0, 0, 0, 0)
                        passwordSignIn.setCompoundDrawablesWithIntrinsicBounds(0, 0, 0, 0)
                    }
                }
            }
        }
    }

    private fun makeToast(toast: String, isErrorToast: Boolean) {
        Snackbar.make(binding.root, toast, Snackbar.LENGTH_LONG).show()
    }
}