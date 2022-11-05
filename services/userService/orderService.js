const db = require("../../config/dbConfig");
//const exception = require("../../../constants/exception.json");

const createOrder = async (req, res) => {
    try {
        const Order = req.body;
        const now = new Date().toISOString();
        
        const checkOrder = await db.query(`SELECT * FROM order_managements WHERE slots_id = '${Order.slots_id}'`);
        if (checkOrder.rowCount != 0) {
         return res.status(400).send({ statusCode: 400, message:"Order already exist"
        });
        }    
        const newOrder = await db.query(
          `INSERT INTO order_managements (slots_id,user_details_id,test_details_id,address_id,payment_id,ref_doctor,description,created_at,updated_at) 
           VALUES ('${Order.slots_id}','${Order.user_details_id}','${Order.test_details_id}','${Order.address_id}','${Order.payment_id}','${Order.ref_doctor}','${Order.description}','${now}','${now}')
            RETURNING *`);
            return res.status(201).send({statusCode:201, order:newOrder.rows[0]});
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

const getAllOrder = async (req, res) => {
    try {
        const getOrder = await db.query(
            `SELECT * FROM order_managements`
        );
        return res.status(200).send({ statusCode: 200, order: getOrder.rows });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

const getOrderById = async (req, res) => {
    try {
        const getOrder = await db.query(
            `SELECT * FROM order_managements WHERE id = $1`,
            [req.params.id]
        );
        return res.status(200).send({ statusCode: 200,message:"There is no order found with this id", order: getOrder.rows[0] });
    } catch (err) {
        console.log(err);

        return res.status(500).send(err);
    }
};

const replaceOrder = async (req, res) => {
    try {
        const Order = req.body;
        const now = new Date().toISOString();
        const isOrderExist = await db.query(
            `SELECT * FROM order_managements WHERE id = $1`,
            [req.params.id]
        );

        if (isOrderExist.rowCount == 0) {
            return res.status(404).send({ status: 404, message:"Order Not Found With this Id"
});
        }
        const updateQuery = `UPDATE order_managements SET 
                            slots_id = '${Order.slots_id}',
                            user_details_id = '${Order.user_details_id}', 
                            test_details_id = '${Order.test_details_id}', 
                            address_id = '${Order.address_id}', 
                            payment_id = '${Order.payment_id},
                            ref_doctor = '${Order.ref_doctor}', 
                            description = '${Order.description}', 
                            updated_at = '${now}'
                            WHERE id = ${req.params.id}  RETURNING *`;

        const updatedData = await db.query(updateQuery);

        return res.status(200).send({ message: " Order Updated Successfully", status:200, order:updatedData.rows[0]});
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

const updateOrder = async (req, res) => {
  try {
    let Order = req.body;
    const now = new Date().toISOString();
    const existOrder = await db.query(
      `SELECT * FROM order_managements WHERE id = $1`,
      [req.params.id]);

    if (existOrder.rowCount == 0) {
      return res.status(404).send({ status: 404, message: "Order not found with this id"
    });
    }

    const updateQuery = `UPDATE order_managements SET 
                            slots_id = '${Order.slots_id}',
                            user_details_id = '${Order.user_details_id}', 
                            test_details_id = '${Order.test_details_id}', 
                            address_id = '${Order.address_id}', 
                            payment_id = '${Order.payment_id}',
                            ref_doctor = '${Order.ref_doctor}', 
                            description = '${Order.description}', 
                            updated_at = '${now}'
                         WHERE id = ${req.params.id}  RETURNING *`;

    const result = await db.query(updateQuery);
    return res.status(200).send(result.rows[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ statusCode: 500, error: err });
  }
};

const deleteOrder = async (req, res) => {
    try {
        const isOrderExist = await db.query(
            `SELECT * FROM order_managements WHERE id = $1`,
            [req.params.id]
        );

        if (isOrderExist.rowCount == 0) {
            return res.status(404).send({ status: 404, message:"Order Not Found With this Id"
});
        }
        await db.query(`DELETE FROM order_managements WHERE id = ${req.params.id}`);
        return res.status(204).send({ status: 204, message:"Order Deleted"
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

module.exports = {
    createOrder,
    getAllOrder,
    getOrderById,
    replaceOrder,
    updateOrder,
    deleteOrder
};
