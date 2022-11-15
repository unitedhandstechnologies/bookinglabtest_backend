const db = require("../../config/dbConfig");
const {ORDERSTATUS} = require("../../constants/enums");
const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${day}-${month}-${year}`;

const getAvailableSlots = async (req, res) => {
    try {
        const newOrderReq = req.body;
        const circleVehicles = await db.query(`SELECT vehicle_id FROM circle_vehicle_maps WHERE circle_id = ${req.params.circle_id}`);

        let vehiclesOfMatchedToAllTest = [];
        for(var i = 0; i < circleVehicles.rowCount; i++) {
            let vehicleOfMatchedToSingleTest = [];
            for(var j = 0; j < newOrderReq.test_details.length; j++){
                 let filterVehicle = await db.query(`SELECT * FROM vehicle_test_details WHERE vehicle_id = ${circleVehicles.rows[i].vehicle_id} AND test_details_id = ${newOrderReq.test_details[j]}`);
                 if(filterVehicle.rowCount != 0){
                    vehicleOfMatchedToSingleTest.push(filterVehicle.rows[0].vehicle_id);
                 }
            }
            if(vehicleOfMatchedToSingleTest.length == newOrderReq.test_details.length){
                vehiclesOfMatchedToAllTest.push(vehicleOfMatchedToSingleTest[0]);
            }
            vehicleOfMatchedToSingleTest = [];
        }
        
        if(vehiclesOfMatchedToAllTest.length == 0){
            return res.status(404).send("There is No Vehicle Available to take this Tests");
        }
        let vehicle_id;
        let availableSlotList = [];
            for(var i = 0; i < vehiclesOfMatchedToAllTest.length; i++){
                let unAvailableSlots = [0];                                          
                const checkSlotAvailability = await db.query(`SELECT * FROM orders WHERE circle_id = ${req.params.circle_id} 
                                                              AND vehicle_id = ${vehiclesOfMatchedToAllTest[i]} 
                                                              AND status_id = ${ORDERSTATUS.pending}`);
                if(checkSlotAvailability.rowCount != 0){
                    checkSlotAvailability.rows.forEach(order => {
                          unAvailableSlots.push(order.slot_id);
                    });
                const availableSlots = await db.query(`SELECT * FROM slots WHERE id NOT IN (${unAvailableSlots}) AND date > '${currentDate}'`);
                unAvailableSlots = [];
                if(availableSlotList.length == 0){
                    vehicle_id = checkSlotAvailability.rows[0].vehicle_id;
                    availableSlotList = availableSlots.rowCount == 0 ? [0] : availableSlots.rows;
                }
                if(availableSlots.rowCount >= availableSlotList.length){
                    vehicle_id = checkSlotAvailability.rows[0].vehicle_id;
                    availableSlotList = [];
                    availableSlotList = availableSlots.rows;
                }
                }
                else{
                    vehicle_id = vehiclesOfMatchedToAllTest[i];
                    const availableSlots = await db.query(`SELECT * FROM slots WHERE id NOT IN (${unAvailableSlots}) AND date > '${currentDate}'`);
                    return res.status(200).send({availableSlots:availableSlots.rows, availableVehicleId:vehicle_id});
                }
            }
        return res.status(200).send({availableSlots:availableSlotList, availableVehicleId:vehicle_id });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

const createOrder = async(req,res) => {
    try{
        const now = new Date().toISOString();
        const newOrderReq = req.body;
        const checkSlot = await db.query(`SELECT * FROM orders WHERE circle_id = ${req.params.circle_id} 
                                        AND vehicle_id = ${newOrderReq.vehicle_id} 
                                        AND slot_id = ${newOrderReq.slot_id} AND status_id = ${ORDERSTATUS.pending}`);
        if(checkSlot.rowCount != 0){
            return res.status(400).send("Sorry,You Missed This Slot Just Now,Please Choose Another Available Slots");
        }
        const newOrder = await db.query(`INSERT INTO orders (user_id,circle_id,test_details,slot_id,vehicle_id,status_id,created_at,updated_at)
                                          VALUES(${req.params.user_id},${req.params.circle_id},'{${newOrderReq.test_details}}',${newOrderReq.slot_id},${newOrderReq.vehicle_id},${ORDERSTATUS.pending},'${now}','${now}') RETURNING *`);
        return res.status(201).send(newOrder.rows[0]);
    }catch(err){
        console.log(err);
        return res.status(500).send(err);
    }
}

const getOrders = async(req,res) =>
{
    try{
     const orders = await db.query(`SELECT * FROM orders`);
     return res.status(200).send(orders.rows);
    }catch(err){
        console.log(err);
        return res.status(500).send(err);
    }
}

const checkAvailability = async (req,res) => {
    try{
        const areaCheck = await db.query(`SELECT * FROM pincodes WHERE pincode = '${req.params.pincode}'`);
        if(areaCheck.rowCount == 0) {
            return res.status(404).send("Service Not Available");
        }
        return res.status(200).send(areaCheck.rows[0]);
    }catch(err){
        console.log(err);
        return res.status(500).send(err);
    }
}

module.exports = {getAvailableSlots,createOrder,checkAvailability,getOrders};