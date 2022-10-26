import { Test, TestingModule } from '@nestjs/testing';
import { WalletsController } from './wallets.controller';
import { CreateWalletDto } from './dto/createWallet.dto';
import { WalletsService } from './wallets.service';

describe('Wallets Controller', () => {
  let controller: WalletsController;
  let service: WalletsService;
  const createWalletDto: CreateWalletDto = {
    _id: 'wallet #1',
    address: 'walletAddress #1',
    l2Address: 'l2WalletAddress #1',
    publicKey: 'publicKey #1',
    privateKey: 'privateKey #1',
    mnemonic: { phrase: 'phrase #1', path: 'path #1', locale: 'locale #1' },
    balance: '0',
    registered: true
  };

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletsController],
      providers: [
        {
          provide: WalletsService,
          useValue: {
            find: jest.fn().mockResolvedValue([
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
            ]),
            create: jest.fn().mockResolvedValue(createWalletDto)
          }
        }
      ]
    }).compile();

    controller = module.get<WalletsController>(WalletsController);
    service = module.get<WalletsService>(WalletsService);
  });

  describe('create()', () => {
    it('should create a new wallet', async () => {
      const createSpy = jest.spyOn(service, 'create').mockResolvedValueOnce(mockWallet);

      await controller.create(createWalletDto);
      expect(createSpy).toHaveBeenCalledWith(createWalletDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of wallets', async () => {
      expect(controller.findAll()).resolves.toEqual([
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
      ]);
      expect(service.find).toHaveBeenCalled();
    });
  });
});
