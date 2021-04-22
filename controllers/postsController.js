const {request, response} = require('express');
const { Post, sequelize } = require('../models');

const postsController = {
    index: async (request, response) => {
        let posts = await Post.findAll({
            include: ['usuario', 'comentarios', 'curtiu']
        }); 
        return response.render('index', { listaPosts: posts});
    },

    show: async (request, response) => {
        let {usuarios_id} = request.params; //filtra pelo id do usuario
        
        let postsUsuario = await Post.findAll({
            where:{usuarios_id}
        })
        return response.json(postsUsuario);
    },

    create: async (request,response) => {
        let {
            texto,
            img, 
            usuarios_id,
            n_likes} = request.body;

        let novoPost = await Post.create({ 
            texto, img, usuarios_id, n_likes
        });
        
        return response.json(novoPost);
    },

    update: async (request, response) => {
        let {id} = request.params;
        let {texto, img, usuarios_id, n_likes } = request.body;

        let postAtualizado = await Post.update(
            {
            texto,img, usuarios_id, n_likes  
        }, {
            where: {id} 
        });

        return response.send(postAtualizado)
    },

    delete: async (request, response) => {
        let {id} = request.params;
        
        let postDeletado = await Post.destroy({
            where: {id}
        }); 
        return response.json(postDeletado);
    }
}

module.exports = postsController;