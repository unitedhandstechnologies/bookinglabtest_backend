const db = require("../../config/dbConfig");
//const exception = require("../../../constants/exception.json");

const createSample = async (req, res) => {
    try {
        const sample = req.body;
        const now = new Date().toISOString();
        
        const existOrderId = await db.query(`SELECT * FROM order_managements WHERE id = $1;`,[req.params.order_id]);
      if (existOrderId.rowCount == 0) {
        return res.status(404).send({ statusCode: 404, message:"Order Not found with this id" });
      }

        const checkSample = await db.query(`SELECT * FROM samples WHERE  barcode_id = '${sample.barcode_id}'`);
        if (checkSample.rowCount != 0) {
         return res.status(400).send({ statusCode: 400, message:"Barcode already exist"
        });
        }    
        const newSample = await db.query(
          `INSERT INTO samples (barcode_id,order_id,description,created_at,updated_at) 
           VALUES ('${sample.barcode_id}','${req.params.order_id}','${sample.description}','${now}','${now}')
            RETURNING *`);
            return res.status(201).send({statusCode:201, sample:newSample.rows[0]});
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

const getAllSample = async (req, res) => {
    try {
        const getSample = await db.query(
            `SELECT * FROM samples`
        );
        if (getSample.rowCount == 0) {
        
            return res.status(404).send({ status: 404, message:"No data found"});
          }
        return res.status(200).send({ statusCode: 200, sample: getSample.rows });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

const getSampleById = async (req, res) => {
    try {
        const getSample = await db.query(
            `SELECT * FROM samples WHERE id = $1`,
            [req.params.id]
        );
        return res.status(200).send({ statusCode: 200,message:"There is no sample found with this id", sample: getSample.rows[0] });
    } catch (err) {
        console.log(err);

        return res.status(500).send(err);
    }
};

const replaceSample = async (req, res) => {
    try {
        const Sample = req.body;
        const now = new Date().toISOString();
        const isSampleExist = await db.query(
            `SELECT * FROM samples WHERE id = $1`,
            [req.params.id]
        );

        if (isSampleExist.rowCount == 0) {
            return res.status(404).send({ status: 404, message:"Sample Not Found With this Id"
});
        }
        const updateQuery = `UPDATE samples SET 
                            barcode_id = '${Sample.barcode_id}',
                            order_id = '${Sample.order_id}',  
                            description = '${Sample.description}', 
                            updated_at = '${now}'
                            WHERE id = ${req.params.id}  RETURNING *`;

        const updatedData = await db.query(updateQuery);

        return res.status(200).send({ message: " Sample Updated Successfully", status:200, sample:updatedData.rows[0]});
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

const updateSample = async (req, res) => {
  try {
    let Sample = req.body;
    const now = new Date().toISOString();
    const existSample = await db.query(
      `SELECT * FROM samples WHERE id = $1`,
      [req.params.id]);

    if (existSample.rowCount == 0) {
      return res.status(404).send({ status: 404, message: "Sample not found with this id"
    });
    }
            const updateBarcode = Sample.barcode_id == null ? existSample.rows[0].barcode_id : Sample.barcode_id;
            const updateOrder = Sample.order_id == null ? existSample.rows[0].order_id : Sample.order_id;
            const updateDescription = Sample.description == null ? existSample.rows[0].description : Sample.description;


    const updateQuery = `UPDATE samples SET 
                        barcode_id = '${updateBarcode}',
                        order_id = '${updateOrder}', 
                        description = '${updateDescription}', 
                        updated_at = '${now}'
                        WHERE id = ${req.params.id}  RETURNING *`;

    const result = await db.query(updateQuery);
    return res.status(200).send(result.rows[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ statusCode: 500, error: err });
  }
};

const deleteSample = async (req, res) => {
    try {
        const isSampleExist = await db.query(
            `SELECT * FROM samples WHERE id = $1`,
            [req.params.id]
        );

        if (isSampleExist.rowCount == 0) {
            return res.status(404).send({ status: 404, message:"Sample Not Found With this Id"
});
        }
        await db.query(`DELETE FROM samples WHERE id = ${req.params.id}`);
        return res.status(204).send({ status: 204, message:"Sample Deleted"
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

module.exports = {
    createSample,
    getAllSample,
    getSampleById,
    replaceSample,
    updateSample,
    deleteSample
};
