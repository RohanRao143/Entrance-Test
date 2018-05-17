const Employees = require('../models/Employees');
const Questions = require('../models/Questions');
const Streams = require('../models/Streams');
const Categories = require('../models/Categories');
const Tests = require('../models/Tests');


//add question controller

exports.addQuestion = (req, res) => {
    Questions.findOne({ question: req.body.question }, (err, question) => {
        if (!question) {
            Questions.count({}, (err, count) => {
                Categories.findOne({ type: req.body.category }, (err, category) => {
                    Employees.findOne({ name: req.body.name }, (err, employee) => {
                        var options = []
                        for (let i = 0; i < req.body.options.length; i++) {
                            options.push({ id: i + 1, order_by: i + 1, value: req.body.options[i].value, correct: req.body.options[i].istrue, type: req.body.options[i].type })
                        }
                        var question = new Questions({
                            id: count + 1,
                            question: req.body.question,
                            category_id: category.id,
                            created_by: employee.id,
                            options: options
                        });
                        question.save((err, result) => {
                            if (err)
                                console.log(err + 'has been occured when creating a question');
                            console.log('question has been successfully saved');
                            res.json({ result });
                        })
                    })
                })
            })
        } else {
            res.json({ result: 'question already exists' })
        }
    })
}

// add employee controller

exports.addEmployee = (req, res) => {
    Employees.count({}, (err, count) => {
        if (count === 0) {
            var employee = new Employees({
                id: count + 1,
                name: req.body.name,
                created_by: 1
            })
        }
        else {
            var employee = new Employees(
                {
                    id: count + 1,
                    name: req.body.name,
                    created_by: req.body.id
                })
        }
        employee.save((err, result) => {
            if (err)
                console.log(err);
            res.json(result);
        })
    })
}

//addstream controller

exports.addStream = (req, res) => {
    Streams.count({}, (err, count) => {
        Employees.findOne({ name: req.body.name }, (err, employee) => {
            var stream = new Streams({
                id: count + 1,
                type: req.body.type,
                description: req.body.description,
                created_by: employee.id
            })
            stream.save((err, result) => {
                if (err)
                    console.log(err);
                res.json({ result });
            })
        })
    })
}

//controller to add an category

exports.addCategory = (req,res)=>{
    Categories.count({},(err,count)=>{
        if(err)
            res.json({err:err,result:'cant read the categories database'});
        else{
            Streams.findOne({type:req.body.stream},(err,stream)=>{
                if(err)
                    res.json({err:err,result:'cant read stream database'});
                else{
                    Employees.findOne({name:req.body.employee}, (err,employee)=>{
                        if(err)
                            res.json({err:err,result:'cant read the employee datebase'});
                        else{
                            Categories.findOne({category:req.body.category},(err,category)=>{
                                if(err)
                                    res.json({result:'cant read the the category database'});
                                else if(category)
                                    res.json({result:'category is already exsisting'});
                                else{
                                    var newCategory = new Categories({
                                        id:count+1,
                                        category:req.body.category,
                                        count:req.body.count,
                                        stream_id:stream.id,
                                        created_by:employee.id,
                                    })
                                    newCategory.save((err,category)=>{
                                        if(err)
                                            res.json({error:err,result:'cant save the category'})
                                        res.json({category:category,result:'category saved'});
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
        //agregate query to return only limited no of fields per document.
        // Questions.find({}, {question:1,_id:0},(err, questions) => {
    })
}

//controller to add a test

exports.addTest = (req,res)=>{
    Tests.count({},(err,count)=>{
        console.log(count)
        if(err)
            res.json({err:err,result:'cannot count the test docs'});
        else{
            Employees.findOne({name:req.body.name},{id:1,_id:0},(err,employee)=>{
        console.log(employee)                
                if(err)
                    res.json({err:err,result:'cannot read the employees database'});
                Tests.findOne({name:req.body.test},{name:1,_id:0},(err,test)=>{
        console.log(test)                    
                    if(err)
                        res.json({err:err,result:'cannot read the test collection'})
                    else if(test)
                        Tests.findOne({name:req.body.test}).remove((err,test)=>{
                            if(err)
                                res.json({result:'cannot overwrite the collection'})
                            if(test){
                                var test = new Tests({
                                    id:count+1,
                                    name:req.body.test,
                                    count:req.body.count,
                                    created_by:employee.id
                                });
                                test.save((err,test)=>{
                                    if(err)
                                        res.json({err:err,result:'cannot save test'});
                                })
                            }
                        })
                    else{
                        var test = new Tests({
                            id:count+1,
                            name:req.body.test,
                            count:req.body.count,
                            created_by:employee.id
                        });
                        test.save((err,test)=>{
                            if(err)
                                res.json({err:err,result:'cannot save test'});
                        })
                    }
                })
            })
        }
    })
}

//Jumble options controller

exports.jumbleOptions = (req, res) => {
    Questions.find({}, (err, questions) => {
        ((q) => {
            // console.log(JSON.stringify(q[0].options.sort((a, b) => a.order_by - b.order_by)));
            for (let i = 0; i < q.length; i++) {
                var arr = [];
                for (let j = 0; j < q[i].options.length; j++) {
                    arr.push(j + 1);
                }
                ((arr) => {
                    var currentIndex = arr.length, randomIndex, temp;
                    for (let k = 0; k < arr.length - 1; k++) {
                        randomIndex = Math.floor(Math.random() * currentIndex);
                        currentIndex--;
                        temp = arr[currentIndex];
                        arr[currentIndex] = arr[randomIndex];
                        arr[randomIndex] = temp;
                    }
                })(arr)
                let newOptions = [];
                for (let k = 0; k < q[i].options.length; k++) {
                    let temp = q[i].options[k];
                    temp.order_by = arr.pop();
                    newOptions.push(temp);
                };
                ((options, Dquestions, index) => {
                    Questions.findOneAndUpdate({ question: Dquestions[index].question }, { options: options }, { new: true },
                        (err, question) => {
                            console.log(question);
                            res.json({result:'successfully jumbled'})
                        })
                })(newOptions, q, i)
            }
        })(questions);
    })
}

//controller used to get questions


exports.getQuestions = (req, res) => {
//agregate query to return only limited no of fields per document.
// Questions.find({}, {question:1,_id:0},(err, questions) => {
    Questions.find({}, (err, questions) => {
        if(err){
            res.json({err:err});
        }
        else{
            res.json(questions);
        }
    })
}

//controller to get a question with respect to the test name

exports.getTest = (req,res)=>{
    var result = []
    Questions.find({},{_id:0,created_by:0,updated_by:0,createdAt:0,updatedAt:0},(err,questions)=>{
        if(err)
            res.json({err:err,result:'questions cannot be fetched'});
        Tests.findOne({id:req.params.id},{_id:0, created_by:0,updated_by:0},(err,test)=>{
            if(err)
                res.json({err:err,result:'cannot read the test collection'})
            else if(!test)
                res.json({result:'There is no test based on this id'});
            else{
                console.log(test)
                for(var i=0;i<test.count.length;i++){
                    var temp = questions.filter((question)=>{
                        if(question.category_id === test.count[i][0])
                            return question
                    })
                    for(var j=0;j<test.count[i][1];j++){
                        result.push(temp[j])
                    }
                }
                res.json({result:result});
            }
        })
    })
}