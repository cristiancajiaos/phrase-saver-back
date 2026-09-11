import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePhraseDto } from './dto/create-phrase.dto';
import { UpdatePhraseDto } from './dto/update-phrase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Phrase } from './entities/phrase.entity';
import { Repository } from 'typeorm';
import { validate as validateUUID } from 'uuid';

@Injectable()
export class PhrasesService {

  constructor(
    @InjectRepository(Phrase)
    private readonly phraseRepository: Repository<Phrase>
  ) {}
  async create(createPhraseDto: CreatePhraseDto) {
    try {
      const phrase = await this.phraseRepository.create(createPhraseDto);
      const phraseDB = this.phraseRepository.save(phrase);
      return phraseDB;
    } catch (error) {
      this.handleDBRequests(error);
    }
    return 'This action adds a new phrase';
  }

  findAll() {
    return this.phraseRepository.find();
  }

  async findOne(id: string) {
    if (validateUUID(id)) {
      const phrase = await this.phraseRepository.findOneBy({id: id});

      if (!phrase) {
        throw new NotFoundException(`Phrase with ID ${id} not found`);
      }

      return phrase;
    } else {
      throw new BadRequestException(`ID given, ${id}, is not a valid ID`);
    }
  }

  async update(id: string, updatePhraseDto: UpdatePhraseDto) {
    try {
      const phrase = await this.phraseRepository.preload({
        id: id,
        ...updatePhraseDto
      });

      if (!phrase) {
        throw new NotFoundException(`Phrase with ID ${id} not found`)
      }
      
      await this.phraseRepository.save(phrase);
      return phrase;
    } catch (error) {
      this.handleDBRequests(error);
    }
  }

  async remove(id: string) {
    const phrase = await this.findOne(id);
    await this.phraseRepository.delete(phrase.id);
    return {
      message: 'Phrase deleted'
    }
  }

  handleDBRequests(error) {
    if (error.code == '23505') {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException(error.detail);
  }
}
