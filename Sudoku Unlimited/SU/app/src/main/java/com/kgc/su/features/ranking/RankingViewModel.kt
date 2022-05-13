package com.kgc.su.features.ranking

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.kgc.su.repo.Repo
import com.kgc.su.repo.repoRemote.FirestoreENT
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class RankingViewModel @Inject constructor(private val repo: Repo) : ViewModel() {

    private val _result = MutableLiveData<RankingViewResult>()
    val result: LiveData<RankingViewResult> = _result

    private fun applyResult(result: RankingViewResult) {
        _result.postValue(result)
    }

    fun processInputs(input: RankingViewInput) {
        when (input) {
            is RankingViewInput.InitialSetup -> initialSetup()
        }
    }

    private fun initialSetup() {
        viewModelScope.launch(Dispatchers.IO) {
            when (val repoResult = repo.getHallOfFame()) {
                is Repo.RepoResult.PositiveResult -> {
                    applyResult(RankingViewResult.InitialSetup(data = repoResult.data!! as List<FirestoreENT.GameInfo>))
                }
                is Repo.RepoResult.InternalError -> {
                    applyResult(RankingViewResult.ErrorFetching(toast = "Error fetching rankings! Please try again later."))
                }
            }
        }
    }
}