import { getAuth } from 'protonode'
import APIContext from "app/bundles/context";
import { API, Protofy, getLogger } from "protobase";
import { Application } from 'express';
import fs from 'fs'
import path from "path";
import { createChatbot } from "@extensions/chatbots/createChatbot";

const root = path.join(process.cwd(), '..', '..')
const logger = getLogger()

Protofy("type", "custom")

export default Protofy("code", async (app:Application, context: typeof APIContext) => {
    createChatbot(app, '{{codeNameLowerCase}}', async (req, res, chatbot) => {
        const {session, token} = getAuth(req)
        chatbot.send("hello")
        chatbot.end()
    })
})