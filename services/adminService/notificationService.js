const db = require("../../config/dbConfig");
// const exception = require("../../constants/exception.json");

const createNewNotification = async (req, res) => {
    try {
        const newNotification = req.body;
        const now = new Date().toISOString();
        const existNotification = await db.query(
            `SELECT * FROM notifications WHERE notification = $1`, [newNotification.notification]
        );

        if (existNotification.rowCount != 0){

        return res
          .status(400)
          .send({message:"Notification Already Exist"});
        }
          const addNotification = await db.query(
            `INSERT INTO notifications (notification, created_at, updated_at) VALUES('${newNotification.notification}','${now}','${now}') RETURNING *`
          );

          return res.status(201).send(addNotification.rows);

        } catch (err) {
            console.log(err);
            return res.status(500).send({Error:err});
          }
        };

        const getAllNotification = async (req,res) => {
            try {
                const isNotificationExist = req.query;
                if (isNotificationExist.rowCount == 0){
                    return res
                    .status(400)
                    .send({message:"Notification Not Found With This Id"});
                }
                const newTest = await db.query(
                    `SELECT * FROM notifications`
                );
                return res.status(200)
                .send(newTest.rows);
            } catch (err) {
                console.log(err);
                return res.status(500).send(err);
            }
        };
        const getNotificationById = async (req, res) => {
            try {
              const isNotificationsExist = await db.query(
                `SELECT * FROM notifications WHERE id = $1`,
                [req.params.id]
              );
          
              if (isNotificationsExist.rowCount == 0)
                return res
                  .status(404)
                  .send({message:"Notification Not Found With This Id"});
              return res.status(200).send(isNotificationsExist.rows[0]);
            } catch (err) {
              console.log(err);
              return res.status(500).send(err);
            }
          };

          const deleteNotification = async (req, res) => {
            try {
              const existNotifications = await db.query(`SELECT * FROM notifications WHERE id= $1;`, [req.params.id]);
              if (existNotifications.rowCount == 0){
                return res.status(404).send({message:"Notification Not Found With This Id"});
              }
              await db.query(`DELETE FROM notifications WHERE id = ${req.params.id}`);
              return res.status(204).send({message:"Notification Deleted Successfully"});
            } catch (err) {
              console.log(err);
              return res.status(500).send({statusCode:500, error:err});
            }
          };

        module.exports = {
            createNewNotification,
            getAllNotification,
            getNotificationById,
            deleteNotification
        }