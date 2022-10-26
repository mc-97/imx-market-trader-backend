import { Test, TestingModule } from '@nestjs/testing';
import { WalletsService } from './wallets.service';
import { getModelToken } from '@nestjs/mongoose';
import { Wallet } from './schemas/wallet.schema';
import { Model } from 'mongoose';

const mockWallet = {
  _id: 'wallet #1',
  address: 'walletAddress #1',
  l2Address: 'l2WalletAddress #1',
  publicKey: 'publicKey #1',
  privateKey: 'privateKey #1',
  mnemonic: { phrase: 'phrase #1', path: 'path #1', locale: 'locale #1' },
  balance: '0',
  registered: true
};

describe('WalletsService', () => {
  let service: WalletsService;
  let model: Model<Wallet>;

  const walletsArray = [
    {
      _id: 'wallet #1',
      address: 'walletAddress #1',
      l2Address: 'l2WalletAddress #1',
      publicKey: 'publicKey #1',
      privateKey: 'privateKey #1',
      mnemonic: { phrase: 'phrase #1', path: 'path #1', locale: 'locale #1' },
      balance: '0',
      registered: true
    },
    {
      _id: 'wallet #2',
      address: 'walletAddress #2',
      l2Address: 'l2WalletAddress #2',
      publicKey: 'publicKey #2',
      privateKey: 'privateKey #2',
      mnemonic: { phrase: 'phrase #2', path: 'path #2', locale: 'locale #2' },
      balance: '0',
      registered: true
    }
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletsService,
        {
          provide: getModelToken('Wallet'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockWallet),
            constructor: jest.fn().mockResolvedValue(mockWallet),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<WalletsService>(WalletsService);
    model = module.get<Model<Wallet>>(getModelToken('Wallet'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all wallets', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(walletsArray)
    } as any);
    const wallets = await service.find({});
    expect(wallets).toEqual(walletsArray);
  });

  it('should insert a new wallet', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        _id: 'wallet #1',
        address: 'walletAddress #1',
        l2Address: 'l2WalletAddress #1',
        publicKey: 'publicKey #1',
        privateKey: 'privateKey #1',
        mnemonic: { phrase: 'phrase #1', path: 'path #1', locale: 'locale #1' },
        balance: '0',
        registered: true
      })
    );
    const newWallet = await service.create({
      _id: 'wallet #1',
      address: 'walletAddress #1',
      l2Address: 'l2WalletAddress #1',
      publicKey: 'publicKey #1',
      privateKey: 'privateKey #1',
      mnemonic: { phrase: 'phrase #1', path: 'path #1', locale: 'locale #1' },
      balance: '0',
      registered: true
    });
    expect(newWallet).toEqual(mockWallet);
  });
});
