const db = require("../../config/dbConfig");
const exception = require("../../constants/exception.json");

const createUser = async (req, res) => {
    try {
      const now = new Date().toISOString();
      const user = req.body;
      const existMobileNumber = await db.query(
        `SELECT * FROM users WHERE mobile_number = $1;`,
        [user.mobile_number]
      );
  
      if (existMobileNumber.rowCount != 0)
        return res
          .status(400)
          .send({message:exception.alreadyExist});
          
const newUser = await db.query(
  `INSERT INTO users (mobile_number,created_at) VALUES('${user.mobile_number}','${now}') RETURNING *`
);

return res.status(201).send({user:newUser.rows[0]});


} catch (err) {
console.log(err);
return res.status(500).send({Error:err});
}
};


const getUserById = async (req, res) => {
try {
const userDetails =req.params;
const user = await db.query(
  `SELECT * FROM users WHERE id = $1;`,
  [userDetails.id]
);
if (user.rowCount == 0) {
  return res
    .status(404)
    .send({message: exception.idNotFound });
}
return res
    .status(200)
    .send({ user: user.rows[0] });
} catch (err) {
console.log(err);
return res.status(500).send({Error: err});
}
};

const getAllUser = async (req ,res) => {
try {
const user = await db.query('SELECT * FROM users');
if (user.rowCount == 0) {
return res
  .status(404)
  .send({message: exception.dataNotFound });
}
return res
    .status(200)
    .send({ users: user.rows });
}catch (err) {
console.log(err);
return res.status(500).send({Error: err});
}
};

const deleteUser = async (req, res) => {
try {
const userDetails =req.params;
const user = await db.query(
  `SELECT * FROM users WHERE id = $1;`,
  [userDetails.id]
);
if (user.rowCount == 0) {
  return res
    .status(404)
    .send({message: exception.idNotFound });
}
await db.query(
  `DELETE FROM users WHERE id = ${userDetails.id}`
);
return res.status(204).send({message:exception.deleted});
}catch (err) {
console.log(err);
return res.status(500).send({Error: err});
}
};

const updateUser = async (req, res) => {
try {
const userDetails =req.params;
const updateDetails = req.body;
const now = new Date().toISOString();
const user = await db.query(
`SELECT * FROM users WHERE id = $1;`,
[userDetails.id]
);
if (user.rowCount == 0) {
return res
  .status(404)
  .send({message: exception.idNotFound });
}
const updateQuery = `UPDATE users SET 
mobile_number = '${updateDetails.mobile_number}',
updated_at = '${now}'
WHERE id = ${userDetails.id} RETURNING *`;

const result = await db.query(updateQuery);
return res.status(200).send({updateUser:result.rows[0]});

}catch (err) {
console.log(err);
return res.status(500).send({Error: err});
}
};

const replaceUser = async (req, res) => {
try {
const userDetails =req.params;
const replaceDetails = req.body;
const now = new Date().toISOString();
const user = await db.query(
`SELECT * FROM users WHERE id = $1;`,
[userDetails.id]
);
if (user.rowCount == 0) {
return res
  .status(404)
  .send({message: exception.idNotFound });
}
const replaceQuery = `UPDATE users SET 
mobile_number = '${replaceDetails.mobile_number}',
updated_at = '${now}'
WHERE id = ${userDetails.id} RETURNING *`;

const result = await db.query(replaceQuery);
return res.status(200).send({replaceUser:result.rows[0]});

}catch (err) {
console.log(err);
return res.status(500).send({Error: err});
}
};

module.exports ={ createUser,
              getUserById,
              getAllUser,
              deleteUser,
              updateUser,
              replaceUser
            };