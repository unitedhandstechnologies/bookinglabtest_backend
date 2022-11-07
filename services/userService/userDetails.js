const db = require("../../config/dbConfig");
const exception = require("../../constants/exception.json");

const createUserDetails = async (req, res) => {
    try {
      const now = new Date().toISOString();
      const user = req.params;
      const userDetails = req.body;
      const existUser = await db.query(
        `SELECT * FROM users WHERE id = $1;`,
        [user.userId]
      );
      const existUserDetails = await db.query(
        `SELECT * FROM user_details WHERE mobile_number = $1;`,
        [userDetails.mobile_number]
      );
  
      if (existUser.rowCount == 0)
        return res
          .status(404)
          .send({message:exception.idNotFound});

      if (existUserDetails.rowCount != 0)
        return res
          .status(404)
          .send({message:exception.alreadyExist});

          
      const newUserDetails = await db.query(
        `INSERT INTO user_details (user_id,first_name,last_name,dob,mobile_number,email,gender,relationship,created_at) 
        VALUES('${user.userId}','${userDetails.first_name}','${userDetails.last_name}','${userDetails.dob}','${userDetails.mobile_number}','${userDetails.email}','${userDetails.gender}','${userDetails.relationship}','${now}') RETURNING *`
      );
  
      return res.status(201).send(newUserDetails.rows[0]);
  
    } catch (err) {
      console.log(err);
      return res.status(500).send({Error:err});
    }
  };

  const getUserDetailsById = async (req, res) => {
    try {
      const userDetailsParam =req.params;
      const user = await db.query(
        `SELECT * FROM users WHERE id = $1;`,
        [userDetailsParam.userId]
      );

      if (user.rowCount == 0) {
        return res
          .status(404)
          .send({message: exception.idNotFound });
      }

      const userDetails = await db.query(
        `SELECT * FROM user_details WHERE user_id =$1 AND id = $2;`,
        [userDetailsParam.userId,userDetailsParam.id]
      );
      
      if (userDetails.rowCount == 0) {
        return res
          .status(404)
          .send({message: exception.idNotFound });
      }
      return res
          .status(200)
          .send({ user: userDetails.rows[0] });
    } catch (err) {
      console.log(err);
      return res.status(500).send({Error: err});
    }
  };

  const getAllUserDetails = async (req ,res) => {
    try {
      const userDetails = await db.query(
        `SELECT * FROM user_details`,
      );

      if (userDetails.rowCount == 0) {
        return res
          .status(404)
          .send({message: exception.dataNotFound });
      }
     return res
          .status(200)
          .send({ allUserDetails: userDetails.rows });
     }catch (err) {
        console.log(err);
        return res.status(500).send({Error: err});
    }
  };

  const getUsersAllUserDetails = async (req ,res) => {
    try {
      const userDetailsParam =req.params;
      const userDetails = await db.query(
        `SELECT * FROM user_details WHERE user_id = $1`,
        [userDetailsParam.userId]
      );

      if (userDetails.rowCount == 0) {
        return res
          .status(404)
          .send({message: exception.idNotFound });
      }
     return res
          .status(200)
          .send({ usersAllUserDetails: userDetails.rows });
     }catch (err) {
        console.log(err);
        return res.status(500).send({Error: err});
    }
  };
  
const deleteUserDetails = async (req, res) => {
  try {
    const userDetailsParams =req.params;
      const user = await db.query(
        `SELECT * FROM users WHERE id = $1;`,
        [userDetailsParams.userId]
      );
      if (user.rowCount == 0) {
        return res
          .status(404)
          .send({message: exception.idNotFound });
      }
      const userDetails = await db.query(
        `SELECT * FROM user_details WHERE user_id =$1 AND id = $2;`,
        [userDetailsParams.userId,userDetailsParams.id]
      );
      
      if (userDetails.rowCount == 0) {
        return res
          .status(404)
          .send({message: exception.idNotFound });
      }
      await db.query(
        `DELETE FROM user_details WHERE id = ${userDetailsParams.id}`
      );
      return res.status(204).send({message:exception.deleted});
    }catch (err) {
      console.log(err);
      return res.status(500).send({Error: err});
    }
};

const updateUserDetails = async (req, res) => {
  try {
    const updateDetails = req.body;
    const now = new Date().toISOString();
    const userDetailsParams =req.params;
      const user = await db.query(
        `SELECT * FROM users WHERE id = $1;`,
        [userDetailsParams.userId]
      );
      if (user.rowCount == 0) {
        return res
          .status(404)
          .send({message: exception.idNotFound });
      }
      const userDetails = await db.query(
        `SELECT * FROM user_details WHERE user_id =$1 AND id = $2;`,
        [userDetailsParams.userId,userDetailsParams.id]
      );
      
      if (userDetails.rowCount == 0) {
        return res
          .status(404)
          .send({message: exception.idNotFound });
      }

      const first_name = updateDetails.first_name == null ? userDetails.rows[0].first_name : updateDetails.first_name;
      const last_name = updateDetails.last_name == null ? userDetails.rows[0].last_name : updateDetails.last_name;
      const dob = updateDetails.dob == null ? userDetails.rows[0].dob : updateDetails.dob;
      const mobile_number = updateDetails.mobile_number == null ? userDetails.rows[0].mobile_number : updateDetails.mobile_number;
      const email = updateDetails.email == null ? userDetails.rows[0].email : updateDetails.email;
      const gender = updateDetails.gender == null ? userDetails.rows[0].gender : updateDetails.gender;
      const relationship = updateDetails.relationship == null ? userDetails.rows[0].relationship : updateDetails.relationship;

    const updateQuery = `UPDATE user_details SET 
    first_name = '${first_name}',
    last_name = '${last_name}',
    dob = '${dob}',
    mobile_number = '${mobile_number}',
    email = '${email}',
    gender = '${gender}',
    relationship = '${relationship}',
    updated_at = '${now}'
    WHERE id = ${userDetailsParams.id} RETURNING *`;

    const result = await db.query(updateQuery);
    return res.status(200).send({updateUser:result.rows[0]});

  }catch (err) {
    console.log(err);
    return res.status(500).send({Error: err});
  }
};

const replaceUserDetails = async (req, res) => {
  try {
    const replaceDetails = req.body;
    const now = new Date().toISOString();
    const userDetailsParams =req.params;
      const user = await db.query(
        `SELECT * FROM users WHERE id = $1;`,
        [userDetailsParams.userId]
      );
      if (user.rowCount == 0) {
        return res
          .status(404)
          .send({message: exception.idNotFound });
      }
      const userDetails = await db.query(
        `SELECT * FROM user_details WHERE user_id =$1 AND id = $2;`,
        [userDetailsParams.userId,userDetailsParams.id]
      );
      
      if (userDetails.rowCount == 0) {
        return res
          .status(404)
          .send({message: exception.idNotFound });
      }
    const replaceQuery = `UPDATE user_details SET 
    first_name = '${replaceDetails.first_name}',
    last_name = '${replaceDetails.last_name}',
    dob = '${replaceDetails.dob}',
    mobile_number = '${replaceDetails.mobile_number}',
    email = '${replaceDetails.email}',
    gender = '${replaceDetails.gender}',
    relationship = '${replaceDetails.relationship}',
    updated_at = '${now}'
    WHERE id = ${userDetailsParams.id} RETURNING *`;

    const result = await db.query(replaceQuery);
    return res.status(200).send({updateUser:result.rows[0]});

  }catch (err) {
    console.log(err);
    return res.status(500).send({Error: err});
  }
};

  module.exports ={ createUserDetails,
                    getUserDetailsById,
                    getAllUserDetails,
                    getUsersAllUserDetails,
                    deleteUserDetails,
                    updateUserDetails,
                    replaceUserDetails
                  };