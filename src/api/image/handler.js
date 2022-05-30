const ClientError = require('../../exception/ClientError')

class ImageHandler {
    constructor(service, validator) {
        this._service = service
        this._validator = validator

        this.postImageHandler = this.postImageHandler.bind(this)
        this.getImageByIDHandler = this.getImageByIDHandler.bind(this)
        // this.getShopByIdHandler = this.getShopByIdHandler.bind(this)
        // this.putShopByIdHandler = this.putShopByIdHandler.bind(this)
        // this.deleteShopByIdHandler = this.deleteShopByIdHandler.bind(this)
    }
    async postImageHandler(request, h) {
        try {

            this._validator.validateImagePayload(request.payload);
            const { image } = request.payload;
            const { id: credentialId } = request.auth.credentials;

            const shopId = await this._service.addImage(credentialId , {
                image
            });

            const response = h.response({
                status: 'success',
                message: 'Image berhasil ditambahkan',
                data: {
                    shopId,
                },
            });
            response.code(201);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async getShopHandler(request) {
        const { id: credentialId } = request.auth.credentials;
        const notes = await this._service.getShops(credentialId);
        return {
            status: 'success',
            data: {
                notes,
            },
        };
    }
    async getImageByIDHandler(request, h) {
        try {
            const { id } = request.params;
            const user = await this._service.getImageById(id);
            
            return {
                status: 'success',
                data: {
                    user,
                },
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }
    async putShopByIdHandler(request , h) {
   
        try {
            const { id: credentialId } = request.auth.credentials;
            const { id } = request.params

            await this._service.verifyShopOwner(id  ,credentialId)
            const shopId = await this._service.editShosById(id , request.payload)
            const response = h.response({
                status: 'success',
                message: 'Toko berhasil DiUpdate',
            });
            response.code(201);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }
    async deleteShopByIdHandler(request , h) {
        try {
            const { id: credentialId } = request.auth.credentials;
            const { id } = request.params

            await this._service.verifyShopOwner(id  ,credentialId)
            await this._service.deleteShopById(id)
            const response = h.response({
                status: 'success',
                message: 'Toko berhasil Dihapus',
            });
            response.code(201);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }
}
module.exports = ImageHandler