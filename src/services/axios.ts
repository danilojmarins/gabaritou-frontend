import axios from 'axios';
import { parseCookies } from 'nookies';

export function getApiClient(ctx?: any) {
    const { 'gabaritou.token': token } = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'http://localhost:5000'
    });

    if (token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }

    return api;
}

export function getLocalApi(ctx?: any) {
    const { 'gabaritou.token': token } = parseCookies(ctx);

    const localApi = axios.create({
        baseURL: 'http://localhost:3000'
    });

    if (token) {
        localApi.defaults.headers['Authorization'] = `Bearer ${token}`;
    }

    return localApi;
}