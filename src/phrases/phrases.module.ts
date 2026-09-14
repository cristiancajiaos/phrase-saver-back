import { Module } from '@nestjs/common';
import { PhrasesService } from './phrases.service';
import { PhrasesController } from './phrases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Phrase } from './entities/phrase.entity';

@Module({
  controllers: [PhrasesController],
  providers: [PhrasesService],
  imports: [TypeOrmModule.forFeature([Phrase])],
  exports: [PhrasesService, TypeOrmModule]
})
export class PhrasesModule {}
