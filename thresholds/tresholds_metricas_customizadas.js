import { Trend, Rate } from 'k6/metrics';
import http from 'k6/http';
import { check } from 'k6';

const tempoRequisicao = new Trend('tempo_requisicao');
const taxaSucesso = new Rate('taxa_sucesso');

export const options = {
    thresholds: {
        'tempo_requisicao': ['p(95)<300'], // 95% dos tempos < 300ms
        'taxa_sucesso': ['rate>0.99'], // 99% de sucesso esperado
    },
};

export default function () {
    const res = http.get('http://localhost:3000/usuarios');
    tempoRequisicao.add(res.timings.duration);
    const ok = check(res, { 'status 200': (r) => r.status === 200 });
    taxaSucesso.add(ok);
}
