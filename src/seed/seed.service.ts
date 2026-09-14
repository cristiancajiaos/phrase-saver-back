import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Phrase } from 'src/phrases/entities/phrase.entity';
import { PhrasesService } from 'src/phrases/phrases.service';
import { Repository } from 'typeorm';
import { phraseSeedData } from './data/seed-data';

@Injectable()
export class SeedService {

  constructor(
    @InjectRepository(Phrase)
    private readonly phraseRepository: Repository<Phrase>,
    private readonly phraseService: PhrasesService
  ) {}

  async executeSeed() {
    await this.phraseRepository.deleteAll();
    const phrases = phraseSeedData;
    phrases.forEach(phrase => {
      this.phraseService.create(phrase);
    });
    return {
      message: 'Seed executed'
    }
  }
}
