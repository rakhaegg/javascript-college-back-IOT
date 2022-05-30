require('dotenv').config()


const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt')

const user = require('./api/users')
const UserService = require('./services/users/UsersService')
const UsersValidator = require('./validator/users')
 


const authentications = require('./api/authentications')
const AuthenticationsService = require('./services/AuthenticationService')
const TokenManager = require('./tokenize/TokenManager')
const AuthenticationsValidator = require('./validator/authentication');



const image = require('./api/image')
const ImageService = require('./services/ImageService')
const ImageValidator = require('./validator/image')

const init = async () => {

    const userService = new UserService()
    const authenticationsService = new AuthenticationsService();
    const imageService = new ImageService()

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            }
        }

    })
  
    await server.register([
        {
            plugin: Jwt
        }
    ])

    server.auth.strategy('image', 'jwt', {
        keys: process.env.ACCESS_TOKEN_KEY,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: process.env.ACCESS_TOKEN_AGE,
        },
        validate: (artifacts) => ({
            isValid: true,
            credentials: {
                id: artifacts.decoded.payload.id,
            },
        }),
    })
    await server.register([
        {
            plugin: user,
            options: {
                service: userService,
                validator: UsersValidator
            }
        },
        {
            plugin : image ,
            options : {
                service : imageService,
                validator : ImageValidator
            }
        },
        {
            plugin: authentications,
            options: {
                authenticationsService,
                userService,
                tokenManager: TokenManager,
                validator: AuthenticationsValidator,
            },
        },
    ])
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};
 
init()