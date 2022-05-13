package com.kgc.su.features.guide

import android.graphics.Point
import android.os.Bundle
import android.widget.Button
import android.widget.GridLayout
import androidx.appcompat.app.AppCompatActivity
import com.kgc.su.databinding.ActivityGuideBinding
import com.kgc.su.utils.PuzzleBuilder
import com.kgc.su.utils.PuzzleCosmetics
import com.kgc.su.utils.listOfKnightsMove

class GuideActivity : AppCompatActivity() {

    private lateinit var binding: ActivityGuideBinding
    private var dimen = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val size = Point()
        this.windowManager.defaultDisplay.getSize(size)
        dimen = size.x

        binding = ActivityGuideBinding.inflate(layoutInflater)
        populateGuides()
        setContentView(binding.root)
    }

    private fun populateGuides() {
        guideClassic()
        guideX()
        guideDots()
        guideKnightsMove()
    }

    private fun guideClassic() {

        for (row in 0..8) {
            for (col in 0..8) {

                val gridLayoutParams = GridLayout.LayoutParams()
                with (gridLayoutParams) {
                    width = (dimen * 0.1).toInt()
                    height = (dimen * 0.1).toInt()
                }

                val button = Button(this)
                with (button) {
                    text = GUIDE_BOARD_CLASSIC[row * 9 + col].toString()
                    minWidth = 0
                    minHeight = 0
                    isElegantTextHeight = true
                    layoutParams = gridLayoutParams

                    setTypeface(null, PuzzleCosmetics.textAppearance(isHint = true))
                    setBackgroundColor(PuzzleCosmetics.textBackground(row = row, col = col, puzzleType = PuzzleBuilder.PuzzleType.CLASSIC))
                }

                binding.guideBoardClassic.addView(button)
            }
        }

    }

    private fun guideX() {
        for (row in 0..8) {
            for (col in 0..8) {

                val gridLayoutParams = GridLayout.LayoutParams()
                with (gridLayoutParams) {
                    width = (dimen * 0.1).toInt()
                    height = (dimen * 0.1).toInt()
                }

                val button = Button(this)
                with (button) {
                    text = GUIDE_BOARD_X[row * 9 + col].toString()
                    minWidth = 0
                    minHeight = 0
                    isElegantTextHeight = true
                    layoutParams = gridLayoutParams

                    setTypeface(null, PuzzleCosmetics.textAppearance(isHint = true))
                    setBackgroundColor(PuzzleCosmetics.textBackground(row = row, col = col, puzzleType = PuzzleBuilder.PuzzleType.X))
                }

                binding.guideBoardX.addView(button)
            }
        }
    }

    private fun guideDots() {
        for (row in 0..8) {
            for (col in 0..8) {

                val gridLayoutParams = GridLayout.LayoutParams()
                with (gridLayoutParams) {
                    width = (dimen * 0.1).toInt()
                    height = (dimen * 0.1).toInt()
                }

                val button = Button(this)
                with (button) {
                    text = GUIDE_BOARD_DOTS[row * 9 + col].toString()
                    minWidth = 0
                    minHeight = 0
                    isElegantTextHeight = true
                    layoutParams = gridLayoutParams

                    setTypeface(null, PuzzleCosmetics.textAppearance(isHint = true))
                    setBackgroundColor(PuzzleCosmetics.textBackground(row = row, col = col, puzzleType = PuzzleBuilder.PuzzleType.DOTS))
                }

                binding.guideBoardDots.addView(button)
            }
        }
    }

    private fun guideKnightsMove() {
        //simulating user clicking a board button in knights move mode
        val buttonChosen = Pair(4,4)
        val knightsMoves = listOfKnightsMove(buttonChosen.first, buttonChosen.second)

        for (row in 0..8) {
            for (col in 0..8) {

                val gridLayoutParams = GridLayout.LayoutParams()
                with (gridLayoutParams) {
                    width = (dimen * 0.1).toInt()
                    height = (dimen * 0.1).toInt()
                }

                val button = Button(this)
                with (button) {
                    text = GUIDE_BOARD_KNIGHTS_MOVE[row * 9 + col].toString()
                    minWidth = 0
                    minHeight = 0
                    isElegantTextHeight = true
                    layoutParams = gridLayoutParams

                    setTypeface(null, PuzzleCosmetics.textAppearance(isHint = true))
                    //simulating user clicking a board button in knights move mode
                    when (Pair(row,col)) {
                        buttonChosen -> setBackgroundColor(PuzzleCosmetics.textBackgroundChosen())
                        in knightsMoves -> setBackgroundColor(PuzzleCosmetics.textBackgroundChosen(isKnightsMove = true))
                        else -> setBackgroundColor(PuzzleCosmetics.textBackground(row = row, col = col, PuzzleBuilder.PuzzleType.KNIGHTSMOVE))
                    }
                }

                binding.guideBoardKnightsMove.addView(button)
            }
        }
    }

    companion object {
        const val GUIDE_BOARD_CLASSIC =
            "" +
                    "147258369" +
                    "258......" +
                    "369......" +
                    "4........" +
                    "5........" +
                    "6........" +
                    "7........" +
                    "8........" +
                    "9........"

        const val GUIDE_BOARD_X =
            "" +
                    "1.......4" +
                    ".2.....3." +
                    "..3...2.." +
                    "...4.1..." +
                    "....5...." +
                    "...9.6..." +
                    "..8...7.." +
                    ".7.....8." +
                    "6.......9"

        const val GUIDE_BOARD_DOTS =
            "" +
                    "........." +
                    ".1..2..3." +
                    "........." +
                    "........." +
                    ".4..5..6." +
                    "........." +
                    "........." +
                    ".7..8..9." +
                    "........."

        const val GUIDE_BOARD_KNIGHTS_MOVE =
            "" +
                    "........." +
                    "........." +
                    "...9.2..." +
                    "..8...3.." +
                    "....1...." +
                    "..7...4.." +
                    "...6.5..." +
                    "........." +
                    "........."


    }
}