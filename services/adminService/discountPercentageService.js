const db = require("../../config/dbConfig");
const exception = require("../../constants/exception.json");

const createPercentage = async (req, res) => {
  try {
      const Percentage = req.body;
      const now = new Date().toISOString();
      
      const checkPercentage = await db.query(`SELECT * FROM discount_percentages WHERE percentage = '${Percentage.percentage}'`);
      if (checkPercentage.rowCount != 0) {
       return res.status(400).send({ statusCode: 400, message:"Percentage Detail with this percentage already exist" 
      });
      }    
      const newPercentage = await db.query(
        `INSERT INTO discount_percentages (percentage,created_at,updated_at) 
         VALUES ('${Percentage.percentage}','${now}','${now}')
          RETURNING *`);
          return res.status(201).send({statusCode:201, Percentage:newPercentage.rows[0]});
  } catch (err) {
      console.log(err);
      return res.status(500).send(err);
  }
};

        const getAllPercentage = async (req, res) => {
          try {
              const getPercentage = await db.query(
                  `SELECT * FROM discount_percentages`
              );
              if (getPercentage.rowCount == 0) {
        
                return res.status(404).send({ status: 404, message:"No data found"});
              }
              return res.status(200).send({ statusCode: 200, Percentage: getPercentage.rows });
          } catch (err) {
              console.log(err);
              return res.status(500).send(err);
          }
        };

        const getPercentageById = async (req, res) => {
          try {
              const getPercentage = await db.query(
                  `SELECT * FROM discount_percentages WHERE id = $1`,
                  [req.params.id]
              );
              if (getPercentage.rowCount == 0) {
                  return res.status(404).send({ status: 404,message:"There is no percentage found with this id",
      });
              }
              return res.status(200).send({ statusCode: 200, Percentage: getPercentage.rows[0] });
          } catch (err) {
              console.log(err);
      
              return res.status(500).send(err);
          }
      };
        const replacePercentage = async (req, res) => {
          try {
              const Percentage = req.body;
              const now = new Date().toISOString();
              const isPercentageExist = await db.query(
                  `SELECT * FROM discount_percentages WHERE id = $1`,
                  [req.params.id]
              );
      
              if (isPercentageExist.rowCount == 0) {
                  return res.status(404).send({ status: 404, message:"Percentage Not Found With this Id"
      });
              }
              const updateQuery = `UPDATE discount_percentages SET 
                                          percentage = '${Percentage.percentage}',
                                          updated_at = '${now}'
                                  WHERE id = ${req.params.id}  RETURNING *`;
      
              const updatedData = await db.query(updateQuery);
      
              return res.status(200).send({ message: " Percentage Updated Successfully", status:200, Percentage:updatedData.rows[0]});
          } catch (err) {
              console.log(err);
              return res.status(500).send(err);
          }
      };

        const updatePercentage = async (req, res) => {
          try {
            let Percentage = req.body;
            const now = new Date().toISOString();
            const existPercentage = await db.query(
              `SELECT * FROM discount_percentages WHERE id = $1`,
              [req.params.id]);
        
            if (existPercentage.rowCount == 0) {
              return res.status(404).send({ status: 404, message: "Percentage not found with this id"
            });
            }
        
            const updatePercent = Percentage.percentage == null ? existPercentage.rows[0].percentage : Percentage.percentage;
        
            const updateQuery = `UPDATE discount_percentages SET 
                                 percentage = '${updatePercent}',
                                 updated_at = '${now}'
                                 WHERE id = ${req.params.id}  RETURNING *`;
        
            const result = await db.query(updateQuery);
            return res.status(200).send({ message: " Percentage Updated Successfully", status:200, Percentage:result.rows[0]});
          } catch (err) {
            console.log(err);
            return res.status(500).send({ statusCode: 500, error: err });
          }
        };
          const deletePercentage = async (req, res) => {
            try {
                const isPercentageExist = await db.query(
                    `SELECT * FROM discount_percentages WHERE id = $1`,
                    [req.params.id]
                );
        
                if (isPercentageExist.rowCount == 0) {
                    return res.status(404).send({ status: 404, message:"Percentages Not Found With this Id"
        });
                }
                await db.query(`DELETE FROM discount_percentages WHERE id = ${req.params.id}`);
                return res.status(204).send({ status: 204, message:"Percentage Deleted Successfully"
                });
            } catch (err) {
                console.log(err);
                return res.status(500).send(err);
            }
        };

        module.exports = {
            createPercentage,
            getAllPercentage,
            getPercentageById,
            replacePercentage,
            updatePercentage,
            deletePercentage
        }