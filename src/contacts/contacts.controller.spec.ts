import { Test, TestingModule } from '@nestjs/testing';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';

describe('ContactsController', () => {
  let controller: ContactsController;
  let service: ContactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsController],
      providers: [
        {
          provide: ContactsService,
          useValue: {
            findAll: jest.fn(() => 'teste!'),
          }
        }
      ],
    }).compile();

    controller = module.get<ContactsController>(ContactsController);
    service = module.get<ContactsService>(ContactsService);
  });

  describe('get contacts', () => {
    it('should return a list of contacts', () => {
      expect(controller.index()).toBe('teste!');
    });
  });
  
  // TODO: implement tests for all CRUD operations

});
