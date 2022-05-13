package com.kgc.su.utils

import android.graphics.Color
import android.graphics.Typeface
import com.kgc.su.utils.PuzzleCosmetics.Companion.COLOR_1
import com.kgc.su.utils.PuzzleCosmetics.Companion.COLOR_2
import com.kgc.su.utils.PuzzleCosmetics.Companion.COLOR_3
import com.kgc.su.utils.PuzzleCosmetics.Companion.COLOR_4
import com.kgc.su.utils.sudokuGenerator.KnightsMove

object PuzzleCosmetics {

    fun textAppearance(isHint: Boolean): Int {
        return if (isHint) Typeface.BOLD else Typeface.ITALIC
    }

    fun textBackground(row: Int, col: Int, puzzleType: PuzzleBuilder.PuzzleType = PuzzleBuilder.PuzzleType.NULL): Int {
        return when (puzzleType) {
            PuzzleBuilder.PuzzleType.CLASSIC -> basicColorScheme(row = row, col = col)
            PuzzleBuilder.PuzzleType.X -> {
                if (Pair(row,col) in listOfX()) Color.parseColor(COLOR_3) else basicColorScheme(row = row, col = col)
            }
            PuzzleBuilder.PuzzleType.DOTS -> {
                if (Pair(row,col) in listOfDots()) Color.parseColor(COLOR_3) else basicColorScheme(row = row, col = col)
            }
            PuzzleBuilder.PuzzleType.KNIGHTSMOVE -> basicColorScheme(row = row, col = col)
            else -> basicColorScheme(row = row, col = col)
        }
    }

    private fun basicColorScheme(row: Int, col: Int): Int {
        when (row) {
            in 0..2 -> {
                when (col) {
                    in 0..2 -> {
                        return Color.parseColor(COLOR_1)
                    }
                    in 3..5 -> {
                        return Color.parseColor(COLOR_2)
                    }
                    in 6..8 -> {
                        return Color.parseColor(COLOR_1)
                    }
                }
            }
            in 3..5 -> {
                when (col) {
                    in 0..2 -> {
                        return Color.parseColor(COLOR_2)
                    }
                    in 3..5 -> {
                        return Color.parseColor(COLOR_1)
                    }
                    in 6..8 -> {
                        return Color.parseColor(COLOR_2)
                    }
                }
            }
            in 6..8 -> {
                when (col) {
                    in 0..2 -> {
                        return Color.parseColor(COLOR_1)
                    }
                    in 3..5 -> {
                        return Color.parseColor(COLOR_2)
                    }
                    in 6..8 -> {
                        return Color.parseColor(COLOR_1)
                    }
                }
            }
        }
        return COLOR_4
    }

    fun textBackgroundChosen(isKnightsMove: Boolean = false): Int {
        return if (isKnightsMove) Color.parseColor(COLOR_3) else COLOR_4
    }

    object Companion {
        const val COLOR_1 = "#009900"
        const val COLOR_2 = "#99cc33"
        const val COLOR_3 = "#cccc00"
        const val COLOR_4 = Color.CYAN
    }
}