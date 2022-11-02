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

  module.exports ={ createUser};
