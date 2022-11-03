const dotenv = require('dotenv').config();
const jwt = require("jsonwebtoken");
const jwt_private_key = process.env.JWT_PRIVATE_KEY;
const db = require("../../config/dbConfig");
const exception = require("../../constants/exception.json");
const { encoder, decoder } = require("../../utils/encoder&decoder");

const createAdmin = async (req, res) => {
  try {
    const now = new Date().toISOString();
    const newAdmin = req.body;
    const existAdmin = await db.query(
      `SELECT * FROM admins WHERE user_name = $1;`,
      [newAdmin.user_name]
    );
    if (existAdmin.rowCount != 0) {
      return res.status(400).send({ statusCode: 400, message: exception.existAdmin });
    }
    const hashPassword = await encoder(newAdmin.password);

    const admin = await db.query(
      `INSERT INTO Admins (name,user_name,password,created_at,updated_at) VALUES('${newAdmin.name}','${newAdmin.user_name}','${hashPassword}','${now}','${now}') RETURNING *`);

    let permissionList = [];
    for (let permission of newAdmin.permissions) {
      const result = await db.query(
        `INSERT INTO admin_access_permissions (admin_id,permission_id) VALUES('${admin.rows[0].id}','${permission}') RETURNING permission_id`);
      permissionList.push(result.rows[0].permission_id);
    }
    return res.status(201).send({admin: admin.rows[0],permissions: permissionList});
  } catch (err) {
    console.log(err);
    return res.status(500).send({ statusCode: 500, error: err });
  }
};

const loginAdmin = async (req, res) => {
  const admin = req.body;
  try {
    const existAdmin = await db.query(
      `SELECT * FROM admins WHERE user_name =  $1;`,
      [admin.user_name]
    );
    if (existAdmin.rowCount == 0)
      return res.status(404).send({ statusCode: 404, message: exception.invalid });

    const hashPassword = existAdmin.rows[0].password;
    const decryptedPassword = await decoder(hashPassword);
    if (decryptedPassword != admin.password)
      return res.status(400).send({ statusCode: 400, message: exception.invalid });

    const permissions = await db.query(
      `SELECT permission_id FROM admin_access_permissions WHERE Admin_id = ${existAdmin.rows[0].id}`);

    let permissionList = [];
    for (var pId of permissions.rows) {
      permissionList.push(pId.permission_id);
    }
    const token = jwt.sign({ id: existAdmin.rows[0].id, permissions: permissionList},jwt_private_key);
    return res.send({
      data: existAdmin.rows[0],
      token: token
    });
  } catch (err) {
    res.status(500).send({ statusCode: 500, error: err });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const filterQuery = req.query;
    if (Object.keys(filterQuery).length != 0) {
      let admins = await db.query(
        `SELECT *,(SELECT ARRAY(SELECT p.permission_id FROM admin_access_permissions p WHERE p.admin_id = admins.id))AS permissions FROM admins ORDER BY admins.id`);
        admins = admins.rows.filter(admin => admin.user_name == req.query.searchString || admin.name == req.query.searchString);
        return res.status(200).send({statusCode:200, admins:admins});
    }
    const admins = await db.query(
        `SELECT *,(SELECT ARRAY(SELECT p.permission_id FROM admin_access_permissions p WHERE p.admin_id = admins.id))AS permissions FROM admins ORDER BY admins.id`);
    for (var i = 0; i < admins.rowCount; i++) {
        admins.rows[i].password = await decoder(admins.rows[i].password);
    }
    return res.status(200).send({ statusCode: 200, admins: admins.rows });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ statusCode: 500, error: err });
  }
};

const getAdminById = async (req, res) => {
  try {
    const admins = await db.query(
      `SELECT *,(SELECT ARRAY(SELECT p.permission_id FROM admin_access_permissions p WHERE p.admin_id = admins.id))AS permissions FROM admins WHERE admins.id = ${req.params.id} ORDER BY admins.id`);
    if (admins.rowCount == 0) {
      return res.status(404).send({ statusCode: 404, message: exception.adminNotFound });
    }
    admins.rows[0].password = await decoder(admins.rows[0].password);
    return res.status(200).send({ statusCode: 200, admin: admins.rows[0] });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ statusCode: 500, error: err });
  }
};

const replaceAdmin = async (req, res) => {
  try {
    const now = new Date().toISOString();
    let adminRequest = req.body;
    const existAdmin = await db.query(`SELECT * FROM admins WHERE id = $1;`, [req.params.id]);
    if (existAdmin.rowCount == 0)
      return res.status(404).send({ statusCode: 404, message: en.AdminNotFound });

    if (existAdmin.rows[0].user_name != adminRequest.user_name) {
      const adminName = await db.query(
        `SELECT * FROM admins WHERE user_name = $1;`,[adminRequest.user_name]);
      if (adminName.rowCount != 0) {
        return res.status(400).send({ statusCode: 400, message: exception.existAdmin });
      }
    }

    if (adminRequest.password != existAdmin.rows[0].password) {
        adminRequest.password = await encoder(adminRequest.password);
    }
    const updateQuery = `UPDATE admins SET 
                             name = '${adminRequest.name}', 
                             user_name = '${adminRequest.user_name}',
                             password = '${adminRequest.password}',
                             updated_at = '${now}'
                             WHERE id = ${req.params.id} RETURNING *`;
    const adminResult = await db.query(updateQuery);

    await db.query(`DELETE FROM admin_access_permissions WHERE admin_id = ${req.params.id}`);

    let permissionList = [];
    for (let permission of adminRequest.permissions) {
      const result = await db.query(
        `INSERT INTO admin_access_permissions (admin_id,permission_id) VALUES('${existAdmin.rows[0].id}','${permission}') RETURNING permission_id`);
      permissionList.push(result.rows[0].permission_id);
    }
    return res.status(201).send({statusCode: 200,admin: adminResult.rows[0],permissions: permissionList});
  } catch (err) {
    console.log(err);
    return res.status(500).send({ statusCode: 500, error: err });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const now = new Date().toISOString();
    let adminRequest = req.body;
    const existAdmin = await db.query(`SELECT * FROM admins WHERE id = $1;`, [req.params.id]);
    if (existAdmin.rowCount == 0)
      return res.status(404).send({ statusCode: 404, message: exception.adminNotFound });

    if (existAdmin.rows[0].user_name != adminRequest.user_name) {
      const adminName = await db.query(`SELECT * FROM admins WHERE user_name = $1;`,[adminRequest.user_name]);
      if (adminName.rowCount != 0) {
        return res.status(400).send({ statusCode: 400, message: exception.existAdmin });
      }
    }

    const updateName = adminRequest.name == null ? existAdmin.rows[0].name : adminRequest.name;
    const updateUserName = adminRequest.user_name == null ? existAdmin.rows[0].user_name : adminRequest.user_name;
    let updatePassword = adminRequest.password == null ? existAdmin.rows[0].password : adminRequest.password;

    if (updatePassword != existAdmin.rows[0].password) {
      updatePassword = await encoder(updatePassword);
    }
    const updateQuery = `UPDATE Admins SET 
                             name = '${updateName}', 
                             user_name = '${updateUserName}',
                             password = '${updatePassword}',
                             updated_at = '${now}'
                             WHERE id = ${req.params.id} RETURNING *`;
    const adminResult = await db.query(updateQuery);

    await db.query(`DELETE FROM admin_access_permissions WHERE admin_id = ${req.params.id}`);

    let permissionList = [];
    for (let permission of adminRequest.permissions) {
      const result = await db.query(
        `INSERT INTO admin_access_permissions (admin_id,permission_id) VALUES('${existAdmin.rows[0].id}','${permission}') RETURNING permission_id`);
      permissionList.push(result.rows[0].permission_id);
    }
    return res.status(201).send({ statusCode: 200, admin: adminResult.rows[0], permissions: permissionList });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ statusCode: 500, error: err });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const existAdmin = await db.query(`SELECT * FROM admins WHERE id = $1;`, [req.params.id]);
    if (existAdmin.rowCount == 0) {
      return res.status(404).send({ statusCode: 404, message: exception.AdminNotFound });
    }
    await db.query(`DELETE FROM admins WHERE id = ${req.params.id}`);
    await db.query(`DELETE FROM admin_access_permissions WHERE admin_id = ${req.params.id}`);
    return res.status(204).send({ statusCode: 204, message: exception.deleted });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ statusCode: 500, error: err });
  }
};

module.exports = {
  createAdmin,
  loginAdmin,
  getAllAdmins,
  getAdminById,
  replaceAdmin,
  updateAdmin,
  deleteAdmin,
};
