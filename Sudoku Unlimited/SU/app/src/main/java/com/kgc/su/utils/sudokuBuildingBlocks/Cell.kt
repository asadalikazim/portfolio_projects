package com.kgc.su.utils.sudokuBuildingBlocks

import com.kgc.su.utils.EMPTY_CELL_INPUT
import com.kgc.su.utils.EMPTY_CELL_VALUE

class Cell() {

    /** value */
    var value: String = EMPTY_CELL_VALUE

    /** user input */
    var input: String = EMPTY_CELL_INPUT

    /** hint related stuff */
    var isHint: Boolean = false
}