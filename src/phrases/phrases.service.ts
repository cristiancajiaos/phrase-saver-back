import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePhraseDto } from './dto/create-phrase.dto';
import { UpdatePhraseDto } from './dto/update-phrase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Phrase } from './entities/phrase.entity';
import { Repository } from 'typeorm';

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
    return `This action returns all phrases`;
  }

  findOne(id: number) {
    return `This action returns a #${id} phrase`;
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
