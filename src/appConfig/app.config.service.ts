import { AlchemyProvider } from '@ethersproject/providers';
import { getConfig, ImmutableXConfiguration } from '@imtbl/core-sdk';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  private readonly alchemyProvider: AlchemyProvider;
  private readonly coreSdkConfig: ImmutableXConfiguration;

  constructor(private readonly configService: ConfigService) {
    this.alchemyProvider = new AlchemyProvider(this.getNetworkName(), this.getAlchemyApiKey());

    this.coreSdkConfig = getConfig({
      coreContractAddress: this.getCoreContractAddress(),
      registrationContractAddress: this.getRegistrationContractAddress(),
      chainID: this.getChainId(),
      basePath: this.getApiBasePath()
    });
  }

  getAlchemyApiKey(): string {
    const alchemyApiKey = this.configService.get<string>('alchemy.apiKey');
    if (!alchemyApiKey) {
      throw new Error('Alchemy API key not found');
    }
    return alchemyApiKey;
  }

  getNetworkName(): string {
    const networkName = this.configService.get<string>('network.name');
    if (!networkName) {
      throw new Error('Network name not found');
    }
    return networkName;
  }

  getChainId(): number {
    const chainId = this.configService.get<number>('network.chainId');
    if (!chainId) {
      throw new Error('Chain Id not found');
    }
    return chainId;
  }

  getApiBasePath(): string {
    const apiBasePath = this.configService.get<string>('network.apiBasePath');
    if (!apiBasePath) {
      throw new Error('Api base path not found');
    }
    return apiBasePath;
  }

  getCoreContractAddress(): string {
    const coreContractAddress = this.configService.get<string>('network.coreContractAddress');
    if (!coreContractAddress) {
      throw new Error('Core contract address not found');
    }
    return coreContractAddress;
  }

  getRegistrationContractAddress(): string {
    const registrationContractAddress = this.configService.get<string>(
      'network.registrationContractAddress'
    );
    if (!registrationContractAddress) {
      throw new Error('Registration contract address not found');
    }
    return registrationContractAddress;
  }

  getDatabaseHost(): string {
    const databaseHost = this.configService.get<string>('database.host');
    if (!databaseHost) {
      throw new Error('Database host not found');
    }
    return databaseHost;
  }

  getDatabasePort(): number {
    const databasePort = this.configService.get<number>('database.port');
    if (!databasePort) {
      throw new Error('Database port not found');
    }
    return databasePort;
  }

  getDatabaseName(): string {
    const databaseName = this.configService.get<string>('database.name');
    if (!databaseName) {
      throw new Error('Database name not found');
    }
    return databaseName;
  }

  getDatabaseURI(): string {
    return `mongodb://${this.getDatabaseHost()}:${this.getDatabasePort()}/${this.getDatabaseName()}`;
  }

  getRedisHost(): string {
    const redisHost = this.configService.get<string>('redis.host');
    if (!redisHost) {
      throw new Error('Redis host not found');
    }
    return redisHost;
  }

  getRedisPort(): number {
    const redisPort = this.configService.get<number>('redis.port');
    if (!redisPort) {
      throw new Error('Redis port not found');
    }
    return redisPort;
  }

  getAlchemyProvider(): AlchemyProvider {
    return this.alchemyProvider;
  }

  getCoreSdkConfig(): ImmutableXConfiguration {
    return this.coreSdkConfig;
  }
}
