const db = require("../../config/dbConfig");
// const exception = require("../../constants/exception.json");

const createNewNotification = async (notification) => {
//   try {
    //   const Notification = req.body;
      const now = new Date().toISOString();
    //   const existOrderId = await db.query(`SELECT * FROM orders WHERE id = $1;`,[req.params.order_id]);
    //   if (existOrderId.rowCount == 0) {
    //     return res.status(404).send({ statusCode: 404, message:"Order Not found with this id" });
    //   }
    //   const checkNotification = await db.query(`SELECT * FROM notifications WHERE notification = '${Notification.notification}'`);
    //   if (checkNotification.rowCount != 0) {
    //    return res.status(400).send({ statusCode: 400, message:"Notification with this Id already exist" 
    //   });
    //   }    
       await db.query(
        `INSERT INTO notifications (notification,created_at) 
         VALUES ('${notification}','${now}')
          RETURNING *`);
        //   return res.status(201).send({statusCode:201, Notification:newNotification.rows[0]});
//   } catch (err) {
//       console.log(err);
//       return res.status(500).send(err);
//   }
};
        const getAllNotification = async (req, res) => {
          try {
              const getNotification = await db.query(
                  `SELECT * FROM notifications`
              );
              if (getNotification.rowCount == 0) {
        
                return res.status(404).send({ status: 404, message:"No data found"});
              }
              return res.status(200).send({ statusCode: 200, Test: getNotification.rows });
          } catch (err) {
              console.log(err);
              return res.status(500).send(err);
          }
        };
        const getNotificationById = async (req, res) => {
          try {
              const getNotification = await db.query(
                  `SELECT * FROM notifications WHERE id = $1`,
                  [req.params.id]
              );
              if (getNotification.rowCount == 0) {
                  return res.status(404).send({ status: 404,message:"There is no notification found with this id",
      });
              }
              return res.status(200).send({ statusCode: 200, Notification: getNotification.rows[0] });
          } catch (err) {
              console.log(err);
      
              return res.status(500).send(err);
          }
      };
          const deleteNotification = async (req, res) => {
            try {
                const isNotificationExist = await db.query(
                    `SELECT * FROM notifications WHERE id = $1`,
                    [req.params.id]
                );
        
                if (isNotificationExist.rowCount == 0) {
                    return res.status(404).send({ status: 404, message:"Notification Not Found With this Id"
        });
                }
                await db.query(`DELETE FROM notifications WHERE id = ${req.params.id}`);
                return res.status(204).send({ status: 204, message:"Notification Deleted Successfully"
                });
            } catch (err) {
                console.log(err);
                return res.status(500).send(err);
            }
        };

        module.exports = {
            createNewNotification,
            getAllNotification,
            getNotificationById,
            deleteNotification
        }