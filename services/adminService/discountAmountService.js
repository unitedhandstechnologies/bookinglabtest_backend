const db = require("../../config/dbConfig");
const exception = require("../../constants/exception.json");

const createAmount = async (req, res) => {
  try {
      const Amount = req.body;
      const now = new Date().toISOString();
      
      const checkAmount = await db.query(`SELECT * FROM discount_amounts WHERE amount = '${Amount.amount}'`);
      if (checkAmount.rowCount != 0) {
       return res.status(400).send({ statusCode: 400, message:"Amount Detail with this amount already exist" 
      });
      }    
      const newAmount = await db.query(
        `INSERT INTO discount_amounts (amount, created_at, updated_at) 
         VALUES ('${Amount.amount}','${now}','${now}')
          RETURNING *`);
          return res.status(201).send({statusCode:201, Amount:newAmount.rows[0]});
  } catch (err) {
      console.log(err);
      return res.status(500).send(err);
  }
};
        const getAllAmount = async (req, res) => {
          try {
              const getAmount = await db.query(
                  `SELECT * FROM discount_amounts`
              );
              if (getAmount.rowCount == 0) {
        
                return res.status(404).send({ status: 404, message:"No data found"});
              }
              return res.status(200).send({ statusCode: 200, Amount: getAmount.rows });
          } catch (err) {
              console.log(err);
              return res.status(500).send(err);
          }
        };

        const getAmountById = async (req, res) => {
          try {
              const getAmount = await db.query(
                  `SELECT * FROM discount_amounts WHERE id = $1`,
                  [req.params.id]
              );
              if (getAmount.rowCount == 0) {
                  return res.status(404).send({ status: 404,message:"There is no discount amount found with this id",
      });
              }
              return res.status(200).send({ statusCode: 200, Test: getAmount.rows[0] });
          } catch (err) {
              console.log(err);
      
              return res.status(500).send(err);
          }
      };

        const replaceAmount = async (req, res) => {
          try {
              const Amount = req.body;
              const now = new Date().toISOString();
              const isAmountExist = await db.query(
                  `SELECT * FROM discount_amounts WHERE id = $1`,
                  [req.params.id]
              );
      
              if (isAmountExist.rowCount == 0) {
                  return res.status(404).send({ status: 404, message:"Amount Not Found With this Id"
      });
              }
              const updateQuery = `UPDATE discount_amounts SET 
                                          amount = '${Amount.amount}',
                                          updated_at = '${now}'
                                  WHERE id = ${req.params.id}  RETURNING *`;
      
              const updatedData = await db.query(updateQuery);
      
              return res.status(200).send({ message: " Amount Updated Successfully", status:200, Amount:updatedData.rows[0]});
          } catch (err) {
              console.log(err);
              return res.status(500).send(err);
          }
      };

        const updateAmount = async (req, res) => {
          try {
            let Amount = req.body;
            const now = new Date().toISOString();
            const existAmount = await db.query(
              `SELECT * FROM discount_amounts WHERE id = $1`,
              [req.params.id]);
        
            if (existAmount.rowCount == 0) {
              return res.status(404).send({ status: 404, message: "Amount not found with this id"
            });
            }
        
            const updateAmount = Amount.amount == null ? existAmount.rows[0].amount : Amount.amount;
        
            const updateQuery = `UPDATE discount_amounts SET 
                                 amount = '${updateAmount}',
                                 updated_at = '${now}'
                                 WHERE id = ${req.params.id}  RETURNING *`;
        
            const result = await db.query(updateQuery);
            return res.status(200).send({ message: " Test Updated Successfully", status:200, Amount:result.rows[0]});
          } catch (err) {
            console.log(err);
            return res.status(500).send({ statusCode: 500, error: err });
          }
        };

          const deleteAmount = async (req, res) => {
            try {
                const isAmountExist = await db.query(
                    `SELECT * FROM discount_amounts WHERE id = $1`,
                    [req.params.id]
                );
        
                if (isAmountExist.rowCount == 0) {
                    return res.status(404).send({ status: 404, message:"Amount Not Found With this Id"
        });
                }
                await db.query(`DELETE FROM discount_amounts WHERE id = ${req.params.id}`);
                return res.status(204).send({ status: 204, message:"Amount Deleted Successfully"
                });
            } catch (err) {
                console.log(err);
                return res.status(500).send(err);
            }
        };

        module.exports = {
            createAmount,
            getAllAmount,
            getAmountById,
            replaceAmount,
            updateAmount,
            deleteAmount
        }