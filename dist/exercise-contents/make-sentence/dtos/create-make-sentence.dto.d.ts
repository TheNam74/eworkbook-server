export default class CreateMakeSentenceDto {
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
                                }
                            ];
                        }
                    ];
                }
            ];
        }
    ];
    correctAnswer: [
        {
            sentenceKey: number;
            answer: [{
                questionKey: string;
                answerKey: number;
            }];
        }
    ];
}
