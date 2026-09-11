import { IsString, MinLength } from "class-validator";

export class CreatePhraseDto {
  @IsString()
  @MinLength(1)
  phrase: string;
}
