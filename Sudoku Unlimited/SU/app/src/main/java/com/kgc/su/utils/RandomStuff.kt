package com.kgc.su.utils

fun listOfNine(): MutableList<String>{
    return mutableListOf("1","2","3","4","5","6","7","8","9")
}

fun cleanListOfNine(listOfRejections: MutableList<String>): MutableList<String>{
    val listOfNine = listOfNine()
    listOfNine.removeAll(listOfRejections)
    return listOfNine
}

fun findGridRowStart(row: Int): Int{
    return when(row){
        in 0..2 -> 0
        in 3..5 -> 3
        else -> 6
    }
}

fun findGridColStart(col: Int): Int{
    return when(col){
        in 0..2 -> 0
        in 3..5 -> 3
        else -> 6
    }
}

fun listOfX(): MutableList<Pair<Int, Int>>{
    return mutableListOf(Pair(0,0), Pair(1,1), Pair(2,2), Pair(3,3), Pair(4,4), Pair(5,5), Pair(6,6), Pair(7,7), Pair(8,8),
        Pair(0,8), Pair(1,7), Pair(2,6), Pair(3,5), Pair(4,4), Pair(5,3), Pair(6,2), Pair(7,1), Pair(8,0))
}

fun listOfDots(): MutableList<Pair<Int, Int>>{
    return mutableListOf(Pair(1,1), Pair(1,4), Pair(1,7), Pair(4,1), Pair(4,4), Pair(4,7), Pair(7,1), Pair(7,4), Pair(7,7))
}

fun listOfKnightsMove(row: Int, col: Int): MutableList<Pair<Int, Int>>{
    val list = mutableListOf<Pair<Int, Int>>()
    if (row - 1 >= 0 && col - 2 >= 0) list.add(Pair(row - 1, col - 2))
    if (row - 2 >= 0 && col - 1 >= 0) list.add(Pair(row - 2, col - 1))
    if (row - 2 >= 0 && col + 1 <= 8) list.add(Pair(row - 2, col + 1))
    if (row - 1 >= 0 && col + 2 <= 8) list.add(Pair(row - 1, col + 2))
    if (row + 1 <= 8 && col + 2 <= 8) list.add(Pair(row + 1, col + 2))
    if (row + 2 <= 8 && col + 1 <= 8) list.add(Pair(row + 2, col + 1))
    if (row + 2 <= 8 && col - 1 >= 0) list.add(Pair(row + 2, col - 1))
    if (row + 1 <= 8 && col - 2 >= 0) list.add(Pair(row + 1, col - 2))
    return list
}

fun idGenerator(row: Int, col: Int): Int {
    return 50000 + (row * 9) + col
}

enum class ACTIONS {
    HINT, RESET, CHECK, SOLVE
}

object INPUTS {
    const val CLEAR = " "
    const val i1 = "1"
    const val i2 = "2"
    const val i3 = "3"
    const val i4 = "4"
    const val i5 = "5"
    const val i6 = "6"
    const val i7 = "7"
    const val i8 = "8"
    const val i9 = "9"
}

object BUNDLE {
    const val BUNDLE_DIFF = "puzzleDifficulty"
    const val BUNDLE_TYPE = "puzzleType"
    const val BUNDLE_PUZZ = "serializedPuzzle"
    const val BUNDLE_USER_SOLVE = "userSolve"
    const val BUNDLE_USER_SCORE = "userScore"
    const val BUNDLE_BONUS_DIFF = "bonusDiff"
    const val BUNDLE_BONUS_HINT = "bonusHint"
    const val BUNDLE_GAME_SCORE = "gameScore"
    const val BUNDLE_NETWORK = "network"
}

object CONSTANT_HINTS {
    const val EASY_HINTS   = 5
    const val MEDIUM_HINTS = 3
    const val HARD_HINTS   = 1
}

object CONSTANT_BONUS_DIFF {
    const val EASY_BONUS = 250
    const val MEDIUM_BONUS = 500
    const val HARD_BONUS = 1000
}

object CONSTANT_BONUS_HINT {
    const val BONUS = 100
}

const val EMPTY_CELL_VALUE = " "
const val EMPTY_CELL_INPUT = " "

