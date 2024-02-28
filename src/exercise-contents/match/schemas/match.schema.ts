import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MatchDocument = Match & Document;

class MatchDetail {
  totalCol: number;
  data: [
    {
      colKey: number;
      colData: {
        id: string;
        element: string;
      }[];
    },
  ];
}

@Schema()
export class Match {
  @Prop({ type: MatchDetail, require: true })
  detail: {
    totalCol: number;
    data: [
      {
        colKey: number;
        colData: {
          id: string;
          element: string;
        }[];
      },
    ];
  };

  @Prop({ required: true })
  correctAnswer: {
    first: string;
    second: string;
  }[];
}

export const MatchSchema = SchemaFactory.createForClass(Match);
