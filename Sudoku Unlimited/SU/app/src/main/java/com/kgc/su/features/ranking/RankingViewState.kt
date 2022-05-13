package com.kgc.su.features.ranking

import com.kgc.su.repo.repoRemote.FirestoreENT

sealed class RankingViewInput{
    object InitialSetup: RankingViewInput()
}

sealed class RankingViewResult{
    data class InitialSetup(val data: List<FirestoreENT.GameInfo>): RankingViewResult()
    data class ErrorFetching(val toast: String): RankingViewResult()
}