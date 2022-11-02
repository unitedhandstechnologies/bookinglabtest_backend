const db = require("../../config/dbConfig");
const exception = require("../../constants/exception.json");

const createNewTest = async (req, res) => {
    try {
        const newTestDetails = req.body;
        const now = new Date().toISOString();
        const existTestName = await db.query(
            `SELECT * FROM test_details WHERE test_name = $1`, [newTestDetails.test_name]
        );

        if (existTestName.rowCount != 0){

        return res
          .status(400)
          .send({message:exception.testAlreadyExist});
        }
          const addTestDetail = await db.query(
            `INSERT INTO test_details (test_name, amount, fasting_required, description, created_at, updated_at) VALUES('${newTestDetails.test_name}','${newTestDetails.amount}','${newTestDetails.fasting_required}','${newTestDetails.description}','${now}','${now}') RETURNING *`
          );

          return res.status(201).send(addTestDetail.rows[0]);

        } catch (err) {
            console.log(err);
            return res.status(500).send({Error:err});
          }
        };

        const getAllTest = async (req,res) => {
            try {
                const isTestTypeExist = req.query;
                if (isTestTypeExist.rowCount == 0){
                    return res
                    .status(400)
                    .send({message:exception.testNotFoundWithThisId});
                }
                const newTest = await db.query(
                    `SELECT * FROM test_details`
                );
                return res.status(200)
                .send(newTest.rows[0]);
            } catch (err) {
                console.log(err);
                return res.status(500).send(err);
            }
        };

        const getTestById = async (req, res) => {
            try {
              const isTestExist = await db.query(
                `SELECT * FROM test_details WHERE id = $1`,
                [req.params.id]
              );
          
              if (isTestExist.rowCount == 0)
                return res
                  .status(404)
                  .send({message:"Test Not Found With This Id"});
              return res.status(200).send(isTestExist.rows[0]);
            } catch (err) {
              console.log(err);
              return res.status(500).send(err);
            }
          };

          const replaceTest = async (req, res) => {
            try {
                const Test = req.body;
                const now = new Date().toISOString();
                const isTestExist = await db.query(
                    `SELECT * FROM test_details WHERE id = $1`,
                    [req.params.id]
                );
        
                if (isTestExist.rowCount == 0) {
                    return res.status(404).send({ status: 404, message:"Test Not Found With this Id"
        });
                }
                const updateQuery = `UPDATE test_details SET 
                                    test_name = '${Test.test_name}',
                                    amount = '${Test.amount}', 
                                    fasting_required = '${Test.fasting_required}',
                                    description = '${Test.description}',
                                    updated_at = '${now}'
                                    WHERE id = ${req.params.id}  RETURNING *`;
        
                await db.query(updateQuery);
                const updatedData = 
                await db.query(
                    `SELECT * FROM test_details WHERE id = $1`, 
                    [req.params.id]
                    );
                return res.status(200).send({message: "Test Updated Successfully", status:200, tests:updatedData.rows[0]});
            } catch (err) {
                console.log(err);
                return res.status(500).send(err);
            }
        };

        const updateTest = async (req, res) => {
            try {
              let Test = req.body;
              const now = new Date().toISOString();
              const existTest = await db.query(
                `SELECT * FROM test_details WHERE id = $1`,
                [req.params.id]);
          
              if (existTest.rowCount == 0) {
                return res.status(404).send({ status: 404, message: "Test not found with this id"
              });
              }
          
              const updateQuery = `UPDATE test_details SET 
                                   test_name = '${Test.test_name}',
                                   amount = '${Test.amount}', 
                                   description = '${Test.description}',
                                   updated_at = '${now}'
                                   WHERE id = ${req.params.id}  RETURNING *`;
          
              const result = await db.query(updateQuery);
              return res.status(200).send(result.rows[0]);
            } catch (err) {
              console.log(err);
              return res.status(500).send({ statusCode: 500, error: err });
            }
          };

        const deleteTest = async (req, res) => {
            try {
              const existTest = await db.query(`SELECT * FROM test_details WHERE id= $1;`, [req.params.id]);
              if (existTest.rowCount == 0){
                return res.status(404).send({message:"Test Not Found With This Id"});
              }
              await db.query(`DELETE FROM test_details WHERE id = ${req.params.id}`);
              return res.status(204).send({message:"Test Deleted Successfully"});
            } catch (err) {
              console.log(err);
              return res.status(500).send({statusCode:500, error:err});
            }
          };
        
        module.exports = {
            createNewTest,
            getAllTest,
            getTestById,
            replaceTest,
            updateTest,
            deleteTest
        };