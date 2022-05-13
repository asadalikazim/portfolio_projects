package com.kgc.su.network

import android.content.Context
import android.net.ConnectivityManager
import android.net.Network
import android.net.NetworkCapabilities
import android.net.NetworkRequest

object Network: ConnectivityManager.NetworkCallback() {

    private lateinit var connectivityManager: ConnectivityManager
    private lateinit var networkRequest: NetworkRequest

    private var available = false

    fun build(context: Context) {
        connectivityManager = context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager

        if (!this::networkRequest.isInitialized) {
            networkRequest =  NetworkRequest.Builder()
                .addTransportType(NetworkCapabilities.TRANSPORT_CELLULAR)
                .addTransportType(NetworkCapabilities.TRANSPORT_WIFI)
                .build()
        }
    }

    fun register() {
        connectivityManager.registerNetworkCallback(networkRequest, this@Network)
    }

    fun unregister() {
        connectivityManager.unregisterNetworkCallback(this@Network)
    }

    fun isAvailable(): Boolean {
        return available
    }

    override fun onAvailable(network: Network) {
        super.onAvailable(network)
        available = true
    }

    override fun onLost(network: Network) {
        super.onLost(network)
        available = false
    }

}