package com.kgc.su.features.ranking

import android.os.Bundle
import android.util.TypedValue
import android.view.Gravity
import android.view.ViewGroup
import android.widget.LinearLayout
import android.widget.TextView
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.res.ResourcesCompat
import androidx.core.view.setPadding
import androidx.lifecycle.Observer
import com.google.android.material.snackbar.Snackbar
import com.kgc.su.R
import com.kgc.su.databinding.ActivityRankingBinding
import com.kgc.su.repo.repoRemote.FirestoreENT
import dagger.hilt.android.AndroidEntryPoint
import java.security.AccessController.getContext

@AndroidEntryPoint
class RankingActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRankingBinding
    private val viewModel: RankingViewModel by  viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityRankingBinding.inflate(layoutInflater)
        viewModel.result.observe(this, Observer { resultToViewState(it) })
        viewModel.processInputs(RankingViewInput.InitialSetup)

        setContentView(binding.root)
    }

    private fun resultToViewState(result: RankingViewResult) {
        when (result) {
            is RankingViewResult.InitialSetup -> initialSetup(data = result.data)
            is RankingViewResult.ErrorFetching -> {
                Snackbar.make(binding.root, result.toast, Snackbar.LENGTH_LONG).show()
            }
        }
    }

    private fun initialSetup(data: List<FirestoreENT.GameInfo>) {
        val scale = resources.displayMetrics.density
        val padding =  (RECORD_PADDING * scale + 0.5f).toInt()
        val lp = LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT)
        lp.gravity = Gravity.CENTER_HORIZONTAL

        for ((ranking, record) in data.withIndex()) {
            /** Column Ranking */
            val textView1 = TextView(this)
            with (textView1) {
                text = (ranking + 1).toString()
                typeface = ResourcesCompat.getFont(context, R.font.roboto_bold)
                setTextSize(TypedValue.COMPLEX_UNIT_SP, RECORD_TEXT_SIZE)
                setPadding(padding)
                layoutParams = lp
            }
            binding.rkaColRank.addView(textView1)

            /** Column Username */
            val textView2 = TextView(this)
            with (textView2) {
                text = record.username
                typeface = ResourcesCompat.getFont(context, R.font.roboto_bold)
                setTextSize(TypedValue.COMPLEX_UNIT_SP, RECORD_TEXT_SIZE)
                setPadding(padding)
                layoutParams = lp
            }
            binding.rkaColUsername.addView(textView2)

            /** Column Score */
            val textView3 = TextView(this)
            with (textView3) {
                text = record.totalScore.toString()
                typeface = ResourcesCompat.getFont(context, R.font.roboto_bold)
                setTextSize(TypedValue.COMPLEX_UNIT_SP, RECORD_TEXT_SIZE)
                setPadding(padding)
                layoutParams = lp
            }
            binding.rkaColUserScore.addView(textView3)
        }
    }

    companion object {
        const val RECORD_TEXT_SIZE = 14f
        const val RECORD_PADDING = 10
    }
}