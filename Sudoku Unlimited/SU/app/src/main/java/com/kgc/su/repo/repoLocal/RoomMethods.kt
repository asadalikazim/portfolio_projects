package com.kgc.su.repo.repoLocal

import javax.inject.Inject

class RoomMethods @Inject constructor(val userDao: UserDao, val gameDao: GameDao) {
}