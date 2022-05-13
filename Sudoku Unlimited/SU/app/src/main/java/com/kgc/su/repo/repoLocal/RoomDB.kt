package com.kgc.su.repo.repoLocal

import androidx.room.Database
import androidx.room.RoomDatabase

@Database(entities = [User::class, Game::class], version = 1)
abstract class RoomDB: RoomDatabase() {
    abstract fun userDao(): UserDao
    abstract fun gameDao(): GameDao
}
