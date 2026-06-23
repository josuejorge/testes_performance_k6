import http from 'k6/http';

export default function () {
    const payload = JSON.stringify({
        nome: 'Produto Teste',
        preco: 120,
        descricao: 'Produto criado via teste automatizado',
        quantidade: 10,
    });

    const headers = { 'Content-Type': 'application/json' };
    const res = http.post('http://localhost:3000/produtos', payload, {
        headers
    });

    console.log(`Status: ${res.status}`);
}
