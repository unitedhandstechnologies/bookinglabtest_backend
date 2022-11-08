const db = require("../../config/dbConfig");
const exception = require("../../constants/exception.json");
const enMessage = require("../../constants/enMessage.json");

const createaddress = async (req, res) => {
  try {   
    const now = new Date().toISOString();
    const addressCreateRequest = req.body;
    const user = req.params;
    const existUser = await db.query(
      `SELECT * FROM users WHERE id = $1;`,
      [user.user_id]
    );
    if (existUser.rowCount == 0)
    {
      return res.status(404).send({statusCode:404,message:enMessage.failure,address:exception,userNotFound});
    } 
    const userAddressDetails = await db.query(
      `SELECT * FROM user_addresses WHERE user_id = $1 AND pincode = $2`,
    [user.user_id,addressCreateRequest.pincode]
    );
    if(userAddressDetails.rowCount != 0)
    {
    return res.status(400).send({statusCode:400,message:enMessage.failure,address:exception.alreadyAddressExist})
    }
    const newAddress = await db.query(
      `INSERT INTO user_addresses (user_id,address_line1,address_line2,address_line3,city,state,pincode,map_location,created_at,updated_at) 
      VALUES ('${user.user_id}','${addressCreateRequest.address_line1}','${addressCreateRequest.address_line2}','${addressCreateRequest.address_line3}','${addressCreateRequest.city}','${addressCreateRequest.state}','${addressCreateRequest.pincode}','${addressCreateRequest.map_location}','${now}','${now}')
      RETURNING *`
        );
    return res.status(201).send({ statusCode: 201,message:enMessage.success, Address: newAddress.rows[0] });
  } catch (err) {
    console.log(err);
    return res.status(500).send({statusCode:500,message:enMessage.failure,error:err});
  }
};

const getAllAddress = async (req, res) => {
    try {
      const userAddress = req.params;
      const user = await db.query(
        `SELECT * FROM users WHERE id = $1;`
        ,[userAddress.user_id]);
      if(user.rowCount == 0){
        return res.status(404).send({statusCode:404,message:enMessage.failure,Address:exception.userNotFound})
      }
      const userAddressDetails = await db.query(
        `SELECT * FROM user_addresses WHERE user_id = $1 AND id =$2 ORDER BY id;`
        ,[userAddress.user_id,userAddress.id]
      );
      if(userAddressDetails.rowCount == 0 )
      {
        return res.status(404).send({statusCode:404,message:enMessage.failure,address:exception.addressNotFound});
      }
      return res.status(200).send({ statusCode: 200, message:enMessage.success,address: userAddressDetails.rows[0] });
    } catch (err) {
      console.log(err);
      return res.status(500).send({statusCode:500,message:enMessage.failure,Error:err});
    }
  };

const getAddressById = async (req, res) => {
  try {
    const userAddressParam = req.params;
    const getaddress = await db.query(
      `SELECT * FROM user_addresses WHERE user_id = $1`,
    [userAddressParam.user_id]
    );
    if(getaddress.rowCount == 0)
    {
    return res
    .status(404)
    .send({ statusCode:404,message:enMessage.failure,vechicle:exception.addressNotFound });
    }
    return res
    .status(200)
    .send({ statusCode: 200,message:enMessage.success, message: getaddress.rows });
  } catch (err) {
    console.log(err);
    return res.status(500).send({statusCode:500,message:enMessage.failure,error:err});
  }
};

const replaceAddress = async (req, res) => {
  try {
    const addressReplaceRequest = req.body;
    const userAddressParam = req.params;
    const now = new Date().toISOString();
    const user= await db.query(
      `SELECT * FROM users WHERE id = $1;`,
      [userAddressParam.user_id]
    );
    if (user.rowCount == 0) {
      return res
      .status(404)
      .send({ status: 404, message:enMessage.failure,address:exception.addressNotFound });
    }
    const AddressDetails = await db.query(
      `SELECT * FROM user_addresses WHERE user_id = $1 AND id = $2;`,
      [userAddressParam.user_id,userAddressParam.id]
    );
    if (AddressDetails.rowCount == 0) {
      return res
        .status(404)
        .send({message: exception.addressNotFound});
    }
    const replaceQuery = `UPDATE user_addresses SET 
                            address_line1 = '${addressReplaceRequest.address_line1}',
                            address_line2 = '${addressReplaceRequest.address_line2}',
                            address_line3 = '${addressReplaceRequest.address_line3}',
                            city = '${addressReplaceRequest.city}',
                            state = '${addressReplaceRequest.state}',
                            pincode = '${addressReplaceRequest.pincode}', 
                            map_location = '${addressReplaceRequest.map_location}',                           
                            updated_at = '${now}'
                            WHERE id = ${userAddressParam.id}  RETURNING *`;
    const result = await db.query(replaceQuery);
    return res.status(200).send({statusCode:200,message:enMessage.success,address:result.rows[0]});
  } catch (err) {
    console.log(err);
    return res.status(500).send({statusCode:500,message:enMessage.failure,error:err});
  }
};

const updateAddress = async (req, res) => {
  try {
    let addressReplaceRequest = req.body;
    const now = new Date().toISOString();
    const AddressDetails = req.params;
    const user = await db.query(
      `SELECT * FROM users WHERE id = $1;`,
      [AddressDetails.user_id]
    );
    if(user.rowCount == 0) 
    {
      return res
        .status(404)
        .send({statusCode:404,message:enMessage.failure,Address: exception.addressNotFound });
    }
    const existAddress = await db.query(
      `SELECT * FROM user_addresses WHERE user_id = $1 AND id = $2;`,
      [AddressDetails.user_id,AddressDetails.id]
    );
    if(existAddress.rowCount == 0) 
    {
      return res.status(404).send({ status: 404,message:enMessage.failure,address:exception.addressNotFound});
    }
    updateAddress_line1 = addressReplaceRequest.address_line1 == null ? dexistAddress.rows[0].address_line1 : addressReplaceRequest.address_line1 ;
    updateAddress_line2 = addressReplaceRequest.address_line2 == null ? existAddress.rows[0].address_line2 : addressReplaceRequest.address_line2 ;
    updateAddress_line3 = addressReplaceRequest.address_line3 == null ? existAddress.rows[0].address_line3 : addressReplaceRequest.address_line3 ;
    updateCity = addressReplaceRequest.city == null ? existAddress.rows[0].city : addressReplaceRequest.city;
    updateState = addressReplaceRequest.state == null ? existAddress.rows[0].state : addressReplaceRequest.state;
    updatePincode = addressReplaceRequest.pincode == null ? existAddress.rows[0].pincode : addressReplaceRequest.pincode;
    updateMap_location = addressReplaceRequest.map_location == null ? existAddress.rows[0].map_location : addressReplaceRequest.map_location;
    
    const updateQuery = `UPDATE user_addresses SET 
                            address_line1 = '${updateAddress_line1}',
                            address_line2 = '${updateAddress_line2}',
                            address_line3 = '${updateAddress_line3}',
                            city = '${updateCity}',
                            state = '${updateState}',
                            pincode = '${updatePincode}',  
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

const deleteAddress= async (req, res) => {
  try { 
    const userAddressParam = req.params;
    const user = await db.query(
      `SELECT * FROM users WHERE id = $1;`,
      [userAddressParam.user_id]
    );
    if(user.rowCount == 0)
    {
      return res
      .status(404)
      .send({statusCode:404,message:enMessage.failure,address:exception.addressNotFound}
      );
    }
    const isAddressExist = await db.query(
      `SELECT * FROM user_addresses WHERE user_id = $1 AND id = $2;`,
      [userAddressParam.user_id,userAddressParam.id]
    );
    if (isAddressExist.rowCount == 0) {
      return res
      .status(404)
      .send({ status: 404,message:enMessage.failure,addrerss:exception.addressNotFound});
    }
    await db.query(
      `DELETE FROM user_addresses WHERE id = ${userAddressParam.id}`
      );
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
  deleteAddress
};
