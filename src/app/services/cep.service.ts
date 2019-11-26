import { Injectable } from '@angular/core';
import { CepEndereco } from '../model/CepEndereco';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CepService {

  resultado: CepEndereco;
  constructor(private http: HttpClient) { }

  buscar(cep: string) {
    return this.http
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .toPromise()
      .then(data => this.resultado = this.converterRespostaParaCep(data));


  }

  private converterRespostaParaCep(cepNaResposta) {
    let cepEndereco = new CepEndereco();
    cepEndereco.cep = cepNaResposta.cep;
    cepEndereco.endereco = cepNaResposta.logradouro;
    cepEndereco.bairro = cepNaResposta.bairro;
    cepEndereco.municipio = cepNaResposta.localidade;
    cepEndereco.estado = cepNaResposta.uf;
    cepEndereco.ibge = cepNaResposta.ibge;


    return cepEndereco;
  }
}
