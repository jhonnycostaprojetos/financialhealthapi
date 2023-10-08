exports = async function (payload, response) {
  const body = EJSON.parse(payload.body.text()); // Lê o corpo da solicitação e o converte para um objeto

  const mongodb = context.services.get("mongodb-atlas");
  const requests = mongodb.db("financialhealthdatabase").collection("FixedExpenses");

  // Crie um objeto com os dados a serem inseridos
  const dataToInsert = {
    "description": body.description,
    "category": body.category,
    "status": body.status,
    "date": body.date,
    "value": body.value
  };

  const projection = {
    "description": 1,
    "category": 2
  }
  try {
    return await requests.insertOne(dataToInsert, projection)
      .then(result => {
        response.setStatusCode(201)
        return {
          result,

        }
      })
  } catch (error) {
    return { "msg": "Erro ao inserir o documento: " + error.message };
  }
}
