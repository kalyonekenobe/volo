import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PasswordModuleOptions } from 'src/modules/password/types/password.types';

@Injectable()
export class PasswordService {
  private readonly saltPrefix: string;
  private readonly saltSuffix: string;
  private readonly saltRounds: number;

  constructor(options: PasswordModuleOptions) {
    this.saltPrefix = options.saltPrefix;
    this.saltSuffix = options.saltSuffix;
    this.saltRounds = Number(options.saltRounds || 10);
  }

  public async hash(password: string): Promise<string | never> {
    return bcrypt.hash(`${this.saltPrefix}.${password}.${this.saltSuffix}`, this.saltRounds);
  }

  public async compare(password: string, hash: string): Promise<boolean | never> {
    return bcrypt.compare(`${this.saltPrefix}.${password}.${this.saltSuffix}`, hash);
  }
}
