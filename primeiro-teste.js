import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    vus: 5, //numero de usuarios virtuais
    duration: '10s', //duracao do teste
};

export function setup() {
    console.log('Iniciando Teste')
    return { baseUrl: 'http://localhost:3000' }
}

export default function (data) {
    const res = http.get(`${data.baseUrl}/produtos`);

    console.log(`Status code: ${res.status}`);
    console.log(`Trecho da resposta: ${res.body.substring(0, 100)}`);

    check(res, {
        'Status = 200': (r) => r.status === 200,
        'resposta contem produtos': (r) => r.body.includes('produtos'),
    });
};

export function teardown() {
    console.log('Finalizando Teste')
}