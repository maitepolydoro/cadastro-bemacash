import { Component, ViewChild, OnInit, ɵConsole } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThfNotificationService, ThfSelectOption, ThfRadioGroupOption } from '@totvs/thf-ui';
//import { Subscription } from 'rxjs';
import { CepEndereco } from './model/CepEndereco';
import { Conta } from './model/Conta';
import { CepService } from './services/cep.service';
import { jsonEstadoCidades } from './model/jsonEstadoCidades';
import { jsonAPIBemacash } from './model/jsonAPI';
import { DocumentHelper } from './helper/document.helper';
import { documento } from './model/documento';
import { SolucaoComercial } from './model/solucao';
import { validateBr } from './helper/validarBR';
import { BemacashApi } from './services/Bemacash.service';
import { stringify } from '@angular/core/src/util';
import { string } from 'prop-types';
//import { SintegraDados } from './model/sintegra';


@Component({
  styleUrls: ['./app.component.css'],
  selector: 'app-root',
  templateUrl: './app.component.html',

})


export class AppComponent implements OnInit {
  @ViewChild('formNewUser', {}) formNewUser: FormControl;

  //Model
  CepEndereco = new CepEndereco();
  conta = new Conta();
  documento = new documento()
  jsonAPIBemacash = new jsonAPIBemacash();
  jsonEstadoCidades = new jsonEstadoCidades();
  SolucaoComercial = new SolucaoComercial();


  //Loja
  cnae:string;
  complemento: string;
  document: string; 
  documentLabel = 'CPF';
  documentType = '';
  iestadual: string;
  imunicipal: '';
  nfantasia: string;
  numero: string;
  protheusId: string;
  resellerCnpj: string;
  rsocial: string;
  solucaoTipo:string;
  solvType: string;
  telLoja: string;
  validarIE:any
  json = []
  



  //Validação
  validDocIE: boolean;
  validDoc: boolean;
  iedisabled: boolean;
  docdisabled: boolean;
  rddisabled: boolean;
  validDocRes:boolean;
  
  //Array
  solucao: Array<ThfSelectOption> = [];
  cityOptions: Array<ThfSelectOption> = [];
  segmentoOptions: Array<ThfSelectOption> = [
    { label: 'Food Truck', value: '1' },
    { label: 'Padaria', value: '2' },
    { label: 'Mini Mercado', value: '3' },
    { label: 'Restaurante', value: '4' }
  ];
  readonly categoriaOptions: Array<ThfSelectOption> = [
    { label: 'EPP - Simples Nacional', value: '1' },
    { label: 'Lucro Real', value: '2' },
    { label: 'Lucro Presumido', value: '3' },
    { label: 'Regime Outro', value: '4' }
  ];
  readonly perfilEfdOptions: Array<ThfSelectOption> = [
    { label: 'A', value: '1' },
    { label: 'B', value: '2' },
    { label: 'C', value: '3' }
  ];
  options: Array<ThfRadioGroupOption> = [
    { label: 'CPF', value: 'CPF' },
    { label: 'CNPJ', value: 'CNPJ' }
  ];
  solvOptions: Array<ThfRadioGroupOption> = [
    { label: 'Bemacash', value: 'Bemacash' },
    { label: 'Bemaflex', value: 'Bemaflex' }
  ];

  readonly stateOptions: Array<ThfSelectOption> = this.jsonEstadoCidades.estado;

  constructor(
    private thfNotification: ThfNotificationService,
    private cepService: CepService,
    private bemacashApi:BemacashApi
    
  ) { }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.complemento = ""
    this.docdisabled;
    this.rddisabled = true;

  }

  cancel() {
    this.formNewUser.reset();
    this.initialize();
  }
  tratamento(){
    this.CepEndereco.ibge = this.CepEndereco.ibge.substring(0,2)+"-"+this.CepEndereco.ibge.substring(2)
    this.CepEndereco.cep = this.CepEndereco.cep.substring(0,5)+this.CepEndereco.cep.substring(6)
    this.jsonAPIBemacash.document = this.document
  }
  gerajson() {
   if(this.solvType === 'Bemaflex' && this.documentType === 'CPF'){
    this.jsonAPIBemacash.protheus_client_id = this.protheusId;
    this.jsonAPIBemacash.reseller_cnpj = this.resellerCnpj;
    this.jsonAPIBemacash.email = this.conta.email;
    this.jsonAPIBemacash.first_name = this.conta.nomeConta;
    this.jsonAPIBemacash.last_name = this.conta.sobrenomeConta;
    this.jsonAPIBemacash.cnpj = null;
    this.jsonAPIBemacash.cpf = this.conta.cpf;
    this.jsonAPIBemacash.company_name = this.rsocial;
    this.jsonAPIBemacash.trade_name = this.nfantasia;
    this.jsonAPIBemacash.state_registration = this.iestadual;
    this.jsonAPIBemacash.municipality_inscription = this.imunicipal;
    this.jsonAPIBemacash.activity_code = this.cnae;
    this.jsonAPIBemacash.license_type_id = this.solucaoTipo;
    this.jsonAPIBemacash.address_street = this.CepEndereco.endereco;
    this.jsonAPIBemacash.address_number = this.numero;
    this.jsonAPIBemacash.address_comp = this.complemento;
    this.jsonAPIBemacash.address_neighborhood = this.CepEndereco.bairro;
    this.jsonAPIBemacash.address_cep = this.CepEndereco.cep;
    this.jsonAPIBemacash.address_municipality_ibge = this.CepEndereco.ibge;
    this.jsonAPIBemacash.phone = this.telLoja ;
   }
   else if(this.solvType === 'Bemaflex' && this.documentType === 'CNPJ'){
    this.jsonAPIBemacash.protheus_client_id = this.protheusId;
    this.jsonAPIBemacash.reseller_cnpj = this.resellerCnpj;
    this.jsonAPIBemacash.email = this.conta.email;
    this.jsonAPIBemacash.first_name = this.conta.nomeConta;
    this.jsonAPIBemacash.last_name = this.conta.sobrenomeConta;
    this.jsonAPIBemacash.cnpj = this.document;
    this.jsonAPIBemacash.cpf = this.conta.cpf;
    this.jsonAPIBemacash.company_name = this.rsocial;
    this.jsonAPIBemacash.trade_name = this.nfantasia;
    this.jsonAPIBemacash.state_registration = this.iestadual;
    this.jsonAPIBemacash.municipality_inscription = this.imunicipal;
    this.jsonAPIBemacash.activity_code = this.cnae;
    this.jsonAPIBemacash.license_type_id = this.solucaoTipo;
    this.jsonAPIBemacash.address_street = this.CepEndereco.endereco;
    this.jsonAPIBemacash.address_number = this.numero;
    this.jsonAPIBemacash.address_comp = this.complemento;
    this.jsonAPIBemacash.address_neighborhood = this.CepEndereco.bairro;
    this.jsonAPIBemacash.address_cep = this.CepEndereco.cep;
    this.jsonAPIBemacash.address_municipality_ibge = this.CepEndereco.ibge;
    this.jsonAPIBemacash.phone = this.telLoja ;
    
   }
   else if(this.solvType === 'Bemacash'){
    this.jsonAPIBemacash.protheus_client_id = this.protheusId;
    this.jsonAPIBemacash.reseller_cnpj = this.resellerCnpj;
    this.jsonAPIBemacash.email = this.conta.email;
    this.jsonAPIBemacash.first_name = this.conta.nomeConta;
    this.jsonAPIBemacash.last_name = this.conta.sobrenomeConta;
    this.jsonAPIBemacash.cnpj = this.document;
    this.jsonAPIBemacash.cpf = this.conta.cpf;
    this.jsonAPIBemacash.company_name = this.rsocial;
    this.jsonAPIBemacash.trade_name = this.nfantasia;
    this.jsonAPIBemacash.state_registration = this.iestadual;
    this.jsonAPIBemacash.municipality_inscription = this.imunicipal;
    this.jsonAPIBemacash.activity_code = this.cnae;
    this.jsonAPIBemacash.license_type_id = this.solucaoTipo;
    this.jsonAPIBemacash.address_street = this.CepEndereco.endereco;
    this.jsonAPIBemacash.address_number = this.numero;
    this.jsonAPIBemacash.address_comp = this.complemento;
    this.jsonAPIBemacash.address_neighborhood = this.CepEndereco.bairro;
    this.jsonAPIBemacash.address_cep = this.CepEndereco.cep;
    this.jsonAPIBemacash.address_municipality_ibge = this.CepEndereco.ibge;
    this.jsonAPIBemacash.phone = this.telLoja ;
   }
    
  }

  confirm() {
    if (this.validDoc === true && this.validDocRes === true) {
      this.validarInsEstadual()
     // this.validarInsEstadual()
      //console.log(this.validDocIE)
      if(this.validDocIE === true){
        if (this.formNewUser.valid) {
          this.gerajson()
          //console.log(this.jsonAPIBemacash)
          this.bemacashApi.envioAPI(this.jsonAPIBemacash)
          this.thfNotification.success(`Novo usuário registrado`);
          this.cancel();
        }
        else {
          this.thfNotification.error(`Preencha os campos requeridos`);
        }
      }
      else{
        this.thfNotification.error("IE inválido");
      }

    }
    else {
      this.thfNotification.error(`Corrija os campos inválidos (CPF, CNPJ, CNPJ Revenda)`);
    }
  }

  //ENDEREÇO - CEP/IE/ESTADO

  buscarCep() {
    this.cepService.buscar(this.CepEndereco.cep).then((result) => {
      this.CepEndereco = result;
      if (this.CepEndereco.estado) {
        this.changecity(this.CepEndereco.municipio);
        this.tipoSolucao();
      }
      this.tratamento()
       
      //console.log(this.validDocIE)
    })
    
  }

  option(stateCode) {
    let mun: string;
    let uf: string;
    mun = this.CepEndereco.municipio
    uf = this.CepEndereco.estado
    if (stateCode === uf) {
      this.cityOptions = [{ label: mun, value: mun }];
    }
    return this.cityOptions
  }

  validarInsEstadual() {
    const Validiestadual = validateBr.inscricaoestadual(this.iestadual,this.CepEndereco.estado); 
    this.validDocIE = true
    if (!this.iestadual || this.iestadual === 'isento' ||this.iestadual === 'ISENTO' && (this.documentType === 'CNPJ')) {
      this.iestadual = "ISENTO" 
    }
    else if(this.documentType === 'CNPJ' && this.iestadual !== ""){     
      if (!Validiestadual){
        this.validDocIE = false
      }
    }
    else{
      this.iestadual = ""
    }
    return this.validDocIE
  }

  changecity(cityOptions) {
    return this.cityOptions
  }


  // DOCUMENTO CNPJ/CPF

  changeSolv(documentType) {
    this.rddisabled = true;
    if (this.solvType === 'Bemacash') {
      this.documentType = 'CNPJ';
      this.changeType(documentType)
    }
    else {
      this.rddisabled = false;
    }
    return this.rddisabled
  }

  validcpf() {
    this.validDoc = true;
    if (!DocumentHelper.cpf(this.conta.cpf)) {
      this.validDoc = false;
    }
    this.changeType(this.documentType)
    return this.validDoc
  }
  validcnpj() {
    let cnpj: string;
    this.validDoc = true;
    if (this.documentType === 'CNPJ') {
      this.document
      if (!DocumentHelper.cnpj(this.document)) {
        this.validDoc = false;
      }
    }
    return this.validDoc
  }
  validreseller() {
    this.validDocRes = true;
    if (!DocumentHelper.cnpj(this.resellerCnpj)) {
      this.validDocRes = false;
    }
    return this.validDocRes
  }
/*
  validarInsEstadual() {
    this.validDocIE = true;
    const Validiestadual = validateBr.inscricaoestadual(this.iestadual,this.CepEndereco.estado);
   // console.log(this.iestadual,this.CepEndereco.estado);
    if (!Validiestadual ){
      this.validDocIE = false
    }
    return this.validDocIE
  }*/
  /*
    formDocumentUser() {
      if (this.formNewUser.valid) {
        if (!DocumentHelper.cpf(this.conta.cpf)) {
          this.validDoc = false;
        }
        else {
          if (this.document.length > 11) {
            if (!DocumentHelper.cnpj(this.document)) {
              this.validDoc = false;
            }
          }
          else {
            this.formNewUser.invalid ? !DocumentHelper.cpf(this.document) : this.formNewUser.valid
          }
        }
      }
      this.conta.cpf
      this.document;
    }
  */
  changeType(documentType) {
    this.iedisabled = true;
    this.docdisabled = true;

    if (documentType === 'CPF') {
      if (this.solvType === 'Bemaflex') {
        this.document = this.conta.cpf;
        this.documentLabel = 'CPF'
        this.documento.mask = '999.999.999-99';
        this.documento.minLength = 10;
        this.documento.pattern = '[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}'
        this.documento.errorPattern = 'CPF inválido'
        this.iedisabled
        this.docdisabled
      }
    } else {
      this.document
      this.documentLabel = 'CNPJ';
      this.documento.mask = '99.999.999/9999-99';
      this.documento.pattern = '[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}'
      this.documento.errorPattern = 'CNPJ inválido'
      this.docdisabled = false
      this.iedisabled = false
    }

  }

  tipoSolucao(){
    if (this.CepEndereco.estado === 'SP' && this.solvType === 'Bemacash'){
      //console.log(this.SolucaoComercial.solucaoSP)
      this.solucao = this.SolucaoComercial.solucaoSP
    }
    else if (this.CepEndereco.estado !== 'SP' && this.solvType === 'Bemacash'){
      this.solucao = this.SolucaoComercial.solucao
      //console.log(this.SolucaoComercial.solucao)
    }
    if(this.solvType === 'Bemaflex'){
      //console.log(this.SolucaoComercial.solucaoBasic)
      this.solucao = this.SolucaoComercial.solucaoBasic
    }

  }

  ImportCSV(event){
    console.log(event)
  }
}