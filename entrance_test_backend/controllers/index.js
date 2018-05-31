const Employees = require('../models/Employees');
const Questions = require('../models/Questions');
const Streams = require('../models/Streams');
const Categories = require('../models/Categories');
const Tests = require('../models/Tests');
const Applicants = require('../models/Applicants');

function shuffle(array){
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//add question controller

exports.addQuestion = (req, res) => {
    Questions.findOne({ question: req.body.question }, (err, question) => {
        if (!question) {
            Questions.count({}, (err, count) => {
                Categories.findOne({ category: req.body.category }, (err, category) => {
                    Employees.findOne({ name: req.body.name }, (err, employee) => {
                        var options = []
                        for (let i = 0; i < req.body.options.length; i++) {
                            options.push({ id: i + 1, order_by: i + 1, value: req.body.options[i].option, correct: req.body.options[i].istrue, type: req.body.options[i].type })
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
                if(err)
                    res.json({err:err,result:'cannot read the employees database'});
                Questions.find({},{_id:0,created_by:0,updated_by:0,createdAt:0,updatedAt:0},(err,questions)=>{
                    //stop shuffling questions over here it can be shuffled in get test service.
                    
                    //questions = shuffle(questions);
                    
                    if(err)
                        res.json({err:err,result:'questions cannot be fetched'});
                    else{
                        var result = [];
                        var key = [];
                        for(var i=0;i<req.body.count.length;i++){
                            var temp = questions.filter((question)=>{
                                if(question.category_id === req.body.count[i][0])
                                    return question
                            })
                            for(var j=0;j<req.body.count[i][1];j++){
                                if(temp[j])
                                    result.push(temp[j])
                            }
                        }
                        for(let i=0;i<result.length;i++){
                            for(let j=0;j<result[i].options.length;j++){
                                if(result[i].options[j].correct==true){
                                    key.push({question_id:result[i].id,option_id:result[i].options[j].id});
                                }
                                delete result[i].options[j].correct;
                                delete result[i].options[j].order_by;
                            }
                        }
                        console.log(key)
                        console.log(result)
                        //     Tests.findOneAndUpdate({id:req.params.id},{key:key},{new:true},(err,document)=>{
                        //         if(err){
                        //             console.log(err);
                        //         }
                        //     //    console.log(document)
                        //     })
                        // res.json({result:result});
                    }
                    Tests.findOne({name:req.body.test},{name:1,_id:0},(err,test)=>{
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
                                        created_by:employee.id,
                                        key:key,
                                        questions:result
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
                                created_by:employee.id,
                                key:key,
                                questions:result
                            });
                            test.save((err,test)=>{
                                if(err)
                                    res.json({err:err,result:'cannot save test'});
                            })
                        }
                    })
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
            res.json({questions:shuffle(questions)});
        }
    })
}

//update test and change value of current test in document.
exports.updateTest = (req,res)=>{
    Applicants.findOne({id:req.params.id},(err,applicant)=>{
        Tests.findOne({id:applicant.tests[applicant.current_test]},{_id:0,key:1},(err,test)=>{
            var score = 0;
            for(let i=0;i<test.key.length;i++){
                if(test.key[i].question_id==req.body.result[i].question_id){
                    if(test.key[i].option_id==req.body.result[i].option_id){
                        score++;
                    }
                }else{
                    res.json({err:'submitted the wrong paper'})
                }
            }
            if(score>=(7*test.key.length)/10){
                if(applicant.current_test==(applicant.tests.length-1)){
                    Applicants.findOneAndUpdate({id:req.params.id},{$set:{is_complete:true},$push:{result:[req.body.result]}},{new:true}, (err,applicant)=>{
                        if(err)
                            res.json({result:'test has not been updated',err:err})
                        console.log(applicant);
                        res.json({applicant})
                    })        
                }else{
                    Applicants.findOneAndUpdate({id:req.params.id},
                        {$set:{current_test:applicant.current_test+1},$push:{result:[req.body.result]}},{new:true},
                        (err,applicant)=>{
                            if(err)
                                res.json({result:'test has not been updated',err:err})
                            console.log(applicant)
                            res.json(applicant)
                        }
                    )
                }
            }
            else{
                Applicants.findOneAndUpdate({id:req.params.id},{is_qualified:false},(err,applicant)=>{
                    if(err)
                        res.json(err)
                    res.json(applicant);
                })
            }
        })
    })
}


//controller to get a question with respect to the test name

exports.getTest = (req,res)=>{
    Applicants.findOne({id:req.params.id},(err,applicant)=>{
        if(err)
            res.json(err);
        if(applicant.is_qualified){
            if(!applicant.is_complete){
                var result = []
                    Tests.findOne({id:applicant.tests[applicant.current_test]},{_id:0, created_by:0,updated_by:0},(err,test)=>{
                        if(err)
                            res.json({err:err,result:'cannot read the test collection'})
                        else if(!test)
                            res.json({result:'There is no test based on this id'});
                        else{
                            result = shuffle(test.questions);
                            res.json({result:result});  
                        }
                    })
            }
            else{
                res.json({result:'applicant has successfully completed his test'})
            }
        }else{
            res.json({result:'you are not qualified for the next round'});
        }
    })
}

//controller to add an applicant.

exports.addApplicant = (req,res)=>{
    console.log(req.body.admin)
    Employees.findOne({id:req.body.admin},{id:1,_id:0},(err,employee)=>{
        var applicant = new Applicants({
            id:req.params.id,
            result:[],
            name:req.body.firstname+" "+req.body.lastname,
            tests:req.body.tests,
            time:req.body.time,
            created_by:employee.id,
            current_test:0,
            is_complete:false,
            is_qualified:true
        })
        applicant.save((err,result)=>{
            if(err)
                res.json(err);
            res.json(result);
        })
    })  
}

//controller for add applicant form

exports.getApplicantForm = (req,res)=>{
    var result = {}
    Tests.find({},{_id:0,id:1,name:1},(err,tests)=>{
        if(err)
            res.json(err);
        result.tests = []
        for(let i=0;i<tests.length;i++){
            result.tests.push({id:tests[i].id,test:tests[i].name});
        }
        Employees.find({},{_id:0, id:1, name:1},(err,employees)=>{
            if(err)
                res.json(err);
            result.admin = [];
            for(let i=0;i<employees.length;i++){
                result.admin.push({id:employees[i].id,name:employees[i].name});
            }
            res.json(result);
        })
    })
}

// controller for add test form 

exports.getTestForm = (req,res)=>{
    var result = {}
    Categories.find({},{_id:0,id:1,category:1},(err,categories)=>{
        result.categories = categories;
    })
    
}