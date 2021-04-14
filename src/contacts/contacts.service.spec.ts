import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ContactsService, CreateContactData, UpdateContactData, RemoveContactData } from './contacts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact, ContactRepositoryFake } from './contact.entity';
import { datatype, name, internet, phone as fphone, address } from 'faker';


describe('ContactsService', () => {
  let service: ContactsService;
  let repository: Repository<Contact>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactsService,
        {
          provide: getRepositoryToken(Contact),
          useClass: ContactRepositoryFake,
        }
      ],
    }).compile();

    service = module.get(ContactsService);
    repository = module.get(getRepositoryToken(Contact));
  });

  describe('Listig contacts', () => {
    it('should list all contacts', async () => {
      expect.assertions(1);
      const newContact = Contact.of({
        id: datatype.number(),
        firstName: name.firstName(),
        lastName: name.lastName(),
        email: internet.email(),
        phone: fphone.phoneNumber(),
        city: address.city(),
        country: address.country()
      });

      jest
      .spyOn(service, 'findAll')
      .mockResolvedValue([newContact]);

      const result = await service.findAll();
      expect(result).toEqual([newContact]);
    });
    it('should find a contact', async () => {
      expect.assertions(1);
      const newContact = Contact.of({
        id: datatype.number(),
        firstName: name.firstName(),
        lastName: name.lastName(),
        email: internet.email(),
        phone: fphone.phoneNumber(),
        city: address.city(),
        country: address.country()
      });

      jest
      .spyOn(service, 'findOneByIdOrThrow')
      .mockResolvedValue(newContact);

      const result = await service.findOneByIdOrThrow(newContact.id);
      expect(result).toEqual(newContact);
    });
  });

  describe('creating a contact', () => {
    it('throws an error when no email is provided', async () => {
      expect.assertions(2);
  
      try {
        await service.createOne({
          firstName: name.firstName(), 
          lastName: name.lastName(), 
          email: '', 
          phone: fphone.phoneNumber(), 
          city: address.city(), 
          country: address.country()
        });
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.message).toBe('Email is required.');
      }
    });

    it('calls the repository with correct paramaters', async () => {
      expect.assertions(3);

      const id = datatype.number();
      const firstName = name.firstName();
      const lastName = name.lastName();
      const email = internet.email();
      const phone = fphone.phoneNumber();
      const city = address.city();
      const country = address.country();

      const createContactData: CreateContactData = {
        firstName, 
        lastName, 
        email, 
        phone, 
        city, 
        country
      };
  
      const createdContactEntity = Contact.of(createContactData);
  
      const savedContact = Contact.of({
        id,
        firstName, 
        lastName, 
        email, 
        phone, 
        city, 
        country
      });
  
      const contactRepositorySaveSpy = jest
        .spyOn(repository, 'save')
        .mockResolvedValue(savedContact);
  
      const contactRepositoryCreateSpy = jest
        .spyOn(repository, 'create')
        .mockReturnValue(createdContactEntity);
  
      const result = await service.createOne(createContactData);
  
      expect(contactRepositoryCreateSpy).toBeCalledWith(createContactData);
      expect(contactRepositorySaveSpy).toBeCalledWith(createdContactEntity);
      expect(result).toEqual(savedContact);
    });
  });

  describe('updating a contact', () => {
    it('calls the repository with correct paramaters', async () => {
      expect.assertions(4);

      const contactId = datatype.number();
      const firstName = name.firstName();

      const updateContactData: UpdateContactData = {
        id: contactId,
        firstName
      };

      const existingContact = Contact.of({
        id: contactId,
        firstName: name.firstName(),
        lastName: name.lastName(),
        email: internet.email(),
        phone: fphone.phoneNumber(),
        city: address.city(),
        country: address.country()
      });

      const newContactData = Contact.of({
        ...existingContact,
        firstName,
      });

      const savedContact = Contact.of({
        ...newContactData,
      });

      const serviceFindOneByIdOrThrowSpy = jest
        .spyOn(service, 'findOneByIdOrThrow')
        .mockResolvedValue(existingContact);

      const contactRepositoryCreateSpy = jest
        .spyOn(repository, 'create')
        .mockReturnValue(newContactData);

      const contactRepositorySaveSpy = jest
        .spyOn(repository, 'save')
        .mockResolvedValue(savedContact);

      const result = await service.updateOne(updateContactData);

      expect(serviceFindOneByIdOrThrowSpy).toHaveBeenCalledWith(
        updateContactData.id,
      );
      expect(contactRepositoryCreateSpy).toHaveBeenCalledWith({
        ...existingContact,
        firstName,
      });
      expect(contactRepositorySaveSpy).toHaveBeenCalledWith(newContactData);
      expect(result).toEqual(savedContact);
    });
  });

  describe('removing a contact', () => {
    it('calls the repository with correct paramaters', async () => {
      const contactId = datatype.number();

      const removeContactData: RemoveContactData = {
        id: contactId,
      };

      const firstName = name.firstName();
      const lastName = name.lastName();
      const email = internet.email();
      const phone = fphone.phoneNumber();
      const city = address.city();
      const country = address.country();

      const existingContact = Contact.of({
        id: contactId,
        firstName,
        lastName,
        email,
        phone,
        city,
        country
      });

      const contactServiceFindOneByIdOrThrowSpy = jest
        .spyOn(service, 'findOneByIdOrThrow')
        .mockResolvedValue(existingContact);

      const contactRepositoryRemoveSpy = jest
        .spyOn(repository, 'remove')
        .mockResolvedValue(null);

      const result = await service.removeOne(removeContactData);

      expect(contactServiceFindOneByIdOrThrowSpy).toHaveBeenCalledWith(
        removeContactData.id,
      );

      expect(contactRepositoryRemoveSpy).toHaveBeenCalledWith([
        existingContact,
      ]);

      expect(result).toBe(null);
    });
  });
});

