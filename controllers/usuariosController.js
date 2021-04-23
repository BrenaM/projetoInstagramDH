const bcrypt = require('bcryptjs');
const { request, response } = require('express');
const { Usuario, sequelize } = require('../models');

const usuariosController = {
    index: async (request, response) => {
        let usuarios =  await Usuario.findAll();

        return response.render('usuarios', { listaUsuarios: usuarios });
    },

    registro: (request, response) => {
        //vai rederizer nosso registo ejs. na pg de usuario 
        return response.render('registro');
    },

    login: (require, response) => {
        return response.render('login');
    },

    create: async (request,response) => {
        const {nome, email, senha} = request.body;

        //criptografando e guardando a senha crypt
        const senhaCrypt = bcrypt.hashSync(senha, 10);

        const usuarioNovo = await Usuario.create({ 
            nome, 
            email, 
            senha: senhaCrypt
        });
        
        return response.redirect('/usuarios/login');
    },

    update: async (request, response) => {
        let {id} = request.params;
        let {nome, email, senha } = request.body;

        let usuarioAtualizado = await Usuario.update({
            nome, email, senha  
        }, {
            where: {id} 
        });

        return response.send(usuarioAtualizado)
    },

    delete: async (request, response) => {
        let {id} = request.params;
        
        let usuarioDeletado = await Usuario.destroy({
            where: {id}
        }); 
        return response.json(usuarioDeletado);
    }

};

module.exports = usuariosController;


