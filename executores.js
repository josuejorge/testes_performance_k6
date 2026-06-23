import http from 'k6/http';
import { check } from 'k6';

export const options = {
    scenarios: {

        carga_constante1: {
            executor: 'constant-vus',
            vus: 5, // 5 usuários virtuais
            duration: '15s', // durante 15 segundos
        },
        carga_constante2: {
            executor: 'constant-vus',
            vus: 5, // 5 usuários virtuais
            duration: '15s', // durante 15 segundos
        },

        aumento_gradual: {
            executor: 'ramping-vus',

            startVUs: 1, // começa com 1 usuário
            stages: [
                { duration: '10s', target: 5 }, // sobe para 5 VUs em 10s
                { duration: '10s', target: 10 }, // sobe para 10 VUs em 10s
                { duration: '10s', target: 0 }, // reduz até 0 VUs
            ],
        },

        teracoes_compartilhadas: {
            executor: 'shared-iterations',
            vus: 4, // 4 usuários virtuais
            iterations: 12, // 12 iterações no total
        },

        taxa_constante: {
            executor: 'constant-arrival-rate',
            rate: 20, // 20 requisições por segundo
            timeUnit: '1s', // a cada segundo
            duration: '15s', // durante 15 segundos
            preAllocatedVUs: 5, // VUs pré-alocados
        },

        taxa_variavel: {
            executor: 'ramping-arrival-rate',
            startRate: 5, // começa com 5 requisições por segundo
            timeUnit: '1s', // intervalo base de medição
            preAllocatedVUs: 10, // VUs pré-criados
            stages: [
                { duration: '10s', target: 10 }, // sobe até 10 req/s
                { duration: '10s', target: 20 }, // sobe até 20 req/s
                { duration: '10s', target: 0 }, // reduz até parar
            ],
        },

        cenario1: {
            executor: 'constant-vus',
            vus: 5,
            duration: '15s',
            startTime: '0s',
        },
        cenario2: {
            executor: 'shared-iterations',
            vus: 3,
            iterations: 9,
            startTime: '15s',
        },




    },
};

export default function () {
    const res = http.get('http://localhost:3000/produtos');
    check(res, { 'status é 200': (r) => r.status === 200 });
}


