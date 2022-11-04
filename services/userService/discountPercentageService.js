const db = require("../../config/dbConfig");
const exception = require("../../constants/exception.json");

const createPercentage = async (req, res) => {
    try {
        const newDiscountDetail = req.body;
        const now = new Date().toISOString();
        const existDiscountName = await db.query(
            `SELECT * FROM discount_percentages WHERE percentage = $1`, [newDiscountDetail.percentage]
        );

        if (existDiscountName.rowCount != 0){

        return res
          .status(400)
          .send({message:"Discount Already Exist"});
        }
          const addDiscountDetail = await db.query(
            `INSERT INTO discount_percentages (percentage, created_at, updated_at) VALUES('${newDiscountDetail.percentage}','${now}','${now}') RETURNING *`
          );

          return res.status(201).send(addDiscountDetail.rows);

        } catch (err) {
            console.log(err);
            return res.status(500).send({Error:err});
          }
        };

        const getAllPercentage = async (req,res) => {
            try {
                const isDiscountExist = req.query;
                if (isDiscountExist.rowCount == 0){
                    return res
                    .status(400)
                    .send({message:"Discount Not Found With This Id"});
                }
                const newDiscount = await db.query(
                    `SELECT * FROM discount_percentages`
                );
                return res.status(200)
                .send(newDiscount.rows);
            } catch (err) {
                console.log(err);
                return res.status(500).send(err);
            }
        };

        const getPercentById = async (req, res) => {
            try {
              const isDiscountExist = await db.query(
                `SELECT * FROM discount_percentages WHERE id = $1`,
                [req.params.id]
              );
          
              if (isDiscountExist.rowCount == 0)
                return res
                  .status(404)
                  .send({message:"Discount Not Found With This Id"});
              return res.status(200).send(isDiscountExist.rows[0]);
            } catch (err) {
              console.log(err);
              return res.status(500).send(err);
            }
          };

          const replacePercentage = async (req, res) => {
            try {
                const Discount = req.body;
                const now = new Date().toISOString();
                const isDiscountExist = await db.query(
                    `SELECT * FROM discount_percentages WHERE id = $1`,
                    [req.params.id]
                );
        
                if (isDiscountExist.rowCount == 0) {
                    return res.status(404).send({ status: 404, message:"Discount Not Found With this Id"
        });
                }
                const updateQuery = `UPDATE discount_percentages SET 
                                    percentage = '${Discount.percentage}',
                                    updated_at = '${now}'
                                    WHERE id = ${req.params.id}  RETURNING *`;
        
                await db.query(updateQuery);
                const updatedData = 
                await db.query(
                    `SELECT * FROM discount_percentages WHERE id = $1`, 
                    [req.params.id]
                    );
                return res.status(200).send({message: "Discount Updated Successfully", status:200, discount:updatedData.rows[0]});
            } catch (err) {
                console.log(err);
                return res.status(500).send(err);
            }
        };

        const updatePercentage = async (req, res) => {
            try {
              let Discount = req.body;
              const now = new Date().toISOString();
              const existDiscount = await db.query(
                `SELECT * FROM discount_percentages WHERE id = $1`,
                [req.params.id]);
          
              if (existDiscount.rowCount == 0) {
                return res.status(404).send({ status: 404, message: "Discount not found with this id"
              });
              }
          
              const updateQuery = `UPDATE discount_percentages SET 
                                   percentage = '${Discount.percentage}',
                                   updated_at = '${now}'
                                   WHERE id = ${req.params.id}  RETURNING *`;
          
              const result = await db.query(updateQuery);
              return res.status(200).send(result.rows[0]);
            } catch (err) {
              console.log(err);
              return res.status(500).send({ statusCode: 500, error: err });
            }
          };

          const deletePercentage = async (req, res) => {
            try {
              const existDiscount = await db.query(`SELECT * FROM discount_percentages WHERE id= $1;`, [req.params.id]);
              if (existDiscount.rowCount == 0){
                return res.status(404).send({message:"Discount Not Found With This Id"});
              }
              await db.query(`DELETE FROM discount_percentages WHERE id = ${req.params.id}`);
              return res.status(204).send({message:"Discount Deleted Successfully"});
            } catch (err) {
              console.log(err);
              return res.status(500).send({statusCode:500, error:err});
            }
          };

        module.exports = {
            createPercentage,
            getAllPercentage,
            getPercentById,
            replacePercentage,
            updatePercentage,
            deletePercentage
        }