import http from 'k6/http';
import { check } from 'k6';
export function setup() {

    const loginPayload = JSON.stringify({
        "email": "fulano@qa.com",
        "password": "teste",
    });

    const loginHeaders = { 'Content-Type': 'application/json' };
    const loginRes = http.post(`${__ENV.BASE_URL}/login`, loginPayload, { headers: loginHeaders });

    check(loginRes, {
        'login bem sucedido': (r) => r.status === 200,
    });

    const authToken = loginRes.json('authorization');
    console.log(`Token de autenticação: ${authToken}`);
    return { authToken, baseUrl: __ENV.BASE_URL };
}

export default function (data) {
    const protectedHeaders = {
        'Content-Type': 'application/json',
        'Authorization': data.authToken,
    };

    const produto = http.post(`${data.baseUrl}/produtos`, JSON.stringify({
        nome: 'Produto Teste1',
        preco: 120,
        descricao: 'Produto criado via teste automatizado',
        quantidade: 10,
    }), { headers: protectedHeaders });

    check(produto, {
        'produto criado com sucesso': (r) => r.status === 201,
    });

    const idProduto = produto.json('_id');
    const resGet = http.get(`${data.baseUrl}/produtos/${idProduto}`, { headers: protectedHeaders });
    check(resGet, {
        'consulta produtos': (r) => r.status === 200,

    });

    const resPut = http.put(`${data.baseUrl}/produtos/${idProduto}`, JSON.stringify({
        nome: 'Produto Teste1',
        preco: 150,
        descricao: 'Produto criado via teste automatizado',
        quantidade: 10,
    }), { headers: protectedHeaders });
    check(resPut, {
        'produto atualizado': (r) => r.status === 200,
    });

    const resDelete = http.del(`${data.baseUrl}/produtos/${idProduto}`, null, { headers: protectedHeaders });
    check(resDelete, {
        'produto deletado': (r) => r.status === 200,

    });
}
