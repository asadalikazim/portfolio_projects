package com.kgc.su.repo.repoRemote

import com.google.firebase.firestore.DocumentReference
import com.google.firebase.firestore.FieldValue
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.Query
import javax.inject.Inject
import kotlinx.coroutines.tasks.await

class FirestoreMethods @Inject constructor(private val fireStore: FirebaseFirestore) {

    suspend fun fetchUserByName(username: String): FirestoreENT.UserInfo? {
        var userInfo: FirestoreENT.UserInfo? = null

        fireStore
            .collection(COLLECTION_USERS)
            .whereEqualTo(COLLECTION_USERS_FIELD_USERNAME, username)
            .limit(1)
            .get()
            .addOnSuccessListener { querySnapshot ->
                for (document in querySnapshot) {
                    userInfo = FirestoreENT.UserInfo(
                        document.id,
                        document.data[COLLECTION_USERS_FIELD_USERNAME] as String,
                        document.data[COLLECTION_USERS_FIELD_PASSWORD] as String)
                }
            }
            .await()

        return userInfo
    }

    suspend fun fetchUserByCred(username: String, password: String): FirestoreENT.UserInfo? {
        var userInfo: FirestoreENT.UserInfo? = null

        fireStore
            .collection(COLLECTION_USERS)
            .whereEqualTo(COLLECTION_USERS_FIELD_USERNAME, username)
            .whereEqualTo(COLLECTION_USERS_FIELD_PASSWORD, password)
            .limit(1)
            .get()
            .addOnSuccessListener { querySnapshot ->
                for (document in querySnapshot) {
                    userInfo = FirestoreENT.UserInfo(
                        document.id,
                        document.data[COLLECTION_USERS_FIELD_USERNAME] as String,
                        document.data[COLLECTION_USERS_FIELD_PASSWORD] as String)
                }
            }
            .await()

        return userInfo
    }

    suspend fun fetchUserById(uid: String): FirestoreENT.UserInfo? {
        var userInfo: FirestoreENT.UserInfo? = null

        fireStore
            .collection(COLLECTION_USERS)
            .document(uid)
            .get()
            .addOnSuccessListener { documentSnapshot ->
                documentSnapshot.data?.let {
                    userInfo = FirestoreENT.UserInfo(
                        documentSnapshot.id,
                        it[COLLECTION_USERS_FIELD_USERNAME] as String,
                        it[COLLECTION_USERS_FIELD_PASSWORD] as String)
                }
            }
            .await()

        return userInfo
    }

    suspend fun postUser(username: String, password: String): FirestoreENT.UserInfo? {
        var userInfo: FirestoreENT.UserInfo? = null

        val data = hashMapOf(
            COLLECTION_USERS_FIELD_USERNAME to username,
            COLLECTION_USERS_FIELD_PASSWORD to password
        )

        fireStore
            .collection(COLLECTION_USERS)
            .add(data)
            .addOnSuccessListener { documentReference ->
                userInfo = FirestoreENT.UserInfo(documentReference.id, username, password)
            }
            .await()

        return userInfo
    }

    suspend fun fetchTopPlayers(numberOfPlayers: Int): List<FirestoreENT.GameInfo> {
        val topPlayers: MutableList<FirestoreENT.GameInfo> = mutableListOf()

        fireStore
            .collection(COLLECTION_GAMES)
            .orderBy(COLLECTION_GAMES_FIELD_GAME_SCORE, Query.Direction.DESCENDING)
            .limit(numberOfPlayers.toLong())
            .get()
            .addOnSuccessListener { querySnapshot ->
                for (document in querySnapshot) {
                    with (document.data) {
                        topPlayers.add(
                            FirestoreENT.GameInfo(
                                uid = get(COLLECTION_GAMES_FIELD_USERID) as String,
                                username = get(COLLECTION_GAMES_FIELD_USERNAME) as String,
                                numberOfGames = (get(COLLECTION_GAMES_FIELD_GAME_NUM) as Long).toInt(),
                                totalScore = (get(COLLECTION_GAMES_FIELD_GAME_SCORE) as Long).toInt()
                            )
                        )
                    }
                }
            }
            .await()

        return topPlayers
    }

    suspend fun fetchGameInfo(uid: String): FirestoreENT.GameInfo? {
        var gameInfo: FirestoreENT.GameInfo? = null

        fireStore
            .collection(COLLECTION_GAMES)
            .whereEqualTo(COLLECTION_GAMES_FIELD_USERID, uid)
            .limit(1)
            .get()
            .addOnSuccessListener {  querySnapshot ->
                for (document in querySnapshot) {
                    with(document.data) {
                        gameInfo = FirestoreENT.GameInfo(
                            uid = get(COLLECTION_GAMES_FIELD_USERID) as String,
                            username = get(COLLECTION_GAMES_FIELD_USERNAME) as String,
                            numberOfGames = (get(COLLECTION_GAMES_FIELD_GAME_NUM) as Long).toInt(),
                            totalScore = (get(COLLECTION_GAMES_FIELD_GAME_SCORE) as Long).toInt()
                        )
                    }
                }
            }
            .await()

        return gameInfo
    }

    suspend fun postGameInfo(uid: String, username: String, numberOfGames: Int, gameScore: Int) {
        var docRef: DocumentReference? = null

         fireStore
             .collection(COLLECTION_GAMES)
             .whereEqualTo(COLLECTION_GAMES_FIELD_USERID, uid)
             .limit(1)
             .get()
             .addOnSuccessListener { querySnapshot ->
                 for (document in querySnapshot) {
                     docRef = document.reference
                 }
             }
             .await()

        docRef?.also {
            //game record exists for uid
            val updates = hashMapOf<String, Any?>(
                COLLECTION_GAMES_FIELD_GAME_NUM to FieldValue.increment(numberOfGames.toLong()),
                COLLECTION_GAMES_FIELD_GAME_SCORE to FieldValue.increment(gameScore.toLong())
            )
            it.update(updates)

        } ?: kotlin.run {
            //game record does not exist for uid
            val data = hashMapOf(
                COLLECTION_GAMES_FIELD_USERID to uid,
                COLLECTION_GAMES_FIELD_USERNAME to username,
                COLLECTION_GAMES_FIELD_GAME_NUM to numberOfGames,
                COLLECTION_GAMES_FIELD_GAME_SCORE to gameScore
            )
            fireStore
                .collection(COLLECTION_GAMES)
                .add(data)
        }
    }

    companion object {
        const val COLLECTION_USERS = "users"
        const val COLLECTION_USERS_FIELD_USERNAME = "username"
        const val COLLECTION_USERS_FIELD_PASSWORD = "password"

        const val COLLECTION_GAMES = "games"
        const val COLLECTION_GAMES_FIELD_USERID = "uid"
        const val COLLECTION_GAMES_FIELD_USERNAME = "username"
        const val COLLECTION_GAMES_FIELD_GAME_NUM = "numberOfGames"
        const val COLLECTION_GAMES_FIELD_GAME_SCORE = "totalScore"
    }
}