import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './contact.entity';
import { UpdateResult, DeleteResult } from  'typeorm';

export interface CreateContactData {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly phone: string;
    readonly city: string;
    readonly country: string;
}

export interface RemoveContactData {
    readonly id: number;
  }
  
export interface UpdateContactData {
    readonly id: number;
    readonly firstName?: string;
    readonly lastName?: string;
    readonly email?: string;
    readonly phone?: string;
    readonly city?: string;
    readonly country?: string;  
}

@Injectable()
export class ContactsService {
    constructor(
        @InjectRepository(Contact)
        private contactRepository: Repository<Contact>,
    ) { }

    async findAll(): Promise<Contact[]> {
        return await this.contactRepository.find();
    }

    // async findOne(id: number): Promise<Contact> {
    //     return await this.contactRepository.findOne({where: {id: id}});
    // }

    // async create(contact: Contact): Promise<Contact> {
    //     return await this.contactRepository.save(contact);
    // }

    // async update(contact: Contact): Promise<UpdateResult> {
    //     return await this.contactRepository.update(contact.id, contact);
    // }

    // async delete(id): Promise<DeleteResult> {
    //     return await this.contactRepository.delete(id);
    // }

    // New methods

    async findOneByIdOrThrow(id: number): Promise<Contact> {
        const contact = await this.contactRepository.findOne({id});
        if (!contact) {
          throw new NotFoundException('No contact found.');
        }
        return contact;
    }

    async createOne(createContactData: CreateContactData): Promise<Contact> {
        const { firstName, lastName, email, phone, city, country } = createContactData;
    
        if (!email) {
            throw new BadRequestException('Email is required.');
          }

        const contact = this.contactRepository.create({
            firstName,
            lastName,
            email,
            phone,
            city,
            country
        });
    
        const createdContact = await this.contactRepository.save(contact);
    
        return createdContact;
    }
    
    // async removeOne(id: number): Promise<DeleteResult> {
    //     return await this.contactRepository.delete(id);
    // }

    async removeOne(removeContactData: RemoveContactData): Promise<void> {
        const { id } = removeContactData;

        const contact = await this.findOneByIdOrThrow(id);
    
        await this.contactRepository.remove([contact]);

        return null;

      }


    async updateOne(updateContactData: UpdateContactData): Promise<Contact> {
        const { id, ...updateData } = updateContactData;

        const existingContact = await this.findOneByIdOrThrow(id);

        const contact = this.contactRepository.create({
            ...existingContact,
            ...updateData,
        });

        const updatedContact = await this.contactRepository.save(contact);

        return updatedContact;
    }
}