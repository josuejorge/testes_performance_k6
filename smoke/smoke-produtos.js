import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    vus: 5, //numero de usuarios virtuais
    duration: '10s', //duracao do teste
};

export default function () {
    const res = http.get('http://localhost:3000/produtos');
    check(res, {
        'Status = 200': (r) => r.status === 200,
    });
};