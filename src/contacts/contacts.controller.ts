import { Controller, Get } from '@nestjs/common';
import { Contact } from './contact.entity';
import { ContactsService, RemoveContactData } from './contacts.service';
import { Post,Put, Delete, Body, Param } from  '@nestjs/common';

@Controller('contacts')
export class ContactsController {
    constructor(private contactsService: ContactsService){}

    @Get()
    index(): Promise<Contact[]> {
      return this.contactsService.findAll();
    }

    // @Get('get/:id')
    // async findOne(@Param('id') id) {
    //    return await this.contactsService.findOne(id);
    // }

    // @Post('create')
    // async create(@Body() contactData: Contact): Promise<any> {
    //   return this.contactsService.create(contactData);
    // }  

    // @Put('update/:id')
    // async update(@Param('id') id, @Body() contactData: Contact): Promise<any> {
    //     contactData.id = Number(id);
    //     console.log('Update #' + contactData.id)
    //     return this.contactsService.update(contactData);
    // }

    // @Delete('delete/:id')
    // async delete(@Param('id') id): Promise<any> {
    //   return this.contactsService.delete(id);
    // }

    // New methods

    @Get('get/:id')
    async findOneByIdOrThrow(@Param('id') id) {
       return await this.contactsService.findOneByIdOrThrow(id);
    }

    @Post('create')
    async createOne(@Body() contactData: Contact): Promise<any> {
      return this.contactsService.createOne(contactData);
    }  


    @Put('update/:id')
    async updateOne(@Param('id') id, @Body() contactData: Contact): Promise<any> {
        contactData.id = Number(id);
        console.log('Update #' + contactData.id)
        return this.contactsService.updateOne(contactData);
    }

    @Delete('delete/:id')
    async removeOne(@Param('id') id): Promise<any> {
      const removeContactData: RemoveContactData = {
        id: id
      };
      return this.contactsService.removeOne(removeContactData);
    }
}