const db = require("../../config/dbConfig");
const exception = require("../../constants/exception.json");

const createSlot = async (req, res) => {
    try {
        const newSlot = req.body;
        const now = new Date().toISOString();
        const existSlot = await db.query(
            `SELECT * FROM slots WHERE time = $1`, [newSlot.date]
        );

        if (existSlot.rowCount != 0){

        return res
          .status(400)
          .send({message:"Slot Already Exist"});
        }
          const addSlot = await db.query(
            `INSERT INTO slots (date, time, created_at, updated_at) VALUES('${newSlot.date}','${newSlot.time}','${now}','${now}') RETURNING *`
          );

          return res.status(201).send(addSlot.rows[0]);

        } catch (err) {
            console.log(err);
            return res.status(500).send({Error:err});
          }
        };

        const getAllSlot = async (req,res) => {
            try {
                const isSlotExist = req.query;
                if (isSlotExist.rowCount == 0){
                    return res
                    .status(400)
                    .send({message:"Slot Not Found With This Id"});
                }
                const newSlot = await db.query(
                    `SELECT * FROM slots`
                );
                return res.status(200)
                .send(newSlot.rows);
            } catch (err) {
                console.log(err);
                return res.status(500).send(err);
            }
        };

        const getSlotById = async (req, res) => {
            try {
              const isSlotExist = await db.query(
                `SELECT * FROM slots WHERE id = $1`,
                [req.params.id]
              );
          
              if (isSlotExist.rowCount == 0)
                return res
                  .status(404)
                  .send({message:"Slot Not Found With This Id"});
              return res.status(200).send(isSlotExist.rows[0]);
            } catch (err) {
              console.log(err);
              return res.status(500).send(err);
            }
          };

        const replaceSlot = async (req, res) => {
            try {
                const Slot = req.body;
                const now = new Date().toISOString();
                const isSlotExist = await db.query(
                    `SELECT * FROM slots WHERE id = $1`,
                    [req.params.id]
                );
        
                if (isSlotExist.rowCount == 0) {
                    return res.status(404).send({ status: 404, message:"Slot Not Found With this Id"
        });
                }
                const updateQuery = `UPDATE slots SET 
                                    date = '${Slot.date}',
                                    time = '${Slot.time}', 
                                    updated_at = '${now}'
                                    WHERE id = ${req.params.id}  RETURNING *`;
        
                await db.query(updateQuery);
                const updatedData = 
                await db.query(
                    `SELECT * FROM slots WHERE id = $1`, 
                    [req.params.id]
                    );
                return res.status(200).send({message: "Slot Updated Successfully", status:200, slots:updatedData.rows[0]});
            } catch (err) {
                console.log(err);
                return res.status(500).send(err);
            }
        };

        const updateSlot = async (req, res) => {
            try {
              let Slot = req.body;
              const now = new Date().toISOString();
              const existSlot = await db.query(
                `SELECT * FROM slots WHERE id = $1`,
                [req.params.id]);
          
              if (existSlot.rowCount == 0) {
                return res.status(404).send({ status: 404, message: "Slot not found with this id"
              });
              }
          
              const updateQuery = `UPDATE slots SET 
                                   date = '${Slot.date}',
                                   time = '${Slot.time}',
                                   updated_at = '${now}'
                                   WHERE id = ${req.params.id}  RETURNING *`;
          
              const result = await db.query(updateQuery);
              return res.status(200).send(result.rows[0]);
            } catch (err) {
              console.log(err);
              return res.status(500).send({ statusCode: 500, error: err });
            }
          };
          const deletSlot = async (req, res) => {
            try {
              const existSlots = await db.query(`SELECT * FROM slots WHERE id= $1;`, [req.params.id]);
              if (existSlots.rowCount == 0){
                return res.status(404).send({message:"Slot Not Found With This Id"});
              }
              await db.query(`DELETE FROM slots WHERE id = ${req.params.id}`);
              return res.status(204).send({message:"Slot Deleted Successfully"});
            } catch (err) {
              console.log(err);
              return res.status(500).send({statusCode:500, error:err});
            }
          };
        module.exports = {
            createSlot,
            getAllSlot,
            getSlotById,
            replaceSlot,
            updateSlot,
            deletSlot
        }