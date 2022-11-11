const db = require("../../config/dbConfig");
const exception = require("../../constants/exception.json");

const createSlot = async (req, res) => {
  try {
      const Slot = req.body;
      const now = new Date().toISOString();
      
      const checkSlot = await db.query(`SELECT * FROM slots WHERE time = '${Slot.time}'`);
      if (checkSlot.rowCount != 0) {
       return res.status(400).send({ statusCode: 400, message:"Slot details with this time already exist" 
      });
      }    
      const newSlot = await db.query(
        `INSERT INTO slots (date, time, created_at, updated_at) 
         VALUES ('${Slot.date}','${Slot.time}','${now}','${now}')
          RETURNING *`);
          return res.status(201).send({statusCode:201, Slot:newSlot.rows[0]});
  } catch (err) {
      console.log(err);
      return res.status(500).send(err);
  }
};
      const getAllSlot = async (req, res) => {
          try {
              const getSlot = await db.query(
                  `SELECT * FROM slots`
              );
              if (getSlot.rowCount == 0) {
        
                return res.status(404).send({ status: 404, message:"No data found"});
              }
              return res.status(200).send({ statusCode: 200, Slot: getSlot.rows });
          } catch (err) {
              console.log(err);
              return res.status(500).send(err);
          }
        };

        const getSlotById = async (req, res) => {
          try {
              const getSlot = await db.query(
                  `SELECT * FROM slots WHERE id = $1`,
                  [req.params.id]
              );
              if (getSlot.rowCount == 0) {
                  return res.status(404).send({ status: 404,message:"There is no slot found with this id",
      });
              }
              return res.status(200).send({ statusCode: 200, Test: getSlot.rows[0] });
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
      
              const updatedData = await db.query(updateQuery);
      
              return res.status(200).send({ message: " Slot Updated Successfully", status:200, Slot:updatedData.rows[0]});
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
        
            const updateDate = Slot.date == null ? existSlot.rows[0].date : Slot.date;
            const updateTime = Slot.time == null ? existSlot.rows[0].time : Slot.time;
        
            const updateQuery = `UPDATE slots SET 
                                 date = '${updateDate}',
                                 time= '${updateTime}',
                                 updated_at = '${now}'
                                 WHERE id = ${req.params.id}  RETURNING *`;
        
            const result = await db.query(updateQuery);
            return res.status(200).send({ message: " Slot Updated Successfully", status:200, Slot:result.rows[0]});
          } catch (err) {
            console.log(err);
            return res.status(500).send({ statusCode: 500, error: err });
          }
        };

          // const deletSlot = async (req, res) => {
          //   try {
          //     const existSlots = await db.query(`SELECT * FROM slots WHERE id= $1;`, [req.params.id]);
          //     if (existSlots.rowCount == 0){
          //       return res.status(404).send({message:"Slot Not Found With This Id"});
          //     }
          //     await db.query(`DELETE FROM slots WHERE id = ${req.params.id}`);
          //     return res.status(204).send({message:"Slot Deleted Successfully"});
          //   } catch (err) {
          //     console.log(err);
          //     return res.status(500).send({statusCode:500, error:err});
          //   }
          // };

          const deleteSlot = async (req, res) => {
            try {
                const isSlotExist = await db.query(
                    `SELECT * FROM slots WHERE id = $1`,
                    [req.params.id]
                );
        
                if (isSlotExist.rowCount == 0) {
                    return res.status(404).send({ status: 404, message:"Slot Not Found With this Id"
        });
                }
                await db.query(`DELETE FROM slots WHERE id = ${req.params.id}`);
                return res.status(204).send({ status: 204, message:"Slot Deleted Successfully"
                });
            } catch (err) {
                console.log(err);
                return res.status(500).send(err);
            }
        };
        module.exports = {
            createSlot,
            getAllSlot,
            getSlotById,
            replaceSlot,
            updateSlot,
            deleteSlot
        }