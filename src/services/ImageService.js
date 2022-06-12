const { Pool } = require('pg')
const { nanoid } = require('nanoid')

const Jimp = require("jimp")

const InvariantError = require('../exception/InvariantError')
const NotFoundError = require('../exception/NotFoundError')
const AuthorizationError = require('../exception/AuthorizationError')
const fs = require('fs')
const { query } = require('@hapi/hapi/lib/validation')

class ImageService {
    constructor() {
        this._pool = new Pool();
    }
    async addSummary(credentialId, { id_user, summary, summary_humidity, summary_temperature, summary_ldr, summary_flame, summary_mq  }) {
        const id = "summary-" + nanoid(16);
        const createdAt = new Date().toISOString()
        const insertAt = createdAt
        const query = {
            text: 'INSERT INTO summary VALUES($1 , $2 , $3 , $4 , $5 , $6 , $7 , $8 ,$9,$10) RETURNING id',
            values: [id, id_user, summary, summary_humidity, summary_temperature, summary_ldr, summary_flame, summary_mq , createdAt, insertAt]
        }

        const result = await this._pool.query(query)

        if (!result.rows[0].id) {
            throw new InvariantError("Summary Failed Added")
        }
        return result.rows[0].id
    }
    async getSummary(id){
        console.log("TEST")
        console.log(id)
        const query = {
            text : 'SELECT * FROM summary WHERE id_user = $1',
            values : [id]
        }
        const result = await this._pool.query(query)
        if(!result.rows.length){
            throw new NotFoundError("Summary Not Found");
        }
        console.log(result)
        return result.rows.map((value) => ({
            id : value.id ,
            id_user : value.id_user,
            summary : value.summary,
            summary_humidity : value.summary_humidity,
            summary_temperature : value.summary_temperature,
            summary_ldr : value.summary_ldr,
            summary_flame : value.summary_flame,
            summary_mq : value.summary_mq,
            created_at : value.created_at,
            updated_at : value.updated_at
        }))
    }
    async getSummaryPage(credentialId , id){
        console.log("USER ID" , credentialId)
        console.log("JUMLAH PAGE")
        const limit = 2
        var offset = 0
        if(id == 1){
            offset = 0
        }else if(id == 2){
            offset = 2
        }else if(id == 3){
            offset = 4
        }else if(id == 4){
            offset = 6 
        }
    
        const query = {
            text : 'SELECT * FROM summary WHERE id_user = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3 ',
            values : [credentialId  , limit , offset]
        }
        const result = await this._pool.query(query)
        if(!result.rows.length){
            throw new NotFoundError("Summary Not Found");
        }
        return result.rows.map((value) => ({
            id : value.id ,
            id_user : value.id_user,
            summary : value.summary,
            summary_humidity : value.summary_humidity,
            summary_temperature : value.summary_temperature,
            summary_ldr : value.summary_ldr,
            summary_flame : value.summary_flame,
            summary_mq : value.summary_mq,
            created_at : value.created_at,
            updated_at : value.updated_at
        }))
    }
    async getSummaryByID(id) {

        const query = {
            text: 'SELECT * FROM summary WHERE id = $1',
            values: [id]
        }

        const result = await this._pool.query(query)

        if (!result.rows.length) {
            throw new NotFoundError("Summary Not Found")
        }
        return result.rows.map(summary => ({ id: summary.id, id_user: summary.id_user , 
                summary: summary.summary,
                summary_humidity : summary.summary_humidity,
                summary_temperature : summary.summary_temperature,
                summary_ldr : summary.summary_ldr,
                summary_flame : summary.summary_flame,
                summary_mq : summary.summary_mq,
        }))
    }
    async verifySummary(id , owner){
        const query = {
            text : 'SELECT * FROM summary WHERE id = $1',
            values : [id]
        }
        const result = await this._pool.query(query);
        if(!result.rows.length){
            throw new NotFoundError("Summary Tidak Ditemukan")
        }
        const summary = result.rows[0];
        if(summary.id_user !== owner){
            throw new AuthorizationError("Anda tidak Boleh Mengedit Ini")
        }

    }
    async editSummaryById({ id, summary, summary_humidity, summary_temperature, summary_ldr, summary_flame, summary_mq }){
        const updateAt = new Date().toISOString()
        console.log(id)
        const query = {
            text : 'UPDATE summary set summary=$1 , summary_humidity=$2 , summary_temperature=$3 , summary_ldr=$4 , summary_flame=$5 , summary_mq=$6 , updated_at=$7  WHERE ID = $8 RETURNING id',
            values : [summary , summary_humidity , summary_temperature , summary_ldr , summary_flame , summary_mq , updateAt ,id ]
        }
        const result = await this._pool.query(query)
        if(!result.rows.length){
            throw new NotFoundError("Gagal Memperbarui Summary")
        }
    }
    async deleteSummary(id){
        const query = {
            text : 'DELETE FROM summary summary WHERE id = $1 RETURNING id',
            values : [id]
        }
        const result = await this._pool.query(query);

        if(!result.rows.length){
            throw new NotFoundError("Summary Gagal dihapus , id tidak ditemukan ")
        }
    }

}
module.exports = ImageService