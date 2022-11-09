const db = require("../../config/dbConfig");
//const exception = require("../../../constants/exception.json");

const createResult = async (req, res) => {
    try {
        const Result = req.body;
        const now = new Date().toISOString();
        
        const checkResult = await db.query(`SELECT * FROM results WHERE user_id = '${Result.user_id}'`);
        if (checkResult.rowCount != 0) {
         return res.status(400).send({ statusCode: 400, message:"Result already exist"
        });
        }    
        const newResult = await db.query(
          `INSERT INTO results (user_id,order_id,test_details_id,employee_id,lis_id,result,description,created_at,updated_at) 
           VALUES ('${Result.user_id}','${Result.order_id}','${Result.test_details_id}','${Result.employee_id}','${Result.lis_id}','${Result.result_id}','${Result.description}','${now}','${now}')
            RETURNING *`);
            return res.status(201).send({statusCode:201, result:newResult.rows[0]});
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

const getAllResult = async (req, res) => {
    try {
        const getResult = await db.query(
            `SELECT * FROM results`
        );
        return res.status(200).send({ statusCode: 200, result: getResult.rows });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

const getResultById = async (req, res) => {
    try {
        const getResult = await db.query(
            `SELECT * FROM results WHERE id = $1`,
            [req.params.id]
        );
        return res.status(200).send({ statusCode: 200,message:"There is no result found with this id", result: getResult.rows[0] });
    } catch (err) {
        console.log(err);

        return res.status(500).send(err);
    }
};

const replaceResult = async (req, res) => {
    try {
        const Result = req.body;
        const now = new Date().toISOString();
        const isResultExist = await db.query(
            `SELECT * FROM results WHERE id = $1`,
            [req.params.id]
        );

        if (isResultExist.rowCount == 0) {
            return res.status(404).send({ status: 404, message:"Result Not Found With this Id"
});
        }
        const updateQuery = `UPDATE results SET 
                            user_id = '${Result.user_id}',
                            order_id = '${Result.order_id}', 
                            test_details_id = '${Result.test_details_id}', 
                            employee_id = '${Result.employee_id}', 
                            lis_id = '${Result.lis_id}',
                            result = '${Result.result}', 
                            description = '${Result.description}', 
                            updated_at = '${now}'
                            WHERE id = ${req.params.id}  RETURNING *`;

        const updatedData = await db.query(updateQuery);

        return res.status(200).send({ message: " Result Updated Successfully", status:200, result:updatedData.rows[0]});
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

const updateResult = async (req, res) => {
  try {
    let Result = req.body;
    const now = new Date().toISOString();
    const existResult = await db.query(
      `SELECT * FROM results WHERE id = $1`,
      [req.params.id]);

    if (existResult.rowCount == 0) {
      return res.status(404).send({ status: 404, message: "Result not found with this id"
    });
    }

    const updateQuery = `UPDATE results SET 
                        user_id = '${Result.user_id}',
                        order_id = '${Result.order_id}', 
                        test_details_id = '${Result.test_details_id}', 
                        employee_id = '${Result.employee_id}', 
                        lis_id = '${Result.lis_id}',
                        result = '${Result.result}', 
                        description = '${Result.description}',
                        updated_at = '${now}'
                        WHERE id = ${req.params.id}  RETURNING *`;

    const result = await db.query(updateQuery);
    return res.status(200).send(result.rows[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ statusCode: 500, error: err });
  }
};

const deleteResult = async (req, res) => {
    try {
        const isResultExist = await db.query(
            `SELECT * FROM results WHERE id = $1`,
            [req.params.id]
        );

        if (isResultExist.rowCount == 0) {
            return res.status(404).send({ status: 404, message:"Result Not Found With this Id"
});
        }
        await db.query(`DELETE FROM results WHERE id = ${req.params.id}`);
        return res.status(204).send({ status: 204, message:"Result Deleted"
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

module.exports = {
    createResult,
    getAllResult,
    getResultById,
    replaceResult,
    updateResult,
    deleteResult
};