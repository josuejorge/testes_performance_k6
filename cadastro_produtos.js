import { fazer_Login } from "./utils/auth.js";
import http from 'k6/http';
import { check } from 'k6';

const produtos = JSON.parse(open('./stores/produtos.json'));
export const options = {
   vus: 1,
   iterations: produtos.length
};

export function setup() {
   const baseUrl = __ENV.BASE_URL || 'http://localhost:3000';
   const authToken = fazer_Login(baseUrl);
   return { authToken, baseUrl };
}

export default function (data) {
   const produto = produtos[__ITER]; // pega cada produto do JSON
   const protectedHeaders = {
      'Content-Type': 'application/json',
      'Authorization': data.authToken,
   };

   console.log(`Criando produto: ${JSON.stringify(produto)}`);
   const res = http.post(`${data.baseUrl}/produtos`, JSON.stringify(produto), { headers: protectedHeaders });

   console.log(`Resposta: ${res.status} - ${res.body}`);

   check(res, {
      'produto criado com sucesso': (r) => r.status === 201,
   });
}
