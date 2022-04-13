/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import * as path from 'path';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('fees')
  async getFees(@Body() params: any): Promise<any> {
    if (!params) {
      throw new BadRequestException();
    }
    return await this.appService.getFees(params);
  }

  @Post('subaccounts')
  async fetchSubAccounts(): Promise<any> {
    return await this.appService.fetchSubAccounts();
  }

  @Post('beneficiaries/create')
  async createBeneficiary(@Body() params: any): Promise<any> {
    if (!params) {
      throw new BadRequestException();
    }
    return await this.appService.createBeneficiary(params);
  }

  @Post('beneficiaries')
  async fetchBeneficiaries(): Promise<any> {
    return await this.appService.fetchBeneficiaries();
  }

  @Post('beneficiaries')
  async fetchBeneficiary(@Body() params: { id: string }): Promise<any> {
    if (!params) {
      throw new BadRequestException();
    }
    return await this.appService.fetchBeneficiary(params);
  }
  @Post('balances')
  async fetchWalletBalances(): Promise<any> {
    return await this.appService.fetchWalletBalances();
  }

  @Post('currencybalance')
  async fetchCurrencyBalance(
    @Body() params: { currency: string },
  ): Promise<any> {
    if (!params) {
      throw new BadRequestException();
    }
    return await this.appService.fetchCurrencyBalance(params);
  }

  @Post('transfers/create')
  async createTransfer(@Body() params: any): Promise<any> {
    if (!params) {
      throw new BadRequestException();
    }
    params = {
      ...params,
      reference: 'mm-transfer-' + Date.now(),
    };
    return await this.appService.createTransfer(params);
  }

  @Post('bulktransfers/create')
  async createBulkTransfer(): Promise<any> {
    const fileName = 'bulk-transfers.json';

    let FILE_PATH = path.join(path.join(__dirname, '../'));
    FILE_PATH = fs.existsSync(FILE_PATH) ? FILE_PATH : path.resolve('.');
  
    try{
      const fileContent = JSON.parse(fs.readFileSync(`${FILE_PATH}${fileName}`, 'utf8'));

      const bulk_data: any[] = [];
      const data: any[] = fileContent.bulk_data;
      
      for await (const d of data){
        d.reference = 'mm-transfer-' + Date.now();
        bulk_data.push(d);
      }

      const params: any = {
        title: fileContent.title,
        bulk_data
      }

      return await this.appService.createBulkTransfer(params);

    }catch(error){
      console.log(error);
      return error;
    }
  }
}
