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

  update(id: number, updatePhraseDto: UpdatePhraseDto) {
    return `This action updates a #${id} phrase`;
  }

  remove(id: number) {
    return `This action removes a #${id} phrase`;
  }

  handleDBRequests(error) {
    if (error.code == '23505') {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException(error.detail);
  }
}
