const db = require("../../config/dbConfig");
//const exception = require("../../../constants/exception.json");

const createUserNotification = async (req, res) => {
    try {
        const notifications = req.body;
        const now = new Date().toISOString();
        
        const existUserId = await db.query(`SELECT * FROM users WHERE id = $1;`,[req.params.users_id]);
      if (existUserId.rowCount == 0) {
        return res.status(404).send({ statusCode: 404, message:"User Not found with this id" });
      }

        const checkNotification = await db.query(`SELECT * FROM user_notifications WHERE  notification = '${notifications.notification}'`);
        if (checkNotification.rowCount != 0) {
         return res.status(400).send({ statusCode: 400, message:"Notification already exist"
         
        });
        }    
        const newNotification = await db.query(
          `INSERT INTO user_notifications (notification,users_id,created_at) 
           VALUES ('${notifications.notification}','${req.params.users_id}','${now}')
            RETURNING *`);
            return res.status(201).send({statusCode:201, notifications:newNotification.rows[0]});
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

const getAllUserNotification = async (req, res) => {
    try {
        const getUserNotification = await db.query(
            `SELECT * FROM user_notifications`
        );
        return res.status(200).send({ statusCode: 200, pincodes: getUserNotification.rows });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

const getUserNotificationById = async (req, res) => {
    try {
        const getNotification = await db.query(
            `SELECT * FROM user_notifications WHERE id = $1`,
            [req.params.id]
        );
        if (getNotification.rowCount == 0) {
            return res.status(404).send({ statusCode: 404, message:"There is no user found with this id", });
          }
        return res.status(200).send({ statusCode: 200, notification: getNotification.rows[0]});
    } catch (err) {
        console.log(err);

        return res.status(500).send(err);
    }
};

const deleteUserNotification = async (req, res) => {
    try {
        const isNotificationExist = await db.query(
            `SELECT * FROM user_notifications WHERE id = $1`,
            [req.params.id]
        );

        if (isNotificationExist.rowCount == 0) {
            return res.status(404).send({ status: 404, message:"There is no user found with this id"});
        }
        await db.query(`DELETE FROM user_notifications WHERE id = ${req.params.id}`);
        return res.status(204).send({ status: 204, message:"Notification Deleted" 
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

module.exports = {
    createUserNotification,
    getAllUserNotification,
    getUserNotificationById,
    deleteUserNotification
}