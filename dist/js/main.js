var app = new Vue({
  el: '#app',
  data: {
    questionNumber: '',
    questionArr: [],
    myAnswer:'',
    history: [],
    levelModel: 'easy',
    level: 3,
    isStart: false
  },
  computed: {
  },
  watch: {
    levelModel(){
      if(this.levelModel === 'normal'){
        this.level = 4
      }
      else if(this.levelModel === 'hard'){
        this.level = 5
      }
      else {
        this.level = 3
      }
      this.questionNumber = Math.random().toString().slice(2, this.level + 2)
    }
  },
  methods: {
    start(){
      this.questionNumber = Math.random().toString().slice(2, this.level + 2)
      this.isStart = true;
    },

    inputValidate(){
      const regNum = /^[0-9]/;
      if(this.myAnswer.length != this.level){
        alert('Please input '+ this.level + 'numbers')
        return false
      }

      if(!regNum.test(this.myAnswer)){
        alert('Please input number')
        return false
      }
      this.compare()
    },

    compare(){
      this.questionArr = this.questionNumber.toString().split('')
      var myAnswerArr = this.myAnswer.toString().split('')
      let A = 0,
          B = 0;

      for(let i = 0; i < this.questionArr.length; i++){
        // 比對有多少A
        if(myAnswerArr[i] === this.questionArr[i]){
          A += 1
        }

        //比對有多少B
        if((this.questionArr[i].indexOf(myAnswerArr[i]) != -1) && (myAnswerArr[i] != this.questionArr[i])){
          B += 1
        }
      }

      this.history.push({'answer': this.myAnswer, 'resultA': A , 'resultB': B})
      this.myAnswer = ''
      if(A === 3){
        alert('Success!!')
        this.refresh()
      }
    },

    clearHistory(){
      this.history = []
    },

    refresh(){
      this.clearHistory()
      this.myAnswer = ''
      this.questionNumber = Math.random().toString().slice(2,this.level + 2);
    }
  }
});