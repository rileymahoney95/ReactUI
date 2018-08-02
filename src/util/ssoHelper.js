export function getSSOInfo(config) {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    const port = window.location.port;
    const uri = hostname.includes('localhost') ? encodeURIComponent(`${protocol}//${hostname}:${port}/callback`) : encodeURIComponent(`${protocol}//${hostname}/callback`);
    const info = {
        authUrl: `${config.SSO_URL}/oauth/authorize`,
        client_id: config.SSO_CLIENT_ID,
        redirect_uri: uri,
        response_type: 'token+id_token',
        logoutUrl: `${config.SSO_URL}/logout.do?client_id=${config.SSO_CLIENT_ID}`,
        tokenKeysUrl: `${config.SSO_URL}/token_keys`
    }
    return info;
}
