const Employees = require('../models/Employees');
const Questions = require('../models/Questions');
const Streams = require('../models/Streams');

exports.addQuestion = (req, res) => {
    Questions.findOne({ question: req.body.question }, (err, question) => {
        if (!question) {
            Questions.count({}, (err, count) => {
                Streams.findOne({ type: req.body.stream }, (err, stream) => {
                    Employees.findOne({ name: req.body.name }, (err, employee) => {
                        var options = []
                        for (let i = 0; i < req.body.options.length; i++) {
                            options.push({ id: i + 1, order_by: i + 1, value: req.body.options[i].value, correct: req.body.options[i].istrue, type: req.body.options[i].type })
                        }
                        var question = new Questions({
                            id: count + 1,
                            question: req.body.question,
                            stream_id: stream.id,
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

exports.getQuestions = (req, res) => {
    Questions.find({}, (err, questions) => {
        questions.map((question) => {
            console.log(question)
        })
    })
}