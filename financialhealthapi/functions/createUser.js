exports = async function (payload, response) {
    const body = EJSON.parse(payload.body.text()); // Lê o corpo da solicitação e o converte para um objeto

    const mongodb = context.services.get("mongodb-atlas");
    const requests = mongodb.db("financialhealthdatabase").collection("Users");

    const passwordUser = body.password;
    const codePassword = Buffer.from(passwordUser).toString('base64')

    // Crie um objeto com os dados a serem inseridos
    const dataToInsert = {
        "username": body.username,
        "password": codePassword
    };

    try {
        await requests.insertOne(dataToInsert);
        return response
            .setStatusCode(201)
    } catch (error) {
        return { "msg": "Erro ao inserir o documento: " + error.message };
    }
}
