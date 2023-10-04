exports = function (payload) {
  const query = payload.query;
  const projection = {
    "user": 1,
  }

  const mongodb = context.services.get("mongodb-atlas");
  const mycollection = mongodb.db("financialhealthdatabase").collection("Users");
  
  
    const user = query.password;
  const cod = Buffer.from(user).toString('base64')
  console.log("codeficando: " + cod);
  
  const dec = Buffer.from(cod, 'base64').toString()
  console.log('decode:' + dec);
  
  // return mycollection.find( {"user": query.user, "password": query.password}).toArray();
// }
  try {
  
    return mycollection.findOne({"username": query.username, "password": cod}, projection)
      .then(result => {
        if (result) {
          return {
            "status": true,
            result

          };

        } else {
          return {
            "status": false,
            "message": "User not found",
            result
          }
        }
      })

  } catch (error) {
    return { msg: "Erro: " + error.message };
  }
}