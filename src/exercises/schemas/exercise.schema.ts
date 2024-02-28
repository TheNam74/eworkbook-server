import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

/* EDIT FOR NEW TOE */
// !IMPORTANT: value MUST be PascalCase, else exercise can not find its content
enum ExerciseType {
  MULTIPLE_CHOICE = 'MultipleChoice',
  MATCH = 'Match',
  FILL_BLANK = 'FillBlank',
  WORDSEARCH = 'Wordsearch',
  UNSCRAMBLE = 'Unscramble',
  DRAG_AND_DROP = 'DragAndDrop',
  PIC_DRAG_AND_DROP = 'PicDragAndDrop',
  SORT = 'Sort',
  MAKE_SENTENCE = 'MakeSentence',
  CROSSWORD = 'Crossword',
  LINE_WORD_SEARCH="LineWordSearch",
  LISTENING = 'Listening',
}
export type ExerciseDocument = Exercise & Document;
@Schema()
export class Exercise {
  @Prop({
    type: String,
    required: true,
    enum: ExerciseType,
  })
  exerciseType: string;

  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Material' })
  parentMaterial: string;

  @Prop({ type: Date, default: Date.now() })
  dateAdded: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'exerciseType',
  })
  content: string;

  @Prop({
    type: String,
  })
  exerciseAudio: string;
}
export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
