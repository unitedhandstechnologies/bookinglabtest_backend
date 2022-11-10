const db = require("../../config/dbConfig");
const exception = require("../../constants/exception.json");
const enMessage = require("../../constants/enMessage.json");

const createVehicle = async(req,res) => {
  try{
      const now  = new Date().toISOString();
      const newVehicle = req.body;
      const vehicle = await db.query(`INSERT INTO vehicles(vehicle_number,vehicle_name,vehicle_type,description,created_at,updated_at) VALUES ('${newVehicle.vehicle_number}','${newVehicle.vehicle_name}','${newVehicle.vehicle_type}','${newVehicle.description}','${now}','${now}') RETURNING *`);
      const testDetails = await db.query(
          `SELECT * FROM test_details WHERE id IN (${newVehicle.test_details_id})`);
      let vehicleList = [];
      for(var i = 0 ; i < testDetails.rowCount; i++)
      {
          const result = await db.query(
              `INSERT INTO vehicle_test_details (vehicle_id,test_details_id,test_name) VALUES ('${vehicle.rows[0].id}',
              '${testDetails.rows[i].id}','${testDetails.rows[i].test_name}') RETURNING *`);
          vehicleList.push(result.rows[0].test_details_id);
          }   
      return res.status(201).send({statusCode:201,message:enMessage.success,vehicle:vehicle.rows[0], test_details_id:vehicleList});
  }
  catch (err) 
  {
  console.log(err);
  return res.status(500).send({statusCode:500,message:enMessage.failure,error:err});
  }
};
const getAllVehicle  = async(req,res) =>{
    try {
        const isVehcilesExist = req.query;
        if (isVehcilesExist.rowCount == 0){
            return res
            .status(400)
            .send({statusCode:400,message:enMessage.failure,vehicle:exception.vehiclesNotFoundWithThisId});
        }
    let vehicles= await db.query(
        `SELECT *,(SELECT ARRAY(SELECT test_details_id FROM vehicle_test_details  WHERE vehicle_id = vehicles.id))AS test_details_id FROM vehicles ORDER BY vehicles.id`);
        return res.status(200).send({statusCode:200,message:enMessage.success,vehicle:vehicles.rows});
    } 
    catch (err){
        console.log(err);
        return res.status(500).send({ statusCode: 500,message:enMessage.failure,error: err });
      }
    };
    const getVehicleById = async (req,res) =>{
        try{
            const vehicles = await db.query(
                `SELECT *,(SELECT ARRAY(SELECT test_details_id FROM vehicle_test_details WHERE vehicle_id = vehicles.id))AS test_details_id FROM vehicles WHERE vehicles.id= ${req.params.id} ORDER BY vehicles.id`);
                if (vehicles.rowCount == 0) {
                    return res
                      .status(404)
                      .send({ message:exception.vehiclesNotFoundWithThisId });
                  }
                  return res.status(200).send({ statusCode: 200,message:enMessage.success,vehicle: vehicles.rows[0] });
        }
        catch (err) {
            console.log(err);
            return res.status(500).send({ statusCode: 500, message:enMessage.failure,error: err });
    }
    };
    const replaceVehicle = async (req, res) => {
      try {
        const now = new Date().toISOString();
        let VehicleRequest = req.body;
        const existVehicle = await db.query(
          `SELECT * FROM vehicles WHERE id = ${req.params.id}`);
          if(existVehicle.rowCount == 0)
          {
            return res.status(404).send({statusCode : 404 , message:enMessage.failure, vehicle:exception.vehiclesNotFoundWithThisId})
          }
        const updateQuery = `UPDATE vehicles SET 
                                 vehicle_number = '${VehicleRequest.vehicle_number}', 
                                 vehicle_name = '${VehicleRequest.vehicle_name}',
                                 vehicle_type = '${VehicleRequest.vehicle_type}',
                                 description = '${VehicleRequest.description}',
                                 updated_at = '${now}'
                                 WHERE id = ${req.params.id} RETURNING *`;
        const vehicleResult = await db.query(updateQuery);  
        await db.query(
          `DELETE FROM vehicle_test_details WHERE vehicle_id = ${req.params.id}`);
        const testDetails = await db.query(
          `SELECT * FROM test_details WHERE id IN (${VehicleRequest.test_details_id})`);
        let vehicleList = [];
        for(var i = 0 ; i < testDetails.rowCount; i++){
          const result = await db.query(
          `INSERT INTO vehicle_test_details (vehicle_id,test_details_id
            ,test_name) VALUES ('${existVehicle.rows[0].id}',
          '${testDetails.rows[i].id}','${testDetails.rows[i].test_name}') RETURNING *`);
          vehicleList.push(result.rows[0].test_details_id);
        }
        return res.status(201).send({statusCode: 200,message:enMessage.success,vehicle: vehicleResult.rows[0],test_details_id:vehicleList});
      } catch (err) {
        console.log(err);
        return res.status(500).send({ statusCode: 500, error: err });
      }
    };
  const updateVehicle = async(req, res) => {
        try {
          const now = new Date().toISOString();
          const vehicleRequest = req.body;
          const existVehicle = await db.query(
            `SELECT * FROM vehicles WHERE id = ${req.params.id}`);
            if(existVehicle.rowCount == 0)
            {
              return res.status(404).send({statusCode : 404 , message:enMessage.failure, vehicle:exception.vehiclesNotFoundWithThisId})
            }
          const updateVehicleNumber = vehicleRequest.vehicle_number == null ? existVehicle.rows[0].vehicle_number: vehicleRequest.vehicle_number;
          const updateVehicleName = vehicleRequest.vehicle_name == null ? existVehicle.rows[0].vehicle_name: vehicleRequest.vehicle_name;
          const updateVehicleType = vehicleRequest.vehicle_type == null ? existVehicle.rows[0].vehicle_type : vehicleRequest.vehicle_type;
          const updateDescription = vehicleRequest.description == null ? existVehicle.rows[0].description : vehicleRequest.description;
          const updateQuery = `UPDATE vehicles SET
                                        vehicle_number = '${updateVehicleNumber}',
                                        vehicle_name   = '${updateVehicleName}',
                                        vehicle_type   = '${updateVehicleType}',
                                        description    = '${updateDescription}',
                                        updated_at = '${now}'
                                        WHERE id       =  ${req.params.id} RETURNING *`;
          const  vehicleResult = await db.query(updateQuery);
        await db.query(
          `DELETE FROM vehicle_test_details WHERE vehicle_id = ${req.params.id}`
        );
        const testDetails = await db.query(
          `SELECT * FROM test_details WHERE id IN (${vehicleRequest.test_details_id})`);
        let vehicleList = [];
        for(var i = 0 ; i < testDetails.rowCount; i++)
      {
          const result = await db.query(
          `INSERT INTO vehicle_test_details (vehicle_id,test_details_id
            ,test_name) VALUES ('${existVehicle.rows[0].id}',
          '${testDetails.rows[i].id}','${testDetails.rows[i].test_name}') RETURNING *`);
          vehicleList.push(result.rows[0].test_details_id);
        }
        return res
          .status(201)
          .send({
            statusCode: 200,
            message:enMessage.success,
            vehicle:vehicleResult.rows[0],
            test_details_id:vehicleList,
          });
        } catch (err) {
          console.log(err);
          return res.status(500).send({statusCode:500,message:enMessage.failure,error:err});
        }
      };
      const deleteVehicle= async (req, res) => {
        try {
          const existVehicle = await db.query(`SELECT * FROM vehicles WHERE id= $1;`, [
            req.params.id,
          ]);
          if (existVehicle.rowCount == 0) {
            return res
              .status(404)
              .send({ statusCode: 404, message:enMessage.failure,vehicle:exception.vehiclesNotFoundWithThisId });
          }
          await db.query(`DELETE FROM vehicles WHERE id = ${req.params.id}`);
          await db.query(
            `DELETE FROM vehicle_test_details WHERE test_details_id = ${req.params.id}`
          );
          return res.status(204).send({ statusCode: 204, message:enMessage.success,vehicle: exception.deleted });
        } catch (err) {
          console.log(err);
          return res.status(500).send({ statusCode: 500, message:enMessage.failure,error: err });
        }
      };
module.exports = {
  createVehicle,
  getAllVehicle,
  getVehicleById,
  replaceVehicle,
  updateVehicle,
  deleteVehicle
}