import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

export default class CreateMakeSentenceDto {
  @ApiProperty({
    type: Array,
    description: 'detail',
  })
  detail: [
    {
      sentences: [
        {
          sentenceKey: number;
          contextImg: string;
          template: string;
          questions: [
            {
              questionKey: string;
              options: [
                {
                  key: number;
                  option: string;
                },
              ];
            },
          ];
        },
      ];
    },
  ];

  @ApiProperty({
    type: Array,
    description: 'correctAnswer',
  })
  @IsArray()
  correctAnswer: [
    {
      sentenceKey: number;
      answer: [{ questionKey: string; answerKey: number }];
    },
  ];
}
