// // This function is the endpoint's request handler.
// exports = function({ query, headers, body}, response) {
//     // Data can be extracted from the request as follows:

//     // Query params, e.g. '?arg1=hello&arg2=world' => {arg1: "hello", arg2: "world"}
//     const {arg1, arg2} = query;

//     // Headers, e.g. {"Content-Type": ["application/json"]}
//     const contentTypes = headers["Content-Type"];

//     // Raw request body (if the client sent one).
//     // This is a binary object that can be accessed as a string using .text()
//     const reqBody = body;

//     console.log("arg1, arg2: ", arg1, arg2);
//     console.log("Content-Type:", JSON.stringify(contentTypes));
//     console.log("Request body:", reqBody);

//     // You can use 'context' to interact with other application features.
//     // Accessing a value:
//     // var x = context.values.get("value_name");

//     // Querying a mongodb service:
//     // const doc = context.services.get("mongodb-atlas").db("dbname").collection("coll_name").findOne();

//     // Calling a function:
//     // const result = context.functions.execute("function_name", arg1, arg2);

//     // The return value of the function is sent as the response back to the client
//     // when the "Respond with Result" setting is set.
//     return  "Hello World!";
// };

exports = async function (payload, response) {
    const body = EJSON.parse(payload.body.text()); // Lê o corpo da solicitação e o converte para um objeto

    const mongodb = context.services.get("mongodb-atlas");
    const requests = mongodb.db("financialhealthdatabase").collection("Users");

    const projection = [{
        "mensagem": 'Sucesso',
    }]
    const user = body.password;
    const cod = Buffer.from(user).toString('base64')

    console.log("codeficando: " + cod);
    // Crie um objeto com os dados a serem inseridos
    const dataToInsert = {
        "username": body.username,
        "password": cod
    };

    try {
        return await requests.insertOne(dataToInsert)
            .then(result => {
                if (result) {
                    return {
                        "msg": "Usuário inserido com sucesso!"

                    };

                } else {
                    return {
                        "msg": "Ero ao inserir usuário!!"
                    }
                }
            })


        // if (result) {
        //     return { "msg": "Usuário inserido com sucesso!" };
        // }
        // else {
        //     return { "msg": "Ero ao inserir usuário!!" };
        // }
    } catch (error) {
        return { "msg": "Erro ao inserir o documento: " + error.message };
    }
}
