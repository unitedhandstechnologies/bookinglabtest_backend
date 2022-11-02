const db = require("../../config/dbConfig");
//const exception = require("../../../constants/exception.json");

const createPincode = async (req, res) => {
    try {
        const pincode = req.body;
        const now = new Date().toISOString();
        
        const existCircleId = await db.query(`SELECT * FROM circles WHERE id = $1;`,[req.params.circle_id]);
      if (existCircleId.rowCount == 0) {
        return res.status(404).send({ statusCode: 404, message:"Circle Not found with this id" });
      }

        const checkPincode = await db.query(`SELECT * FROM pincodes WHERE  pincode = '${pincode.pincode}'`);
        if (checkPincode.rowCount != 0) {
         return res.status(400).send({ statusCode: 400, message:"Pincode already exist"
           // pincode: exception.existpincode 
        });
        }    
        const newPincode = await db.query(
          `INSERT INTO pincodes (pincode,circle_id,created_at,updated_at) 
           VALUES ('${pincode.pincode}','${req.params.circle_id}','${now}','${now}')
            RETURNING *`);
            return res.status(201).send({statusCode:201, pincode:newPincode.rows[0]});
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

const getAllPincodes = async (req, res) => {
    try {
        const getPincode = await db.query(
            `SELECT * FROM pincodes`
        );
        return res.status(200).send({ statusCode: 200, pincodes: getPincode.rows });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

const getPincodeById = async (req, res) => {
    try {
        const getPincode = await db.query(
            `SELECT * FROM pincodes WHERE id = $1`,
            [req.params.id]
        );
        if (getPincode.rowCount == 0) {
            return res.status(404).send({ statusCode: 404, message:"There is no pincode found with this id", });
          }
        return res.status(200).send({ statusCode: 200, pincode: getPincode.rows[0] });
    } catch (err) {
        console.log(err);

        return res.status(500).send(err);
    }
};

const replacePincode = async (req, res) => {
    try {
        const pincode = req.body;
        const now = new Date().toISOString();
        const isPincodeExist = await db.query(
            `SELECT * FROM pincodes WHERE id = $1`,
            [req.params.id]
        );

        if (isPincodeExist.rowCount == 0) {
            return res.status(404).send({ status: 404, message:"There is no pincode found with this id"
//en.pincodeNotFoundWithId 
});
        }
        const updateQuery = `UPDATE pincodes SET 
                            pincode = '${pincode.pincode}',
                            updated_at = '${now}'
                            WHERE id = ${req.params.id}  RETURNING *`;

        const updatedData = await db.query(updateQuery);

        return res.status(200).send({ message: " pincode Updated Successfully", status:200, pincode:updatedData.rows[0]});
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

const updatePincode = async (req, res) => {
  try {
    let pincode = req.body;
    const now = new Date().toISOString();
    const existPincode = await db.query(
      `SELECT * FROM pincodes WHERE id = $1`,
      [req.params.id]);

    if (existPincode.rowCount == 0) {
      return res.status(404).send({ status: 404, message: "Pincode not found with this id"
      // en.pincodeNotFound 
    });
    }

    const updateQuery = `UPDATE pincodes SET 
                         pincode= '${pincode.pincode}',
                         updated_at = '${now}'
                         WHERE id = ${req.params.id}  RETURNING *`;

    const result = await db.query(updateQuery);
    return res.status(200).send({ message: " pincode Updated Successfully", status:200, pincode:result.rows[0]});
  } catch (err) {
    console.log(err);
    return res.status(500).send({ statusCode: 500, error: err });
  }
};

const deletePincode = async (req, res) => {
    try {
        const isPincodeExist = await db.query(
            `SELECT * FROM pincodes WHERE id = $1`,
            [req.params.id]
        );

        if (isPincodeExist.rowCount == 0) {
            return res.status(404).send({ status: 404, message:"There is no pincode found with this id"
//en.pincodeNotFoundWithId 
});
        }
        await db.query(`DELETE FROM pincodes WHERE id = ${req.params.id}`);
        return res.status(204).send({ status: 204, message:"pincode Deleted"
            // en.customerDeleted 
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

module.exports = {
    createPincode,
    getAllPincodes,
    getPincodeById,
    replacePincode,
    updatePincode,
    deletePincode,
};
