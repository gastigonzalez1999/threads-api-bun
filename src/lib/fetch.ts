import { ENDPOINTS_DOCUMENT_ID, GRAPHQL_ENDPOINT, THREADS_APP_ID } from './consts';
import { IS_DEBUG } from './env';

const fetchBase = ({ documentId, variables }) => {
    return fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'user-agent': 'Threads API Gasti',
            'x-ig-app-id': THREADS_APP_ID,
        },
        body: `variables=${JSON.stringify(variables)}&doc_id=${documentId}`
    })
    .then(res => res.text());
};

export const fecthUserIdByName = ({ userName }) => {
    if (IS_DEBUG) console.info(`https://www.threads.net/@${userName}`);

    return fetch(`https://www.threads.net/@${userName}`)
    .then(res => res.text())
    .then( html => {
        const regex = /"user_id:"(\d+)"/g;
        const [[, userId]] = html.match(regex) ?? [];

        return userId;
    });
};

export const fetchUserProfile = async (
    { userId, userName }: { userId?: string, userName?: string }) => {
    if (userName && !userId) {
        userId = await fecthUserIdByName({ userName });
    }

    const variables = { userID: userId };
    return fetchBase({ variables, documentId: ENDPOINTS_DOCUMENT_ID.USER_PROFILE });
};

export const fetchUserThreads = async (
    { userId, userName }: { userId?: string, userName?: string }) => {
    if (userName && !userId) {
        userId = await fecthUserIdByName({ userName });
    }

    const variables = { userID: userId };
    return fetchBase({variables, documentId: ENDPOINTS_DOCUMENT_ID.USER_THREADS });
};