package com.kgc.su.repo.repoRemote

sealed class FirestoreENT {
    data class UserInfo(
        val uid: String,
        val username: String,
        val password: String
    )

    data class GameInfo(
        val uid: String,
        val username: String,
        val numberOfGames: Int,
        val totalScore: Int
    )
}