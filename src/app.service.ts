/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import * as dotenv from 'dotenv';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

dotenv.config();

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }

  async getAxiosInstance(): Promise<AxiosInstance> {

    const secretKey = process.env.SECKEY;
    const merchantId = process.env.MERCHANT_ID;
    const baseURL = process.env.BASEURL;

    Logger.log(`Merchant ID: ${merchantId}`);

    if(!secretKey){
      throw new BadRequestException();
    }

    const getAxiosInstance: AxiosInstance = axios.create({
      baseURL: baseURL,
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${secretKey}`
      },
      responseType: 'json',
    });

    return getAxiosInstance;
  }

  async getFees(params: { amount: string, currency: string}): Promise<any> {
    const instance = await this.getAxiosInstance();
    instance.defaults.method = 'GET';
    instance.defaults.params = params;

    try{
      const response = await instance.get('v3/transfers/fee?');
      return response.data;

    }catch(error){
      return error.response.data;
    }
    
  }

  async fetchSubAccounts(): Promise<any>{
    const instance = await this.getAxiosInstance();
    instance.defaults.method = 'GET';

    try{
      const response = await instance.get('v3/subaccounts');
      return response.data;

    }catch(error){
      return error.response.data;
    }
  }

  async createBeneficiary(params: any): Promise<any>{
    const instance = await this.getAxiosInstance();
    instance.defaults.method = 'POST';
    try{
      const response = await instance.post('v3/beneficiaries', {...params});
      return response.data;

    }catch(error){
      return error.response.data;
    }
  }


  async fetchBeneficiaries(): Promise<any>{
    const instance = await this.getAxiosInstance();
    instance.defaults.method = 'GET';

    try{
      const response = await instance.get('v3/beneficiaries');
      return response.data;

    }catch(error){
      return error.response.data;
    }
  }

  async fetchBeneficiary(params: { id: string }): Promise<any>{
    const instance = await this.getAxiosInstance();
    instance.defaults.method = 'GET';

    try{
      const response = await instance.get(`v3/beneficiaries/${params.id}`);
      return response.data;

    }catch(error){
      return error.response.data;
    }
  }

  async fetchWalletBalances(): Promise<any>{
    const instance = await this.getAxiosInstance();
    instance.defaults.method = 'GET';

    try{
      const response = await instance.get('v3/balances');
      return response.data;

    }catch(error){
      return error.response.data;
    }
  }

  async fetchCurrencyBalance(params: {currency: string}): Promise<any>{
    const instance = await this.getAxiosInstance();
    instance.defaults.method = 'GET';
    instance.defaults.params = params;

    try{
      const response = await instance.get(`/v3/balances/${params.currency}`);
      return response.data;
    }catch(error){
      return error.response.data;
    }
  }

  async createTransfer(params: any): Promise<any>{
    const instance = await this.getAxiosInstance();
    instance.defaults.method = 'POST';

    try{
      const response = await instance.post('v3/transfers', {...params});
      return response.data;

    }catch(error){
      return error.response.data;
    }
  }

  async createBulkTransfer(params: any): Promise<any>{
    const instance = await this.getAxiosInstance();
    instance.defaults.method = 'POST';
    try{
      const response = await instance.post('v3/bulk-transfers/', {...params});
      return response.data;

    }catch(error){
      return error.response.data;
    }
  }


}
