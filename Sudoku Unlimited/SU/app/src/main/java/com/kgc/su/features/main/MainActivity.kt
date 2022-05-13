package com.kgc.su.features.main

import android.content.Context
import android.content.SharedPreferences
import android.os.Bundle
import android.view.MenuItem
import android.view.View
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.SwitchCompat
import androidx.core.view.GravityCompat
import androidx.core.view.forEach
import androidx.lifecycle.Observer
import com.google.android.material.snackbar.Snackbar
import com.kgc.su.R
import com.kgc.su.SudokuUnlimitedApp
import com.kgc.su.SudokuUnlimitedApp.Companion.DARK_MODE
import com.kgc.su.databinding.ActivityMainBinding
import com.kgc.su.network.Network
import dagger.hilt.android.AndroidEntryPoint
import javax.inject.Inject


@AndroidEntryPoint
class MainActivity: AppCompatActivity() {

    private lateinit var sp: SharedPreferences

    private lateinit var binding: ActivityMainBinding
    @Inject lateinit var navigation: MainNavigation
    private val viewModel: MainViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        sp = this.getSharedPreferences(SudokuUnlimitedApp.SHARED_PREFERENCES, Context.MODE_PRIVATE)

        binding = ActivityMainBinding.inflate(layoutInflater)
        navigation.activity = this@MainActivity
        viewModel.result.observe(this, Observer{ resultToViewState(it) })
        viewModel.processInputs(MainViewInput.InitialSetup)
        setupButtons()
        setupDrawer()
        setupDarkMode()

        setContentView(binding.root)
    }

    override fun onStart() {
        super.onStart()
        Network.build(this@MainActivity)
    }

    override fun onResume() {
        super.onResume()
        Network.register()
    }

    override fun onPause() {
        super.onPause()
        Network.unregister()
    }

    private fun setupButtons(){
        with(binding){
            signIn.setOnClickListener { viewModel.processInputs(MainViewInput.SignIn) }
            play.setOnClickListener { viewModel.processInputs(MainViewInput.Play) }
            drawerIcon.setOnClickListener { binding.maDrawerLayout.openDrawer(GravityCompat.START) }
        }
    }

    private fun setupDrawer(){
        binding.maDrawer.menu.forEach {item ->
            item.setOnMenuItemClickListener(DrawerListener())
        }
    }

    inner class DrawerListener : MenuItem.OnMenuItemClickListener {
        override fun onMenuItemClick(item: MenuItem?): Boolean {
            when (item?.itemId) {
                R.id.drawerGuides -> viewModel.processInputs(MainViewInput.NavigateToGuides)
                R.id.drawerRankings -> viewModel.processInputs(MainViewInput.NavigateToRankings)
                R.id.drawerProfile -> viewModel.processInputs(MainViewInput.NavigateToProfile)
                R.id.drawerSignOut -> viewModel.processInputs(MainViewInput.SignOut)
                else -> return false
            }
            return true
        }
    }

    private fun setupDarkMode() {
        (binding.maDrawer.menu.findItem(R.id.drawerDarkMode).actionView as SwitchCompat).apply {
            if (sp.getBoolean(DARK_MODE, false)) {
                isChecked = true
            }

            setOnCheckedChangeListener { _, isChecked ->
                if (isChecked) {
                    with (sp.edit()) {
                        putBoolean(DARK_MODE, true)
                        apply()
                    }
                } else {
                    with (sp.edit()) {
                        putBoolean(DARK_MODE, false)
                        apply()
                    }
                }
                makeToast("Preference saved! Restart app to apply changes.")
            }
        }
    }

    private fun resultToViewState(result: MainViewResult){
        when (result){
            is MainViewResult.MakeToast -> makeToast(result.toast)
            is MainViewResult.SetupUI -> setupUI(result.signedIn)
            is MainViewResult.NavigateToGuides -> navigation.showGuides()
            is MainViewResult.NavigateToRankings -> navigation.showRankings()
            is MainViewResult.NavigateToProfile -> navigation.showProfile(result.networkBundle)
            is MainViewResult.SignOut -> signOut()
            is MainViewResult.SignIn -> navigation.signIn()
            is MainViewResult.Play -> navigation.play()
        }
    }

    private fun signOut() {
        setupUI(signedIn = false)
        binding.maDrawerLayout.closeDrawers()
        makeToast("Sign Out successful")
    }

    private fun setupUI(signedIn: Boolean) {
        if (signedIn) {
            binding.signIn.visibility = View.GONE
        } else {
            binding.signIn.visibility = View.VISIBLE
            with (binding.maDrawer.menu) {
                removeItem(R.id.drawerProfile)
                removeItem(R.id.drawerSignOut)
            }
        }
    }

    private fun makeToast(toast: String) {
        Snackbar.make(binding.root, toast, Snackbar.LENGTH_LONG).show()
    }
}
