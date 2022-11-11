const db = require("../../config/dbConfig");
//const exception = require("../../../constants/exception.json");

const createResult = async (req, res) => {
    try {
        const result = req.body;
        const now = new Date().toISOString();
        const existUserId = await db.query(`SELECT * FROM users WHERE id = $1;`,[req.params.user_id]);
      if (existUserId.rowCount == 0) {
        return res.status(404).send({ statusCode: 404, message:"User Not found with this id" });
      }
      const checkResult = await db.query(`SELECT * FROM results WHERE order_id = '${result.order_id}'`);
        if (checkResult.rowCount != 0) {
         return res.status(400).send({ statusCode: 400, message:"Result already exist"
        });
    }    
    const newResult = await db.query(
      `INSERT INTO results (order_id ,user_id ,test_details_id ,employee_id, lis_id, result, description, created_at,updated_at) 
       VALUES ('${result.order_id}','${req.params.user_id}','${result.test_details_id}','${result.employee_id}','${result.lis_id}','${result.result}','${result.description}','${now}','${now}')
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
        if (getResult.rowCount == 0) {
        
            return res.status(404).send({ status: 404, message:"No data found"});
          }
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
        if (getResult.rowCount == 0) {
            return res.status(404).send({ statusCode: 404, message:"There is no result found with this id", });
          }
        return res.status(200).send({ statusCode: 200, result: getResult.rows[0] });
    } catch (err) {
        console.log(err);

        return res.status(500).send(err);
    }
};

const replaceResult = async (req, res) => {
    try {
        const result = req.body;
        const now = new Date().toISOString();
        const isResultExist = await db.query(
            `SELECT * FROM results WHERE id = $1`,
            [req.params.id]
        );

        if (isResultExist.rowCount == 0) {
            return res.status(404).send({ status: 404, message:"There is no result found with this id"
});
        }
        const updateQuery = `UPDATE results SET 
                                order_id = '${result.order_id}', 
                                user_id = '${result.user_id}',
                                test_details_id = '${result.test_details_id}', 
                                employee_id = '${result.employee_id}', 
                                lis_id = '${result.lis_id}',
                                result = '${result.result}', 
                                description = '${result.description}',
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
      const updateOrder = Result.order_id == null ? existOrder.rows[0].order_id : Result.order_id;
      const updateUser = Result.user_id == null ? existUser.rows[0].result : Result.user_id;
      const updateTestDetails = Result.test_details_id == null ? existTestDetails.rows[0].result : Result.test_details_id;
      const updateEmployee = Result.employee_id == null ? existEmployee.rows[0].result : Result.employee_id;
      const updateLis = Result.lis_id == null ? existLis.rows[0].result : Result.lis_id;
      const updateResult = Result.result == null ? existResult.rows[0].result : Result.result;
      const updateDescription = Result.description == null ? existDescription.rows[0].result : Result.description;

      const updateQuery = `UPDATE results SET 
                                order_id = '${updateOrder}', 
                                user_id = '${updateUser}',
                                test_details_id = '${updateTestDetails}', 
                                employee_id = '${updateEmployee}', 
                                lis_id = '${updateLis}',
                                result = '${updateResult}', 
                                description = '${updateDescription}',
                                updated_at = '${now}'
                           WHERE id = ${req.params.id}  RETURNING *`;
  
      const result = await db.query(updateQuery);
      return res.status(200).send({ message: " result Updated Successfully", status:200, result:result.rows[0]});
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
        return res.status(204).send({ status: 204, message:"Result Deleted Successfully"
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