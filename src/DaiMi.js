import httpBuildQuery from 'http-build-query'
import fetch from 'node-fetch'
import crypto from 'crypto'
import defs from './defs'

class DaiMi {
    API_ENDPOINT = 'https://api.daimiyun.cn/v2/'

    constructor(config) {
        this._config = config
    }

    async createTrade({ type, price, descp, trade, }) {
        if (price <= 0) {
            throw new Error('Price should > 0')
        }

        if (defs.VaildType.indexOf(type) === -1) {
            throw new Error('Payment type not support')
        }

        const config = this._config[type]

        const body = {
            trade,
            price,
            phone: config.phone,
            mchid: config.mchid,
            subject: descp,
            body: descp,
        }

        body.sign = DaiMi.sign(body, config.key)
        return await fetch(`${DaiMi.API_ENDPOINT}/${type}/create`, {
            method: 'post',
            body,
        })
    }

    static keySort(obj) {
        const ordered = {}

        Object.keys(obj).sort(-1).forEach(function(key) {
            ordered[key] = obj[key]
        })

        return ordered
    }

    static sign(query, key) {
        delete query.sign
        const queryString = httpBuildQuery(DaiMi.keySort(query))
        const sign = crypto.createHash('sha256')
            .update(queryString + key, 'utf8').digest('hex').toString()

        const signedKey = crypto.createHash('sha256')
            .update(key, 'utf8').digest('hex').toString()

        return crypto.createHash('sha1')
            .update(sign + signedKey, 'utf8').digest('hex').toString()
    }

    static checkSign(query, key) {
        const sign = query.sign

        if (sign === undefined) {
            return false
        }

        return DaiMi.sign(query, key) === sign
    }
}

export default DaiMi
