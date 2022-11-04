const db = require("../../config/dbConfig");
const exception = require("../../constants/exception.json");

const createAmount = async (req, res) => {
    try {
        const newAmountDetail = req.body;
        const now = new Date().toISOString();
        const existAmount = await db.query(
            `SELECT * FROM discount_amounts WHERE amount = $1`, [newAmountDetail.amount]
        );

        if (existAmount.rowCount != 0){

        return res
          .status(400)
          .send({message:"Amount Already Exist"});
        }
          const addAmountDetail = await db.query(
            `INSERT INTO discount_amounts (amount, created_at, updated_at) VALUES('${newAmountDetail.amount}','${now}','${now}') RETURNING *`
          );

          return res.status(201).send(addAmountDetail.rows);

        } catch (err) {
            console.log(err);
            return res.status(500).send({Error:err});
          }
        };

        const getAllAmount = async (req,res) => {
            try {
                const isAmountExist = req.query;
                if (isAmountExist.rowCount == 0){
                    return res
                    .status(400)
                    .send({message:"Amount Not Found With This Id"});
                }
                const newAmount = await db.query(
                    `SELECT * FROM discount_amounts`
                );
                return res.status(200)
                .send(newAmount.rows);
            } catch (err) {
                console.log(err);
                return res.status(500).send(err);
            }
        };

        const getAmountById = async (req, res) => {
            try {
              const isAmountExist = await db.query(
                `SELECT * FROM discount_amounts WHERE id = $1`,
                [req.params.id]
              );
          
              if (isAmountExist.rowCount == 0)
                return res
                  .status(404)
                  .send({message:"Amount Not Found With This Id"});
              return res.status(200).send(isAmountExist.rows[0]);
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
        
                await db.query(updateQuery);
                const updatedData = 
                await db.query(
                    `SELECT * FROM discount_amounts WHERE id = $1`, 
                    [req.params.id]
                    );
                return res.status(200).send({message: "Amount Updated Successfully", status:200, amounts:updatedData.rows[0]});
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
          
              const updateQuery = `UPDATE discount_amounts SET 
                                   amount = '${Amount.amount}',
                                   updated_at = '${now}'
                                   WHERE id = ${req.params.id}  RETURNING *`;
          
              const result = await db.query(updateQuery);
              return res.status(200).send(result.rows[0]);
            } catch (err) {
              console.log(err);
              return res.status(500).send({ statusCode: 500, error: err });
            }
          };

          const deleteAmount = async (req, res) => {
            try {
              const existAmount = await db.query(`SELECT * FROM discount_amounts WHERE id= $1;`, [req.params.id]);
              if (existAmount.rowCount == 0){
                return res.status(404).send({message:"Amount Not Found With This Id"});
              }
              await db.query(`DELETE FROM discount_amounts WHERE id = ${req.params.id}`);
              return res.status(204).send({message:"Amount Deleted Successfully"});
            } catch (err) {
              console.log(err);
              return res.status(500).send({statusCode:500, error:err});
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