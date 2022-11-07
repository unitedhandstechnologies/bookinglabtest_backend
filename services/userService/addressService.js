const db = require("../../config/dbConfig");
const exception = require("../../constants/exception.json");
const enMessage = require("../../constants/enMessage.json");

const createaddress = async (req, res) => {
  try {
    const addressCreateRequest = req.body;
    const now = new Date().toISOString();

    const existAddress = await db.query(
      `SELECT * FROM addresses WHERE mobile_number = $1;`,
      [addressCreateRequest.mobile_number]
    );
    if (existAddress.rowCount != 0)
      return res.status(401).send({statusCode:401,message:enMessage.failure,address:exception.alreadyAddressExist});
    const newAddress = await db.query(
      `INSERT INTO addresses (address_line1,address_line2,address_line3,city,state,pincode,mobile_number,map_location,created_at,updated_at) 
       VALUES ('${addressCreateRequest.address_line1}','${addressCreateRequest.address_line2}','${addressCreateRequest.address_line3}','${addressCreateRequest.city}','${addressCreateRequest.state}','${addressCreateRequest.pincode}','${addressCreateRequest.mobile_number}','${addressCreateRequest.map_location}','${now}','${now}')
        RETURNING *`);
    return res.status(201).send({ statusCode: 201,message:enMessage.success, Address: newAddress.rows[0] });
  } catch (err) {
    console.log(err);
    return res.status(500).send({statusCode:500,message:enMessage.failure,error:err});
  }
};

const getAllAddress = async (req, res) => {
    try {
      const Location = await db.query(
        `SELECT * FROM addresses ORDER BY id`
      );
      return res.status(200).send({ statusCode: 200, message:enMessage.success,address: Location.rows });
    } catch (err) {
      console.log(err);
      return res.status(500).send({statusCode:500,message:enMessage.failure,Error:err});
    }
  };

const getAddressById = async (req, res) => {
  try {
    const getaddress = await db.query(`SELECT * FROM addresses where id = $1`,[req.params.id]);
    if(getaddress.rowCount == 0){
    return res.status(404).send({ statusCode:404,message:enMessage.failure,vechicle:exception.addressNotFound });
    }
    return res.status(200).send({ statusCode: 200,message:enMessage.success, message: getaddress.rows[0] });
  } catch (err) {
    console.log(err);
    return res.status(500).send({statusCode:500,message:enMessage.failure,error:err});
  }
};

const replaceAddress = async (req, res) => {
  try {
    const addressReplaceRequest = req.body;
    const now = new Date().toISOString();
    const isAddressExist = await db.query(
      `SELECT * FROM addresses WHERE id = $1`,
      [req.params.id]
    );
    if (isAddressExist.rowCount == 0) {
      return res.status(404).send({ status: 404, message:enMessage.failure,address:exception.addressNotFound });
    }
    const updateQuery = `UPDATE addresses SET 
                            address_line1 = '${addressReplaceRequest.address_line1}',
                            address_line2 = '${addressReplaceRequest.address_line2}',
                            address_line3 = '${addressReplaceRequest.address_line3}',
                            city = '${addressReplaceRequest.city}',
                            state = '${addressReplaceRequest.state}',
                            pincode = '${addressReplaceRequest.pincode}', 
                            mobile_number = '${addressReplaceRequest.mobile_number}', 
                            map_location = '${addressReplaceRequest.map_location}',                           
                            updated_at = '${now}'
                            WHERE id = ${req.params.id}  RETURNING *`;

    const updatedData = await db.query(updateQuery);

    return res.status(200).send({statusCode:200,message:enMessage.success,address:updatedData.rows[0]});
  } catch (err) {
    console.log(err);
    return res.status(500).send({statusCode:500,message:enMessage.failure,error:err});
  }
};

const updateAddress = async (req, res) => {
  try {
    let addressReplaceRequest = req.body;
    const now = new Date().toISOString();
    const existAddress = await db.query(
      `SELECT * FROM addresses WHERE id = $1`,
      [req.params.id]
    );
    if (existAddress.rowCount == 0) {
      return res.status(404).send({ status: 404,message:enMessage.failure,address:exception.addressNotFound});
    }
    updateAddress_line1 = addressReplaceRequest.address_line1 == null ? dexistAddress.rows[0].address_line1 : addressReplaceRequest.address_line1 ;
    updateAddress_line2 = addressReplaceRequest.address_line2 == null ? existAddress.rows[0].address_line2 : addressReplaceRequest.address_line2 ;
    updateAddress_line3 = addressReplaceRequest.address_line3 == null ? existAddress.rows[0].address_line3 : addressReplaceRequest.address_line3 ;
    updateCity =
        addressReplaceRequest.city == null
        ? existAddress.rows[0].city
        : addressReplaceRequest.city;
    updateState = 
        addressReplaceRequest.state == null
        ? existAddress.rows[0].state
        : addressReplaceRequest.state;
    updatePincode =
        addressReplaceRequest.pincode == null
        ? existAddress.rows[0].pincode
        : addressReplaceRequest.pincode;
    updateMobileNumber =
        addressReplaceRequest.mobile_number == null
        ? existAddress.rows[0].mobile_number
        : addressReplaceRequest.mobile_number;
    updateMap_location = 
        addressReplaceRequest.map_location == null
        ? existAddress.rows[0].map_location
        : addressReplaceRequest.map_location;
    const updateQuery = `UPDATE addresses SET 
                            address_line1 = '${updateAddress_line1}',
                            address_line2 = '${updateAddress_line2}',
                            address_line3 = '${updateAddress_line3}',
                            city = '${updateCity}',
                            state = '${updateState}',
                            pincode = '${updatePincode}',
                            mobile_number = '${updateMobileNumber}',   
                            map_location = '${updateMap_location}',                      
                            updated_at = '${now}'
                  WHERE  id = ${req.params.id} RETURNING *`;
    const result = await db.query(updateQuery);
    return res.status(200).send({statusCode:200,message:enMessage.success,address:result.rows[0]});
  } catch (err) {
    console.log(err);
    return res.status(500).send({ statusCode: 500,message:enMessage.failure,error: err });
  }
};

const deleteaddress= async (req, res) => {
  try { 
    const isAddressExist = await db.query(
      `SELECT * FROM addresses WHERE id = $1`,
      [req.params.id]
    );
    if (isAddressExist.rowCount == 0) {
      return res.status(404).send({ status: 404,message:enMessage.failure,addrerss:exception.addressNotFound});
    }
    await db.query(`DELETE FROM addresses WHERE id = ${req.params.id}`);
    return res.status(204).send({ status: 204,message:enMessage.success ,address: exception.delete});
  } catch (err) {
    console.log(err);
    return res.status(500).send({ statusCode: 500,message:enMessage.failure,error: err });
  }
};

module.exports = {
  createaddress,
  getAllAddress,
  getAddressById,
  replaceAddress,
  updateAddress,
  deleteaddress
};
