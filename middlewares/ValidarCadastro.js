const {Usuario} = require('../models');

module.exports = async (request, response, next) => {
    let {email, senha} = request.body;
    let user = await Usuario.findAll({ where: {email} });

    if (user.length) {
        response.status(400).json({erro: "email já cadastrado"})
        return;

    }else {
        if (senha.length < 6 || senha.length > 12){
            response.status(400).json({erro: "senha invalida"})
        }else {
            next()
        }
    }
}