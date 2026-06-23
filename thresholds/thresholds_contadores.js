import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 5,
    iterations: 100,
    thresholds: {
        http_reqs: ['count>=100'], // Garante que o teste fez pelo menos 100 requisições
        iterations: ['count>=50'], // Garante que o total de execuções é 50 vezes ou mais
    },
};

export default function () {
    http.get('http://localhost:3000/status');
    sleep(1);
}