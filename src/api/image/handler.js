const ClientError = require('../../exception/ClientError')

class SummaryHandler {
    constructor(service, validator) {
        this._service = service
        this._validator = validator

        this.postSummaryHandler = this.postSummaryHandler.bind(this)
        this.getSummaryHandler = this.getSummaryHandler.bind(this)
        this.getSummaryByIdHandler = this.getSummaryByIdHandler.bind(this)
        this.putSummaryByIdHandler = this.putSummaryByIdHandler.bind(this)
        this.deleteSummaryByIdHandler = this.deleteSummaryByIdHandler.bind(this)
        this.getSummaryPageHandler = this.getSummaryPageHandler.bind(this)
    }
    async getSummaryPageHandler(request , h){
        try {
            const { id: credentialId } = request.auth.credentials;
            const { id } = request.params;
            const summaryPage = await this._service.getSummaryPage(credentialId , id);
            const response = h.response({
                status: 'Sucess',
                data: {
                    summaryPage,
                }
            })
            response.code(201)
            return response
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
    async postSummaryHandler(request, h) {
        try {

            this._validator.validateSummaryPayload(request.payload);
            const { id_user, summary, summary_humidity, summary_temperature, summary_ldr, summary_flame, summary_mq } = request.payload;
            const { id: credentialId } = request.auth.credentials;
            const summaryID = await this._service.addSummary(credentialId, {
                id_user, summary, summary_humidity, summary_temperature, summary_ldr, summary_flame, summary_mq
            });

            const response = h.response({
                status: 'success',
                message: 'Summary berhasil ditambahkan',
                data: {
                    summaryID,
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

    async getSummaryHandler(request, h) {
        try {
            const { id: credentialId } = request.auth.credentials;
            const summaryAll = await this._service.getSummary(credentialId);
            
            const response = h.response( {
                status: 'Sucess',
                data: {
                    summaryAll,
                }
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
    async getSummaryByIdHandler(request, h) {
        try {
            const { id: credentialId } = request.auth.credentials;
            console.log(credentialId)

            const { id } = request.params;
            await this._service.verifySummary(id, credentialId)
            const summary = await this._service.getSummaryByID(id);

            const response = h.response({
                status: 'success',
                message: 'Summary Berhasil ditemukan',
                data: {
                    summary,
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
    async putSummaryByIdHandler(request, h) {

        try {

            const { id_user, summary, summary_humidity, summary_temperature, summary_ldr, summary_flame, summary_mq } = request.payload;
            const { id: credentialId } = request.auth.credentials;
            const { id } = request.params;
            await this._service.verifySummary(id, credentialId)

            await this._service.editSummaryById({ id, summary, summary_humidity, summary_temperature, summary_ldr, summary_flame, summary_mq })
            const response = h.response({
                status: 'success',
                message: 'Summary Berhasil DiUpdate',

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
    async deleteSummaryByIdHandler(request, h) {
        try {
            const { id: credentialId } = request.auth.credentials;
            const { id } = request.params
            await this._service.verifySummary(id, credentialId)
            await this._service.deleteSummary(id)
            const response = h.response({
                status: 'success',
                message: 'Summary berhasil Dihapus',
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
module.exports = SummaryHandler