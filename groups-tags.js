import http from 'k6/http';
import { group } from 'k6';

export const options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        //colocar validações, podendo exibir o que está lento ou nao
        'http_req_duration{modulo:catalogo}': ['p(95) < 9'],
        'http_req_duration{modulo:listar}': ['p(95) < 9'],
        'http_req_duration{modulo:detalhar}': ['p(95) < 9'],
        'http_req_duration{modulo:admin}': ['p(95) < 9'],
    },
};

export default function () {
    group('01 - Listar produtos', () => {
        http.get('http://localhost:3000/produtos', {
            tags: {
                endpoint: 'produtos',
                acao: 'listar',
                modulo: 'catalogo'
            }
        });
    });
    group('02 - Detalhar produto', () => {
        http.get('http://localhost:3000/produtos/BeeJh5lz3k6kSIzA', {
            tags: {
                endpoint: 'produtos',
                acao: 'detalhar',
                modulo: 'catalogo'
            }
        });
    });
    group('03 - Listar usuários', () => {
        http.get('http://localhost:3000/usuarios', {
            tags: {
                endpoint: 'usuarios',
                acao: 'listar',
                modulo: 'admin'
            }
        });
    });
}
