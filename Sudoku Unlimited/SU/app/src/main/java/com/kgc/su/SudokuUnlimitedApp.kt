package com.kgc.su

import android.app.Application
import android.content.Context
import androidx.appcompat.app.AppCompatDelegate
import dagger.hilt.android.HiltAndroidApp


@HiltAndroidApp
class SudokuUnlimitedApp : Application() {
    override fun onCreate() {
        super.onCreate()

        val sp = applicationContext.getSharedPreferences(SHARED_PREFERENCES, Context.MODE_PRIVATE)
        if (sp.getBoolean(DARK_MODE, false)) {
            AppCompatDelegate.setDefaultNightMode(
                AppCompatDelegate.MODE_NIGHT_YES
            )
        }
    }

    companion object {
        const val SHARED_PREFERENCES = "com.kgc.su.sharedPreferences"
        const val DARK_MODE = "darkMode"
    }
}