const db = require("../../config/dbConfig");
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
        const newEmployee = await db.query(
          `INSERT INTO employees (employee_name,qualification,age,mobile_number,email,address,work_status,created_at,updated_at) 
           VALUES ('${Employee.employee_name}','${Employee.qualification}','${Employee.age}','${Employee.mobile_number}','${Employee.email}','${Employee.address}','${Employee.work_status}','${now}','${now}')
            RETURNING *`);
            return res.status(201).send({statusCode:201, Employee:newEmployee.rows[0]});
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

const getAllEmployees = async (req, res) => {
    try {
        const getEmployee = await db.query(
            `SELECT * FROM employees`
        );
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
    getAllEmployees,
    getEmployeeById,
    replaceEmployee,
    updateEmployee,
    deleteEmployee,
};
