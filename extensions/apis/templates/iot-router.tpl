/*
app is an express object, you can use app.get/app.post to create new endpoints
you can define newendpoints like:

app.get('/api/v1/testapi', (req, res) => {
    //you code goes here
    //reply with res.send(...)
})

the session argument is a session object, with the following shape:
{
    user: { admin: boolean, id: string, type: string },
    token: string,
    loggedIn: boolean
}

use the chat if in doubt
*/

import { getAuth, getServiceToken } from "protonode";
import { API, Protofy, getLogger } from "protobase";
import { Application } from 'express';
import fs from 'fs'
import path from "path";

const root = path.join(process.cwd(), '..', '..')
const logger = getLogger()

Protofy("type", "IOTRouter")

export default Protofy("code", async (app, context) => {
    ///PUT YOUR ROUTER LOGIC HERE
    //context.devices.deviceAction function allows to communicate with devices via mqtt
    //context.devices.deviceSub allows to receive notifications from devices via mqtt
    //app is a normal expressjs object
    //context.mqtt is a mqttclient connection

    logger.info("IOT Router {{name}} started")
    app.get("/api/v1/action", async (req, res) => {
        await context.devices.deviceAction("", "", "");
        res.send("Action Done");
    });
})
