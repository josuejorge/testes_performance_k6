import http from 'k6/http';
import { check } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: [

            'p(90)<400', // 90% das requisições < 400ms
            'p(99)<1000', // 99% das requisições < 1s
            'avg<300', // média geral < 300ms
            'max<2000', // nenhuma requisição pode ultrapassar 2s
        ],
    },
};

export default function () {
    const res = http.get('http://localhost:3000/produtos');
    check(res, { 'status 200': (r) => r.status === 200 });
}
