import fs from 'fs';
import path from 'path';
import { z, Schema, BaseSchema, AutoModel, ProtoModel } from 'protobase';
import { AutoActions, AutoAPI } from 'protonode'
import { ObjectsActions } from './objectsActions';

const reloadObjectAPIs = async (app, context) => {
    // list all objects
    if (!fs.existsSync('../../data/objects')) {
        fs.mkdirSync('../../data/objects', { recursive: true });
    }
    const objects = fs.readdirSync('../../data/objects').filter(file => file.endsWith('.json'));
    objects.forEach(file => {
        const filePath = path.join('../../data/objects', file);
        const objectData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (objectData.features && objectData.features.AutoAPI) {
            const objModel = ProtoModel.getClassFromDefinition(objectData)
            // console.log('-------------------------------', {
            //     modelName: objectData.apiOptions.name,
            //     modelType: objModel,
            //     initialData: objectData.initialData,
            //     prefix: objectData.apiOptions.prefix,
            // })
            const ObjectAPI = AutoAPI({
                modelName: objectData.apiOptions.name,
                modelType: objModel,
                initialData: objectData.initialData,
                prefix: objectData.apiOptions.prefix,
            })
            ObjectAPI(app, context)

            const Actions = AutoActions({
                modelName: objectData.apiOptions.name,
                modelType: objModel
            });
            Actions(app, context);
        }
    });
}

export default (app, context) => {
    reloadObjectAPIs(app, context)
    ObjectsActions(app, context)
    app.get('/api/v1/objects/reload', async (req, res) => {
        reloadObjectAPIs(app, context)
        res.json({ status: 'ok' })
    })
}