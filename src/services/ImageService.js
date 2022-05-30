const {  Pool } = require('pg')
const {nanoid} = require('nanoid')

const Jimp = require("jimp")

const InvariantError = require('../exception/InvariantError')
const NotFoundError = require('../exception/NotFoundError')
const AuthorizationError  = require('../exception/AuthorizationError')
const fs = require('fs')

class ImageService{
    constructor(){
        this._pool= new Pool();
    }
    async addImage(credentialId , {image}) {
        const id = "image-" + nanoid(16);
        const createdAt = new Date().toISOString()
        const insertAt = createdAt
        const nameFile = `image/${credentialId}/image/${id}`
        
        const query = {
            text : 'INSERT INTO image VALUES($1 , $2 , $3 , $4 ) RETURNING id',
            values : [id , nameFile , createdAt , insertAt]
        }
        
        const buffer = Buffer.from(image, "base64")

        const foldername = `image/${credentialId}/image/`

        try{
            if (!fs.existsSync(foldername)){
                fs.mkdirSync(foldername)
            }
        }catch(err){
            console.error(err)
        }

        Jimp.read(buffer , (err , res) => {
            if (err) throw new Error(err)

            res.quality(5).write(`image/${credentialId}/image/${id}.jpg`)
        })
        const result = await this._pool.query(query)

        if (!result.rows[0].id){
            throw new InvariantError("Image Failed Added")
        }
        return result.rows[0].id
    }
    async getImageById(id){

        const query = {
            text : 'SELECT * FROM image WHERE id = $1',
            values : [id]
        }

        const result = await this._pool.query(query)
        
        if(!result.rows.length){
            throw new NotFoundError("Image Not Found")
        }
        return result.rows.map(image => ({id : image.id , image : fs.readFileSync(image.image+'.jpg', 'base64')}))
    }
    
}
module.exports = ImageService