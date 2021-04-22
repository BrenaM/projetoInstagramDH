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
        let {nome, email, senha} = request.body;

        let usuarioNovo = await Usuario.create({ 
            nome, 
            email, 
            senha
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


