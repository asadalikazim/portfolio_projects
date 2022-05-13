package com.kgc.su.repo.repoLocal

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity
data class User (
    @PrimaryKey val uid: String,
    @ColumnInfo(name = "username") val username: String,
    @ColumnInfo(name = "password") val password: String
)

@Entity
data class Game (
    @PrimaryKey(autoGenerate = true) val gid: Int = 0,
    @ColumnInfo val uid: String,
    @ColumnInfo(name = "game_score") val gameScore: Int
)