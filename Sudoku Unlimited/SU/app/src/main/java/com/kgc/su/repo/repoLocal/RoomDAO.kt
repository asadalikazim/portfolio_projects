package com.kgc.su.repo.repoLocal

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query

@Dao
interface UserDao {
    @Insert
    fun insert(user: User)

    @Query("SELECT * FROM User")
    fun read(): List<User>

    @Query("DELETE FROM User")
    fun delete()
}

@Dao
interface GameDao {
    @Insert
    fun insert(game: Game)

    @Query("SELECT * FROM Game")
    fun readAll(): List<Game>

    @Query("DELETE FROM Game")
    fun deleteAll()
}