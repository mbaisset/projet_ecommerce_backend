const mysql = require('mysql')


function connectToDataBase() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Welcome01!',
        database: 'ecommerce'
    })

    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack)
            return
        }
        console.log('connected as id ' + connection.threadId)
        return connection
    })

    return connection

}

const product={name: 'test', quickdescription: 'test', price: 5, image: 'test', gamelanguage: 'test', fromage: 1, minimumduration: 1, maximumduration: 2, minimumplayers: 1, maximumplayer: 2, longdescription: 'test', mecanisms: 'test', authors: 'test', illustrators: 'test', editor: 'test'}


function dbAddNewProduct(productToAdd, bdd_result_management_function) {
    const values = [productToAdd['name'], productToAdd['quickdescription'], parseFloat(productToAdd['price']), productToAdd['image'],productToAdd['gamelanguage'],
    parseFloat(productToAdd['fromage']),parseFloat(productToAdd['minimumduration']),parseFloat(productToAdd['maximumduration']),parseFloat(productToAdd['minimumplayers']),parseFloat(productToAdd['maximumplayers']),
                            productToAdd['longdescription'],productToAdd['mecanisms'],productToAdd['authors'],productToAdd['illustrators'],productToAdd['editor']]
    const connection = connectToDataBase()
    const query = "INSERT INTO products (name, quickdescription, price, image, gamelanguage, fromage, minimumduration, maximumduration, minimumplayers, maximumplayers, longdescription, mecanisms, authors, illustrators, editor) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    connection.query(query, values, bdd_result_management_function)
    connection.commit()
    connection.end()
}

function dbModifyProduct(productToModify, bdd_result_management_function) {
    const values = [productToModify['name'], productToModify['quickdescription'], parseFloat(productToModify['price']), productToModify['image'],productToModify['gamelanguage'],
    parseFloat(productToModify['fromage']),parseFloat(productToModify['minimumduration']),parseFloat(productToModify['maximumduration']),parseFloat(productToModify['minimumplayers']),parseFloat(productToModify['maximumplayers']),
    productToModify['longdescription'],productToModify['mecanisms'],productToModify['authors'],productToModify['illustrators'],productToModify['editor'], productToModify['id']]
    console.log(values)
    const connection = connectToDataBase()
    const query = "UPDATE products SET name = ?, quickdescription = ?, price = ?, image = ?, gamelanguage = ?, fromage = ?, minimumduration = ?, maximumduration = ?, minimumplayers = ?, maximumplayers = ?, longdescription = ?, mecanisms = ?, authors = ?, illustrators = ?, editor = ? WHERE id = ? "
    connection.query(query, values, bdd_result_management_function)
    connection.commit()
    connection.end()
}

function dbDeleteProduct(idProductToDelete, bdd_result_management_function){
    const connection = connectToDataBase()
    const query = 'DELETE FROM products WHERE id = ?'
    connection.query(query, idProductToDelete, bdd_result_management_function)
    connection.commit()
    connection.end()
}

function dbGetProductDetail (id, bdd_result_management_function) {
    console.log(id)
    const connection = connectToDataBase()
    const query = "SELECT * FROM products WHERE id = ?"
    connection.query(query, id, bdd_result_management_function)
    connection.end()
}

function dbGetAllProducts (bdd_result_management_function) {
    const connection = connectToDataBase()
    connection.query('SELECT * FROM products', bdd_result_management_function)
    connection.end()
}

function dbCheckLogin (loginInformation, bdd_result_management_function) {
    console.log("*********** login information: ", loginInformation)
    const connection = connectToDataBase()
    const values = [loginInformation['login'], loginInformation['password']]
    const query = 'SELECT * FROM users WHERE login = ? AND password = ?'
    connection.query(query, values, bdd_result_management_function)
    connection.end()
}

module.exports = {
    dbAddNewProduct,
    dbGetAllProducts,
    dbGetProductDetail,
    dbDeleteProduct,
    dbModifyProduct,
    dbCheckLogin,
}

