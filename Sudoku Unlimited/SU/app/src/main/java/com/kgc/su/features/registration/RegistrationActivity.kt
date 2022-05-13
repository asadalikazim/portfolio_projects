package com.kgc.su.features.registration

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.kgc.su.databinding.ActivityRegistrationBinding
import dagger.hilt.android.AndroidEntryPoint
import javax.inject.Inject

@AndroidEntryPoint
class RegistrationActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRegistrationBinding
    @Inject lateinit var navigation: RegistrationNavigation

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        navigation.activity = this@RegistrationActivity
        binding = ActivityRegistrationBinding.inflate(layoutInflater)
        setContentView(binding.root)
    }
}