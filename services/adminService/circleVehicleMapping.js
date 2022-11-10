const db = require("../../config/dbConfig");
//const exception = require("../../../constants/exception.json");

const createCircleVehicle = async (req, res) => {
    try {
        const vehicle = req.body;
        const now = new Date().toISOString();
        
        const existCircleId = await db.query(`SELECT * FROM circles WHERE id = $1;`,[req.params.circle_id]);
      if (existCircleId.rowCount == 0) {
        return res.status(404).send({ statusCode: 404, message:"Circle Not found with this id" });
      }
 
        const  circleVehicles = await db.query(`SELECT * FROM vehicles WHERE id IN (${vehicle.vehicles})`);
    for(var i = 0; i < circleVehicles.rowCount; i++){
        await db.query(
            `INSERT INTO circle_vehicle_maps (circle_id,vehicles,vehicle_name,vehicle_type,created_at) 
            VALUES('${req.params.circle_id}','${circleVehicles.rows[i].id}','${circleVehicles.rows[i].vehicle_name}','${circleVehicles.rows[i].vehicle_type}','${now}')
              RETURNING *`);
    }
    const circleVehicleMap = await db.query(
        `SELECT * FROM circle_vehicle_maps WHERE  circle_id = $1;`,[req.params.circle_id]);

        return res.status(201).send({statusCode:201, vehicles:circleVehicleMap.rows});
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

const getAllVehicle_ids = async (res) => {
    try {
        const getVehicle_id = await db.query(
            `SELECT * FROM circle_vehicle_maps`
        );
        return res.status(200).send({ statusCode: 200, vehicle_ids: getVehicle_id.rows });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

const getVehicle_idById = async (req, res) => {
    try {
        const getVehicle_id = await db.query(
            `SELECT * FROM circle_vehicle_maps WHERE id = $1`,
            [req.params.id]
        );
        if (getVehicle_id.rowCount == 0) {
            return res.status(404).send({ statusCode: 404, message:"There is no vehicle_id found with this id", });
          }
        return res.status(200).send({ statusCode: 200, vehicle_id: getVehicle_id.rows[0] });
    } catch (err) {
        console.log(err);

        return res.status(500).send(err);
    }
};

const replaceVehicle_id = async (req, res) => {
    try {
        const vehicle_id = req.body;
        const now = new Date().toISOString();
        const isVehicle_idExist = await db.query(
            `SELECT * FROM circle_vehicle_maps WHERE id = $1`,
            [req.params.id]
        );

        if (isVehicle_idExist.rowCount == 0) {
            return res.status(404).send({ status: 404, message:"There is no vehicle_id found with this id"
//en.vehicle_idNotFoundWithId 
});
        }
        const updateQuery = `UPDATE circle_vehicle_maps SET 
                            vehicle_id = '${vehicle_id.vehicle_id}',
                            updated_at = '${now}'
                            WHERE id = ${req.params.id}  RETURNING *`;

        const updatedData = await db.query(updateQuery);

        return res.status(200).send({ message: " vehicle_id Updated Successfully", status:200, vehicle_id:updatedData.rows[0]});
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

const updateVehicle_id = async (req, res) => {
  try {
    let vehicle_id = req.body;
    const now = new Date().toISOString();
    const existVehicle_id = await db.query(
      `SELECT * FROM circle_vehicle_maps WHERE id = $1`,
      [req.params.id]);

    if (existVehicle_id.rowCount == 0) {
      return res.status(404).send({ status: 404, message: "Vehicle_id not found with this id"
      // en.vehicle_idNotFound 
    });
    }

    const updateQuery = `UPDATE circle_vehicle_maps SET 
                         vehicle_id= '${vehicle_id.vehicle_id}',
                         updated_at = '${now}'
                         WHERE id = ${req.params.id}  RETURNING *`;

    const result = await db.query(updateQuery);
    return res.status(200).send({ message: " vehicle_id Updated Successfully", status:200, vehicle_id:result.rows[0]});
  } catch (err) {
    console.log(err);
    return res.status(500).send({ statusCode: 500, error: err });
  }
};

const deleteVehicle_id = async (req, res) => {
    try {
        const isVehicle_idExist = await db.query(
            `SELECT * FROM circle_vehicle_maps WHERE id = $1`,
            [req.params.id]
        );

        if (isVehicle_idExist.rowCount == 0) {
            return res.status(404).send({ status: 404, message:"There is no vehicle_id found with this id"
//en.vehicle_idNotFoundWithId 
});
        }
        await db.query(`DELETE FROM mapVehicles WHERE id = ${req.params.id}`);
        return res.status(204).send({ status: 204, message:"vehicle_id Deleted"
            // en.customerDeleted 
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

module.exports = {
    createCircleVehicle,
    getAllVehicle_ids,
    getVehicle_idById,
    replaceVehicle_id,
    updateVehicle_id,
    deleteVehicle_id,
};
