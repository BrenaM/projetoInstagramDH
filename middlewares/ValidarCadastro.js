const {Usuario} = require('../models');

module.exports = async (request, response, next) => {
    let {email, senha, nome} = request.body;
    let user = await Usuario.findAll({ where: {email} });

    if(!nome || !email || !senha){
        return response.status(400).json({erro: "Você precisa preencher todas as opções."})  
    } else {
        if (user.length) {
            return response.status(400).json({erro: "email já cadastrado"})

        }else {
            if (senha.length < 6 || senha.length > 12){
             response.status(400).json({erro: "senha invalida"})
            }else {
                next()
            }
        }
    }
}