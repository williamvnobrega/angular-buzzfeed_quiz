import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  title:string = ""

  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string = ""

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = false

  constructor() { }

  ngOnInit(): void {
    if(quizz_questions)
    this.finished = false
    this.title = quizz_questions.title

    this.questions = quizz_questions.questions
    this.questionSelected = this.questions[this.questionIndex]

    this.questionIndex= 0
    this.questionMaxIndex = this.questions.length
  }
  playerChoice(value:string){
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex += 1

    if(this.questionMaxIndex>this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAnwser: string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quizz_questions.results[finalAnwser as keyof typeof quizz_questions.results]
    }
  }

  async checkResult(answers:string[]){
    const result = answers.reduce((prev, current,i,arr)=>{
      if((arr.filter(item=> item=== prev).length) >
      (arr.filter(item=> item=== current).length) 
      ){
        return prev
      }else{
        return current
      }
    })
    return result
  }
}
