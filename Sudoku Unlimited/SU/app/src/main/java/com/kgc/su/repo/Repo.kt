package com.kgc.su.repo

import android.util.Log
import com.kgc.su.network.Network
import com.kgc.su.repo.repoLocal.Game
import com.kgc.su.repo.repoLocal.RoomMethods
import com.kgc.su.repo.repoLocal.User
import com.kgc.su.repo.repoRemote.FirestoreENT
import com.kgc.su.repo.repoRemote.FirestoreMethods
import javax.inject.Inject

class Repo @Inject constructor(private val repoLocal: RoomMethods, private val repoRemote: FirestoreMethods) {

    fun getUser(): RepoResult {
        return try {
            RepoResult.PositiveResult(repoLocal.userDao.read()[0])
        } catch (ex: Exception) {
            Log.e(LOCAL_EXCEPTION_TAG, ex.toString())
            RepoResult.InternalError
        }
    }

    suspend fun getGame(): RepoResult {
        val user = try {
            repoLocal.userDao.read()[0]
        } catch (ex: Exception) {
            Log.e(LOCAL_EXCEPTION_TAG, ex.toString())
            RepoResult.InternalError
        }

        if (user == RepoResult.InternalError) return RepoResult.InternalError

        return try {
            RepoResult.PositiveResult(repoRemote.fetchGameInfo(uid = (user as User).uid))
        } catch (ex: Exception) {
            Log.e(REMOTE_EXCEPTION_TAG, ex.toString())
            RepoResult.InternalError
        }
    }

    suspend fun syncProfile(): RepoResult {
        val user = try {
            repoLocal.userDao.read()[0]
        } catch (ex: Exception) {
            Log.e(LOCAL_EXCEPTION_TAG, ex.toString())
            RepoResult.InternalError
        }

        if (user == RepoResult.InternalError) return RepoResult.InternalError

        var gameList = try {
            repoLocal.gameDao.readAll()
        } catch (ex: Exception) {
            Log.e(LOCAL_EXCEPTION_TAG, ex.toString())
            RepoResult.InternalError
        }

        if (gameList == RepoResult.InternalError) return RepoResult.InternalError

        gameList = gameList as List<Game>
        val numberOfGames = gameList.size
        var totalScore = 0
        for (game in gameList) {
            totalScore += game.gameScore
        }

        val syncResult = try {
            repoRemote.postGameInfo(
                uid = (user as User).uid,
                username = user.username,
                numberOfGames = numberOfGames,
                gameScore = totalScore)
            RepoResult.PositiveResult()
        } catch (ex: Exception) {
            Log.e(REMOTE_EXCEPTION_TAG, ex.toString())
            RepoResult.InternalError
        }

        if (syncResult == RepoResult.InternalError) return RepoResult.InternalError

        //safe to delete locally stored games
        try {
            repoLocal.gameDao.deleteAll()
        } catch (ex: Exception) {
            Log.e(LOCAL_EXCEPTION_TAG, ex.toString())
        }

        return try {
            RepoResult.PositiveResult(repoRemote.fetchGameInfo(uid = (user as User).uid))
        } catch (ex: Exception) {
            Log.e(REMOTE_EXCEPTION_TAG, ex.toString())
            RepoResult.InternalError
        }
    }

    fun checkSignedIn(): RepoResult {
        return try {
            if (repoLocal.userDao.read().size == 1) RepoResult.PositiveResult() else RepoResult.NegativeResult
        } catch (ex: Exception) {
            Log.e(LOCAL_EXCEPTION_TAG, ex.toString())
            RepoResult.InternalError
        }
    }

    suspend fun checkUserNameAvailable(username: String): RepoResult {
        return try {
            val result = repoRemote.fetchUserByName(username = username)
            if (result == null) RepoResult.PositiveResult() else RepoResult.NegativeResult
        } catch (ex: Exception) {
            Log.e(REMOTE_EXCEPTION_TAG, ex.toString())
            RepoResult.InternalError
        }
    }

    suspend fun signUpUser(username: String, password: String): RepoResult {
        val result: FirestoreENT.UserInfo?

        //upload info to remote repo
        try {
            result = repoRemote.postUser(username = username, password = password)
            if (result == null) return RepoResult.NegativeResult
        } catch (ex: Exception) {
            Log.e(REMOTE_EXCEPTION_TAG, ex.toString())
            return RepoResult.InternalError
        }

        //save info in local repo
        try {
            with (result) {
                repoLocal.userDao.insert(User(uid = uid, username = username, password = password))
            }
        } catch (ex: Exception) {
            Log.e(LOCAL_EXCEPTION_TAG, ex.toString())
            return RepoResult.InternalError
        }

        //all tasks done
        return RepoResult.PositiveResult()
    }

    suspend fun signInUser(username: String, password: String): RepoResult {
        val result: FirestoreENT.UserInfo?

        //check user exists in remote repo
        try {
            result = repoRemote.fetchUserByCred(username = username, password = password)
            if (result == null) return RepoResult.NegativeResult
        } catch (ex: Exception) {
            Log.e(REMOTE_EXCEPTION_TAG, ex.toString())
            return RepoResult.InternalError
        }

        //save info in local repo
        try {
            with (result) {
                repoLocal.userDao.insert(User(uid = uid, username = username, password = password))
            }
        } catch (ex: Exception) {
            Log.e(LOCAL_EXCEPTION_TAG, ex.toString())
            return RepoResult.InternalError
        }

        //all tasks done
        return RepoResult.PositiveResult()
    }

    fun signOutUser(): RepoResult {
        return try {
            repoLocal.userDao.delete()
            repoLocal.gameDao.deleteAll()
            RepoResult.PositiveResult()
        } catch (ex: Exception) {
            Log.e(LOCAL_EXCEPTION_TAG, ex.toString())
            RepoResult.InternalError
        }
    }

    suspend fun saveGame(gameScore: Int): RepoResult {
        val signedInUser = repoLocal.userDao.read()[0]

        return if (Network.isAvailable()) {
            try {
                repoRemote.postGameInfo(
                    uid = signedInUser.uid,
                    username = signedInUser.username,
                    numberOfGames = 1,
                    gameScore = gameScore)
                RepoResult.PositiveResult()
            } catch (ex: Exception) {
                Log.e(REMOTE_EXCEPTION_TAG, ex.toString())
                RepoResult.InternalError
            }
        } else {
            try {
                repoLocal.gameDao.insert(Game(uid = signedInUser.uid, gameScore = gameScore))
                RepoResult.NegativeResult
            } catch (ex: Exception) {
                Log.e(LOCAL_EXCEPTION_TAG, ex.toString())
                RepoResult.InternalError
            }
        }
    }

    suspend fun getHallOfFame(): RepoResult {
        return try {
            RepoResult.PositiveResult(data = repoRemote.fetchTopPlayers(HALL_OF_FAME_NUMBER))
        } catch (ex: Exception) {
            Log.e(REMOTE_EXCEPTION_TAG, ex.toString())
            return RepoResult.InternalError
        }
    }

    sealed class RepoResult {
        object InternalError: RepoResult()
        data class PositiveResult(val data: Any? = null): RepoResult()
        object NegativeResult: RepoResult()
    }

    companion object {
        const val REMOTE_EXCEPTION_TAG = "REPO REMOTE EXCEPTION"
        const val LOCAL_EXCEPTION_TAG = "REPO LOCAL EXCEPTION"
        const val HALL_OF_FAME_NUMBER = 25
    }

}