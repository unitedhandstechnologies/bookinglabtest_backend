const db = require("../../config/dbConfig");
//const exception = require("../../../constants/exception.json");

const createCircle = async (req, res) => {
    try {
        const Circle = req.body;
        const now = new Date().toISOString();
        
        const checkCircle = await db.query(`SELECT * FROM circles WHERE  circle_name = '${Circle.circle_name}'`);
        if (checkCircle.rowCount != 0) {
         return res.status(400).send({ statusCode: 400, message:"Pincode already exist"
           // circle: exception.existCircle 
        });
        }    
        const newCircle = await db.query(
          `INSERT INTO circles (circle_name,description,created_at,updated_at) 
           VALUES ('${Circle.circle_name}','${Circle.description}','${now}','${now}')
            RETURNING *`);
            return res.status(201).send({statusCode:201, circle:newCircle.rows[0]});
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

const getAllCircles = async (req, res) => {
    try {
        const getCircle = await db.query(
            `SELECT * FROM circles`
        );
        return res.status(200).send({ statusCode: 200, Circles: getCircle.rows });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

const getCircleById = async (req, res) => {
    try {
        const getCircle = await db.query(
            `SELECT * FROM circles WHERE id = $1`,
            [req.params.id]
        );
        return res.status(200).send({ statusCode: 200,message:"There is no circle found with this id", Circle: getCircle.rows[0] });
    } catch (err) {
        console.log(err);

        return res.status(500).send(err);
    }
};

const replaceCircle = async (req, res) => {
    try {
        const Circle = req.body;
        const now = new Date().toISOString();
        const isCircleExist = await db.query(
            `SELECT * FROM circles WHERE id = $1`,
            [req.params.id]
        );

        if (isCircleExist.rowCount == 0) {
            return res.status(404).send({ status: 404, message:"Circle Not Found With this Id"
//en.CircleNotFoundWithId 
});
        }
        const updateQuery = `UPDATE circles SET 
                            circle_name = '${Circle.circle_name}',
                            description = '${Circle.description}', 
                            updated_at = '${now}'
                            WHERE id = ${req.params.id}  RETURNING *`;

        const updatedData = await db.query(updateQuery);

        return res.status(200).send({ message: " Circle Updated Successfully", status:200, circle:updatedData.rows[0]});
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

const updateCircle = async (req, res) => {
  try {
    let Circle = req.body;
    const now = new Date().toISOString();
    const existCircle = await db.query(
      `SELECT * FROM circles WHERE id = $1`,
      [req.params.id]);

    if (existCircle.rowCount == 0) {
      return res.status(404).send({ status: 404, message: "Circle not found with this id"
      // en.circleNotFound 
    });
    }

    const updateQuery = `UPDATE circles SET 
                         circle_name = '${Circle.circle_name}',
                         description = '${Circle.description}', 
                         updated_at = '${now}'
                         WHERE id = ${req.params.id}  RETURNING *`;

    const result = await db.query(updateQuery);
    return res.status(200).send(result.rows[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ statusCode: 500, error: err });
  }
};

const deleteCircle = async (req, res) => {
    try {
        const isCircleExist = await db.query(
            `SELECT * FROM circles WHERE id = $1`,
            [req.params.id]
        );

        if (isCircleExist.rowCount == 0) {
            return res.status(404).send({ status: 404, message:"Circle Not Found With this Id"
//en.CircleNotFoundWithId 
});
        }
        await db.query(`DELETE FROM circles WHERE id = ${req.params.id}`);
        return res.status(204).send({ status: 204, message:"Circle Deleted"
            // en.customerDeleted 
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

module.exports = {
    createCircle,
    getAllCircles,
    getCircleById,
    replaceCircle,
    updateCircle,
    deleteCircle,
};
