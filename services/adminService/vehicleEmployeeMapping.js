const db = require("../../config/dbConfig");
const exception = require("../../constants/exception.json");
const enMessage = require("../../constants/enMessage.json");

const createEmployeeVehicleMapping = async (req,res) =>{
    try{
    const now  = new Date().toISOString();
    const existVehicle = await db.query(
            `SELECT * FROM  vehicles WHERE id = $1;`,
            [req.params.vehicle_id]
        );
    if(existVehicle.rowCount == 0)
        {
            res
            .status(404)
            .send({statusCode : 404 ,message:enMessage.failure,vehicle:exception.vehiclesNotFoundWithThisId})
        }

        const existEmployee = await db.query(
            `SELECT * FROM  employees WHERE id = $1;`,
            [req.body.employee_id]
        );
    if(existEmployee.rowCount == 0)
        {
            res
            .status(404)
            .send({statusCode : 404 ,message:enMessage.failure,employee:exception.employeeNotFoundWithThisId})
        }

    const employeeVehicleMapping = await db.query(
        `SELECT * FROM vehicle_employee_mappings WHERE employee_id = $1 OR vehicle_id = $2;`,
    [req.body.employee_id,req.params.vehicle_id]
       );
    if(employeeVehicleMapping.rowCount != 0){
        return res
        .status(400)
        .send({statusCode:400,message:enMessage.failure,employeeMapping:exception.employeeAssigned})
    }
    const newEmployeeMapping = await db.query(
        `INSERT INTO vehicle_employee_mappings (employee_id,vehicle_id,created_at,updated_at) 
        VALUES ('${req.body.employee_id}','${req.params.vehicle_id}','${now}','${now}') RETURNING *`
        );
      return res
      .status(201)
      .send({ statusCode: 201,message:enMessage.success,employeeMapping: newEmployeeMapping.rows[0] });
    }catch(err){
        console.log(err);
        res.status(500).send({statusCode:500,message:enMessage.failure,Error:err});
    }
};

const getAllVehicleEmployeeMapping = async (req,res) =>{
    try{
const VehicleMapping = await db.query(`SELECT * FROM vehicle_employee_mappings ORDER BY id;`);
if (VehicleMapping.rowCount == 0) {
return res
  .status(404)
  .send({employeeMapping: exception.getVehicleMapping});
}
return res
    .status(200)
    .send({ employeeMapping: VehicleMapping.rows });
    }catch(err){
        console.log(err);
        res.status(500).send({statusCode:500,message:enMessage.failure,Error:err});
    }
};

const getVehicleEmployeeMappingById = async (req ,res) =>{
    try{
       const vehicle = await db.query(
        `SELECT * FROM vehicles WHERE id = $1;`
       ,[req.params.vehicle_id]
       );
       if(vehicle.rowCount == 0)
       {
        return res
        .status(404)
        .send({statusCode:404,message:enMessage.failure,employeeMapping:exception.vehiclesNotFoundWithThisId})
       }
       const getVehicleEmployeeMapping = await db.query(
        `SELECT * FROM vehicle_employee_mappings WHERE vehicle_id = $1 AND id = $2 ORDER BY id;`
       ,[req.params.vehicle_id,req.params.id]
       );
       if(getVehicleEmployeeMapping.rowCount == 0 )
       {
         return res
         .status(404)
         .send({statusCode:404,message:enMessage.failure,employeeMapping:exception.employeeVehicleMapping});
       }
       return res
       .status(200)
       .send({ statusCode: 200, message:enMessage.success,employeeMapping:getVehicleEmployeeMapping.rows[0] });
    }  
    catch(err){
        console.log(err);
        res.status(500).send({statusCode:500,message:enMessage.failure,Error:err});
    }
};

const replaceVehicleEmployeeMapping = async(req,res) =>{
    try{
        const now  = new Date().toISOString();
        const existVehicle = await db.query(
            `SELECT * FROM  vehicles WHERE id = $1;`,
            [req.params.vehicle_id]
        );
        if(existVehicle.rowCount == 0)
        {
            res
            .status(404)
            .send({statusCode : 404 ,message:enMessage.failure,employeeMapping:exception.vehiclesNotFoundWithThisId})
        }
        const existEmployee = await db.query(
            `SELECT * FROM  employees WHERE id = $1;`,
            [req.body.employee_id]
        );
        if(existEmployee.rowCount == 0)
        {
            res
            .status(404)
            .send({statusCode : 404 ,message:enMessage.failure,employeeMapping:exception.employeeNotFoundWithThisId})
        }
        const employeeVehicleMapping = await db.query(
            `SELECT * FROM vehicle_employee_mappings WHERE employee_id = $1 ;`,
            [req.body.employee_id]
           );
        if(employeeVehicleMapping.rowCount != 0){
            return res
            .status(400)
            .send({statusCode:400,message:enMessage.failure,employeeMapping:exception.employeeAssigned})
        }
        const replaceQuery = `UPDATE vehicle_employee_mappings SET
                            employee_id = '${req.body.employee_id}',
                            updated_at = '${now}'
                            WHERE id  = ${req.params.id} RETURNING *`;
        const result = await db.query(replaceQuery);
        return res.status(200).send({statusCode:200,message:enMessage.success,employeeMapping:result.rows[0]});
    }catch(err){
    console.log(err);
    return res.status(500).send({statusCode:500,message:enMessage.failure,error:err});
    }
};
// const updateVehicleEmployeeMapping = async(req,res) =>{
//     try{
//         const now = new Date().toISOString();
//         const existVehicle = await db.query(
//             `SELECT * FROM  vehicles WHERE id = $1;`,
//             [req.params.vehicle_id]
//         );
//         if(existVehicle.rowCount == 0)
//         {
//             res
//             .status(404)
//             .send({statusCode : 404 ,message:enMessage.failure,employeeMapping:exception.vehiclesNotFoundWithThisId})
//         }
//         const employeeVehicleMapping = await db.query(
//             `SELECT * FROM vehicle_employee_mappings WHERE employee_id = $1;`,
//         [req.body.employee_id]
//            );
//         if(employeeVehicleMapping.rowCount != 0){
//             return res
//             .status(400)
//             .send({statusCode:400,message:enMessage.failure,employeeMapping:exception.employeeAssigned})
//         }
//            const updateQuery = `UPDATE vehicle_employee_mappings SET 
//                 employee_id = '${req.body.employee_id}',
//                 updated_at = '${now}'
//                 WHERE  id = ${req.params.id} RETURNING *`;
//                 const result = await db.query(updateQuery);
//                 return res
//                 .status(200)
//                 .send({statusCode:200,message:enMessage.success,employeeMapping:result.rows[0]});
//     }catch(err){
//         console.log(err);
//         return res.status(500).send({statusCode:500,message:enMessage.failure,Errpr:err});

//     }
// };

const deleteVehicleEmployeeMapping =  async(req,res) =>{
    try{
        const employee = await db.query(
            `SELECT * FROM vehicles WHERE id = $1;`,
            [req.params.vehicle_id]
          );
          if(employee.rowCount == 0)
          {
            return res
            .status(404)
            .send({statusCode:404,message:enMessage.failure,employeeMapping:exception.addressNotFound}
            );
          }
          const isEmployeeExist = await db.query(
            `SELECT * FROM vehicle_employee_mappings WHERE vehicle_id = $1 AND id = $2;`,
            [req.params.vehicle_id,req.params.id]
          );
          if (isEmployeeExist.rowCount == 0) {
            return resc
            .status(404)
            .send({ status: 404,message:enMessage.failure,employeeMapping:exception.employeeNotFound});
          }
          await db.query(
            `DELETE FROM vehicle_employee_mappings WHERE id = ${req.params.id}`
            );
          return res.status(204).send({ status: 204,message:enMessage.success ,employeeMapping: exception.delete});

    }catch(err){
        console.log(err);
        return res.status(500).send({statusCode:500,message:enMessage.failure,Errpr:err});
    }
}
module.exports = {
    createEmployeeVehicleMapping,
    getVehicleEmployeeMappingById,
    getAllVehicleEmployeeMapping,
    replaceVehicleEmployeeMapping,
    //updateVehicleEmployeeMapping,
    deleteVehicleEmployeeMapping
}