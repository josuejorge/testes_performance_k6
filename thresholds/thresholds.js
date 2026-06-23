import http from 'k6/http';
import { check } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<500'], // 95% das requisições < 500ms
        http_req_failed: ['rate<0.01'], // menos de 1% de falhas
        checks: ['rate>0.98'], // 98% das validações devem passar
    },
};

export default function () {
    const res = http.get('http://localhost:3000/usuarios');
    check(res, { 'status 200': (r) => r.status === 200 });
}
