const db = require("../../config/dbConfig");
const dotenv = require('dotenv').config();
const jwt = require("jsonwebtoken");
const jwt_private_key = process.env.JWT_PRIVATE_KEY;
const { encoder, decoder } = require("../../utils/encoder&decoder");
const notificationService = require("../../services/adminService/notificationService");

//const exception = require("../../../constants/exception.json");

const createEmployee = async (req, res) => {
    try {
        const Employee = req.body;
        const now = new Date().toISOString();
        
        const checkEmployee = await db.query(`SELECT * FROM employees WHERE  mobile_number = '${Employee.mobile_number}'`);
        if (checkEmployee.rowCount != 0) {
         return res.status(400).send({ statusCode: 400, message:"Employee with this Mobile number already exist"
           // employee: exception.existEmployee 
        });
        }    
        const hashPassword = await encoder(Employee.password);
        const newEmployee = await db.query(
          `INSERT INTO employees (user_name,password,employee_name,qualification,age,mobile_number,email,address,work_status,created_at,updated_at) 
           VALUES ('${Employee.user_name}','${hashPassword}','${Employee.employee_name}','${Employee.qualification}','${Employee.age}','${Employee.mobile_number}','${Employee.email}','${Employee.address}','${Employee.work_status}','${now}','${now}')
            RETURNING *`);
            return res.status(201).send({statusCode:201, Employee:newEmployee.rows[0]});
        } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

const loginEmployee = async (req, res) => {
    const employee = req.body;
    try {
      const existEmployee = await db.query(
        `SELECT * FROM employees WHERE user_name =  $1;`,
        [employee.user_name]
      );
      if (existEmployee.rowCount == 0)
        return res.status(404).send({ statusCode: 404, message: exception.invalid });
  
      const hashPassword = existEmployee.rows[0].password;
      const decryptedPassword = await decoder(hashPassword);
      if (decryptedPassword != employee.password)
        return res.status(400).send({ statusCode: 400, message: exception.invalid });
        // existEmployee.rows[0].password = decryptedPassword;
        const token = jwt.sign({ id: existEmployee.rows[0].id},jwt_private_key);
      return res.send({
        data: existEmployee.rows[0],
        token: token
      });    
      
    } catch (err) {
      res.status(500).send({ statusCode: 500, error: err });
    }
  };

const getAllEmployees = async (req,res) => {
    try {
        const getEmployee = await db.query(
            `SELECT * FROM employees ORDER BY id`
        );
        if (getEmployee.rowCount == 0) {
            return res.status(404).send({ status: 404, message:"No data found"
//en.pincodeNotFoundWithId 
})}
for (var i = 0; i < getEmployee.rowCount; i++){
  getEmployee.rows[i].password = await decoder(getEmployee.rows[i].password);
}
        return res.status(200).send({ statusCode: 200, Employees: getEmployee.rows });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
      }
    };

const getEmployeeById = async (req, res) => {
    try {
        const getEmployee = await db.query(
            `SELECT * FROM employees WHERE id = $1`,
            [req.params.id]
        );
        if (getEmployee.rowCount == 0) {
            return res.status(404).send({ status: 404,message:"There is no employee found with this id",
//en.EmployeeNotFoundWithId 
});
        }
        getEmployee.rows[0].password = await decoder(getEmployee.rows[0].password);

        return res.status(200).send({ statusCode: 200, Employee: getEmployee.rows[0] });
    } catch (err) {
        console.log(err);

        return res.status(500).send(err);
    }
};

const replaceEmployee = async (req, res) => {
    try {
        const Employee = req.body;
        const now = new Date().toISOString();
        const isEmployeeExist = await db.query(
            `SELECT * FROM employees WHERE id = $1`,
            [req.params.id]
        );

        if (isEmployeeExist.rowCount == 0) {
            return res.status(404).send({ status: 404, message:"Employee Not Found With this Id"
//en.EmployeeNotFoundWithId 
});
        }
        const updateQuery = `UPDATE employees SET 
                            employee_name = '${Employee.employee_name}',
                            qualification= '${Employee.qualification}',
                            age = '${Employee.age}',
                            mobile_number='${Employee.mobile_number}',
                            email ='${Employee.email}',
                            address ='${Employee.address}',
                            work_status = '${Employee.work_status}', 
                            updated_at = '${now}'
                            WHERE id = ${req.params.id}  RETURNING *`;

        const updatedData = await db.query(updateQuery);

        return res.status(200).send({ message: " Employee Updated Successfully", status:200, Employee:updatedData.rows[0]});
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

const updateEmployee = async (req, res) => {
  try {
    let Employee = req.body;
    const now = new Date().toISOString();
    const existEmployee = await db.query(
      `SELECT * FROM employees WHERE id = $1`,
      [req.params.id]);

    if (existEmployee.rowCount == 0) {
      return res.status(404).send({ status: 404, message: "Employee not found with this id"
      // en.employeeNotFound 
    });
    }

    const updateName = Employee.employee_name == null ? existEmployee.rows[0].employee_name : Employee.employee_name;
    const updateQualification = Employee.qualification == null ? existEmployee.rows[0].qualification : Employee.qualification;
    const updateAge = Employee.age == null ? existEmployee.rows[0].age : Employee.age;
    const updateMobileNumber = Employee.mobile_number == null ? existEmployee.rows[0].mobile_number : Employee.mobile_number;
    const updateEmail = Employee.email == null ? existEmployee.rows[0].email : Employee.email;
    const updateAddress = Employee.address == null ? existEmployee.rows[0].address : Employee.address;
    const updateWorkStatus = Employee.work_status == null ? existEmployee.rows[0].work_status : Employee.work_status;

    const updateQuery = `UPDATE employees SET 
                         employee_name = '${updateName}',
                         qualification= '${updateQualification}',
                         age = '${updateAge}',
                         mobile_number='${updateMobileNumber}',
                         email ='${updateEmail}',
                         address ='${updateAddress}',
                         work_status = '${updateWorkStatus}', 
                         updated_at = '${now}'
                         WHERE id = ${req.params.id}  RETURNING *`;

    const result = await db.query(updateQuery);
    return res.status(200).send({ message: " Employee Updated Successfully", status:200, Employee:result.rows[0]});
  } catch (err) {
    console.log(err);
    return res.status(500).send({ statusCode: 500, error: err });
  }
};

const deleteEmployee = async (req, res) => {
    try {
        const isEmployeeExist = await db.query(
            `SELECT * FROM employees WHERE id = $1`,
            [req.params.id]
        );

        if (isEmployeeExist.rowCount == 0) {
            return res.status(404).send({ status: 404, message:"Employee Not Found With this Id"
//en.EmployeeNotFoundWithId 
});
        }
        await db.query(`DELETE FROM employees WHERE id = ${req.params.id}`);
        return res.status(204).send({ status: 204, message:"Employee Deleted Successfully"
            // en.customerDeleted 
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

module.exports = {
    createEmployee,
    loginEmployee,
    getAllEmployees,
    getEmployeeById,
    replaceEmployee,
    updateEmployee,
    deleteEmployee,
};
