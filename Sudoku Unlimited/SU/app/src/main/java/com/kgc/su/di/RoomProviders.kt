package com.kgc.su.di

import android.content.Context
import androidx.room.Room
import com.kgc.su.repo.repoLocal.GameDao
import com.kgc.su.repo.repoLocal.RoomDB
import com.kgc.su.repo.repoLocal.UserDao
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@InstallIn(SingletonComponent::class)
@Module
class RoomModule {
    @Provides
    @Singleton
    fun provideARoomDatabase(@ApplicationContext appContext: Context): RoomDB {
        return Room.databaseBuilder(
            appContext,
            RoomDB::class.java,
            "RoomDB"
        ).fallbackToDestructiveMigration().build()
    }

    @Provides
    fun provideUserDao(roomDB: RoomDB): UserDao {
        return roomDB.userDao()
    }

    @Provides
    fun provideGameDao(roomDB: RoomDB): GameDao {
        return roomDB.gameDao()
    }
}