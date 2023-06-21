'use strict'

const { ObjectId } = require("mongodb");
const { getDb } = require("../config/mongoConnection")

class User {

    static getCollections() {
        const db = getDb()
        const users = db.collection('users')
        return users
    }

    static async findByEmail(email) {
        return await this.getCollections().findOne({ email: email })
    }

    static async createUser(body) {
        const { email, password, username, role, phoneNumber, address } = body
        return this.getCollections().insertOne({
            email, password, username, role, phoneNumber, address
        })
    }
}

module.exports = User