import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

class SortDetailDto {
  @ApiProperty({ type: String, description: 'mainContent' })
  @IsString()
  mainContent: string;

  @ApiProperty({
    type: [
      {
        questionIndex: Number,
        questionElements: [
          {
            elementImg: String,
            elementId: Number,
          },
        ],
      },
    ],
    description: 'questions',
  })
  @IsArray()
  questions: [
    {
      questionIndex: number;
      questionElements: [
        {
          elementImg: string;
          elementId: number;
        },
      ];
    },
  ];
}

export default class CreateSortDto {
  @Type(() => SortDetailDto)
  detail: SortDetailDto;

  @ApiProperty({
    type: [Number],
    description: 'correctAnswer',
  })
  @IsString()
  correctAnswer: [{ questionIndex: number; key: number[] }];
}
