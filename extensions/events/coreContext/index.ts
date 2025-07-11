import { getServiceToken } from 'protonode'
import { API, generateEvent } from "protobase";

export const onEvent = (mqtt, context, cb, path?, from?) => {
    context.topicSub(mqtt, 'notifications/event/create/'+(path??'#'), (async (message: string, topic: string) => {
        try {
            if (typeof message == 'string') {
                message = JSON.parse(message)
            }
        } catch (e) {}
        try {
            if (message) {
                if (from && message['from'] != from) {
                    return
                }
            }
            cb(message)
        } catch (e) {
            console.error('Error parsing message from mqtt: ', e)
        }
    }))
}

export const emitEvent = (path, from, user, payload, ephemeral = false) => {
    return generateEvent({
        path,
        from,
        user,
        payload,
        ephemeral
    }, getServiceToken())
}

export const getLastEvent = async (eventFilter?: { path?: string, from?: string, user?: string }) => {
    const token = getServiceToken()

    const userUrl = eventFilter.user ? `&filter[user]=${eventFilter.user}` : ""
    const pathUrl = eventFilter.path ? `&filter[path]=${eventFilter.path}` : ""
    const from = eventFilter.from ? `&filter[from]=${eventFilter.from}` : ""
    //x=1 is a dummy param to allow the use of the & operator in the url
    const urlLastEvent = `/api/core/v1/events?x=1&${from}${userUrl}${pathUrl}&itemsPerPage=1&token=${token}&orderBy=created&orderDirection=desc`

    let result = await API.get(urlLastEvent)

    if (result.isError) {
        console.error(result.error)
        return
    }

    const event = result.data?.items[0]

    if (!event) return
    return event
}

export default {
    onEvent,
    emitEvent,
    getLastEvent
}