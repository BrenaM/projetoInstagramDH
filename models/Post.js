module.exports = (sequelize, DataTypes) => {

    // define(nomeModel, colunas, config)
    const Post = sequelize.define(
        "Post", {
            texto: DataTypes.STRING,
            img: DataTypes.STRING,
            n_likes: DataTypes.INTEGER
        }, {
            tableName: "posts",
            timestamps: false
        }
    );

    Post.associate = (models) => {
        // relação N:1 (vários posts de 1 usuario)
        Post.belongsTo(models.Usuario, { as: "usuario", foreignKey: "usuarios_id" });
        // relação 1:N (post tem varios comentarios)
        Post.hasMany(models.Comentario, { as: "comentarios", foreignKey: "posts_id" });
        // relação N:M (post tem curtidas de varios usuarios)
        Post.belongsToMany(models.Usuario, {
            as: "curtiu", // alias da relação
            through: "curtidas", // tabela intermediária
            foreignKey: "posts_id",
            otherKey: "usuarios_id",
            timestamps: false
        })
    }

    return Post;

}
