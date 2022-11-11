const db = require("../../config/dbConfig");
const exception = require("../../constants/exception.json");

const createNewTest = async (req, res) => {
  try {
      const Test = req.body;
      const now = new Date().toISOString();
      
      const checkTest = await db.query(`SELECT * FROM test_details WHERE test_name = '${Test.test_name}'`);
      if (checkTest.rowCount != 0) {
       return res.status(400).send({ statusCode: 400, message:"Test Detail with this name already exist" 
      });
      }    
      const newTest = await db.query(
        `INSERT INTO test_details (test_name,amount,fasting_required,description,created_at,updated_at) 
         VALUES ('${Test.test_name}','${Test.amount}','${Test.fasting_required}','${Test.description}','${now}','${now}')
          RETURNING *`);
          return res.status(201).send({statusCode:201, Test:newTest.rows[0]});
  } catch (err) {
      console.log(err);
      return res.status(500).send(err);
  }
};

const getAllTest = async (req, res) => {
  try {
      const getTest = await db.query(
          `SELECT * FROM test_details`
      );
      if (getTest.rowCount == 0) {

        return res.status(404).send({ status: 404, message:"No data found"});
      }
      return res.status(200).send({ statusCode: 200, Test: getTest.rows });
  } catch (err) {
      console.log(err);
      return res.status(500).send(err);
  }
};

        const getTestById = async (req, res) => {
          try {
              const getTest = await db.query(
                  `SELECT * FROM test_details WHERE id = $1`,
                  [req.params.id]
              );
              if (getTest.rowCount == 0) {
                  return res.status(404).send({ status: 404,message:"There is no test found with this id",
      });
              }
              return res.status(200).send({ statusCode: 200, Test: getTest.rows[0] });
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
      
              const updatedData = await db.query(updateQuery);
      
              return res.status(200).send({ message: " Test Updated Successfully", status:200, Test:updatedData.rows[0]});
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
        
            const updateName = Test.test_name == null ? existTest.rows[0].test_name : Test.test_name;
            const updateAmount = Test.amount == null ? existTest.rows[0].amount : Test.amount;
            const updateFasting_required = Test.fasting_required == null ? existTest.rows[0].fasting_required : Test.fasting_required;
            const updateDescription = Test.description == null ? existTest.rows[0].description : Test.description;
        
            const updateQuery = `UPDATE test_details SET 
                                 test_name = '${updateName}',
                                 amount= '${updateAmount}',
                                 fasting_required = '${updateFasting_required}',
                                 description='${updateDescription}',
                                 updated_at = '${now}'
                                 WHERE id = ${req.params.id}  RETURNING *`;
        
            const result = await db.query(updateQuery);
            return res.status(200).send({ message: " Test Updated Successfully", status:200, Test:result.rows[0]});
          } catch (err) {
            console.log(err);
            return res.status(500).send({ statusCode: 500, error: err });
          }
        };

        const deleteTest = async (req, res) => {
          try {
              const isTestExist = await db.query(
                  `SELECT * FROM test_details WHERE id = $1`,
                  [req.params.id]
              );
      
              if (isTestExist.rowCount == 0) {
                  return res.status(404).send({ status: 404, message:"Test Not Found With this Id"
      });
              }
              await db.query(`DELETE FROM test_details WHERE id = ${req.params.id}`);
              return res.status(204).send({ status: 204, message:"Test Deleted Successfully"
              });
          } catch (err) {
              console.log(err);
              return res.status(500).send(err);
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