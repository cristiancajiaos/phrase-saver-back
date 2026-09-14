import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PhrasesModule } from 'src/phrases/phrases.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [PhrasesModule]
})
export class SeedModule {}
