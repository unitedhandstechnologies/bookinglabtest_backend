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
     
      const existVehicleId = await db.query(`SELECT * FROM circle_vehicle_maps WHERE vehicle_id = $1 ;`,[vehicle.vehicle_id]);
      if (existVehicleId.rowCount != 0) {
        return res.status(404).send({ statusCode: 404, message:"Already a vehicle exist with this id" });
      }

        const  circleVehicles = await db.query(`SELECT * FROM vehicles WHERE id IN (${vehicle.vehicle_id})`);
      
        const existVehicle = await db.query(
            `SELECT * FROM vehicles WHERE id = ${vehicle.vehicle_id}`);
            if(existVehicle.rowCount == 0)
            {
              return res.status(404).send({statusCode : 404 , message:"Vehicle Not Found With This Id"})
            }

        const NewVehicle = await db.query(
            `INSERT INTO circle_vehicle_maps (circle_id,vehicle_id,created_at) 
            VALUES('${req.params.circle_id}','${circleVehicles.rows[0].id}','${now}')
              RETURNING *`);
    
        return res.status(201).send({statusCode:201, vehicles:NewVehicle.rows[0]});
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

const getAllVehiclesInCircle = async (req,res) => {
    try {
        const getVehicle_id = await db.query(
            `SELECT * FROM circle_vehicle_maps`
        );

        if(getVehicle_id.rowCount == 0)
            {
              return res.status(404).send({statusCode : 404 , message:"No Data Found"})
            }

        return res.status(200).send({ statusCode: 200, vehicle_ids: getVehicle_id.rows });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

async function getVehicleInCircleById(req, res) {
    try {
        const getVehicle = await db.query(
            `SELECT * FROM circle_vehicle_maps WHERE id = $1`,
            [req.params.id]
        );
        if (getVehicle.rowCount == 0) {
            return res.status(404).send({ statusCode: 404, message: "There is no vehicle found with this id", });
        }
        return res.status(200).send({ statusCode: 200, Vehicles: getVehicle.rows });
    } catch (err) {
        console.log(err);

        return res.status(500).send(err);
    }
}

const getVehiclesInCircle = async (req, res) => {
    try {
        const existCircleId = await db.query(`SELECT * FROM circles WHERE id = $1;`,[req.params.circle_id]);
        if (existCircleId.rowCount == 0) {
          return res.status(404).send({ statusCode: 404, message:"Circle Not found with this id" });
        }
        const getCircle = await db.query(
            `SELECT * FROM circle_vehicle_maps WHERE circle_id = $1`,
            [req.params.circle_id]
        );
                
        if (getCircle.rowCount == 0) {
            return res.status(404).send({ statusCode: 404, message:"There are no vehicles found in this circle", });
          }
        return res.status(200).send({ statusCode: 200, Vehicles: getCircle.rows });
   
    } catch (err) {
        console.log(err);

        return res.status(500).send(err);
    }
};

const updateVehicleInCircle = async (req, res) => {
    try {
        const Vehicle = req.body;
        const now = new Date().toISOString();
        const isCircle_idExist = await db.query(
            `SELECT * FROM circle_vehicle_maps WHERE circle_id = $1`,
            [req.params.circle_id]
        );

        if (isCircle_idExist.rowCount == 0) {
            return res.status(404).send({ status: 404, message:"There is no circle found with this id"
});
        }

        const existVehicleIdInCircle = await db.query(`SELECT * FROM circle_vehicle_maps WHERE vehicle_id = $1 ;`,[Vehicle.vehicle_id]);
      if (existVehicleIdInCircle.rowCount != 0) {
        return res.status(404).send({ statusCode: 404, message:"Already a vehicle exist with this id" });
      }
        
            const existVehicleId = await db.query(
                `SELECT * FROM circle_vehicle_maps WHERE id = $1`,
                [req.params.id]);
            const updateVehicle_id = Vehicle.vehicle_id == null ? existVehicleId.rows[0].vehicle_id : Vehicle.vehicle_id;
            
        const updateQuery =`UPDATE circle_vehicle_maps SET 
                            circle_id = '${req.params.circle_id}',
                            vehicle_id = '${updateVehicle_id}',
                            updated_at = '${now}'
                            WHERE id = ${req.params.circle_id}  RETURNING *`;

         const updatedData = await db.query(updateQuery);
    
        return res.status(200).send({ message: " vehicle_id Updated Successfully", status:200, updatedVehicle:updatedData.rows});
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};


const deleteVehicleInCircle = async (req, res) => {
    try {
        const isCircleVehicleIdExist = await db.query(
            `SELECT * FROM circle_vehicle_maps WHERE id = $1`,
            [req.params.id]
        );

        if (isCircleVehicleIdExist.rowCount == 0) {
            return res.status(404).send({ status: 404, message:"CircleVehicleId Not Found"
});}
        await db.query(`DELETE FROM circle_vehicle_maps WHERE id = ${req.params.id}`);
        return res.status(204).send({ status: 204, message:"vehicle Deleted from the circle"
            // en.customerDeleted 
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

module.exports = {
    createCircleVehicle,
    getAllVehiclesInCircle,
    getVehicleInCircleById,
    getVehiclesInCircle,
    updateVehicleInCircle,
    deleteVehicleInCircle,
};
