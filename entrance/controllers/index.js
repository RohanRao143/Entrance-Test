const Employees = require('../models/Employees');
const Questions = require('../models/Questions');
const Streams = require('../models/Streams');

exports.addQuestion = (req,res)=>{
    if(req.body.options.length>5)
        res.json({error:'No of options cannot be more than five'})
    Questions.count({},(err,count)=>{
        Streams.findOne({type:req.body.stream},(err,stream)=>{
            Employees.findOne({name:req.body.name},(err,employee)=>{
                var options = []
                for(let i=0;i<req.body.options.length;i++){
                    options.push({id:i+1,order_by:i+1,value:req.body.options[i].option,correct:req.body.options[i].istrue,type:req.body.options[i].type})
                }
                var question = new Questions({
                    id:count+1,
                    question:req.body.question,
                    stream_id:stream.id,
                    created_by:employee.id,
                    options:options
                });
                question.save((err,result)=>{
                    if(err)
                        console.log(err + 'has been occured when creating a question');
                    console.log('question has been successfully saved');
                })
            })
        })
    })
}

exports.addEmployee = (req,res)=>{
    Employees.count({},(err,count)=>{
        if(count===0){
            var employee = new Employees({
                id:count+1,
                name:req.body.name,
                created_by:1
            })
        }
        else{
            var employee = new Employees(
                {
                    id:count+1,
                    name:req.body.name,
                    created_by:req.body.id
                })
            }
        employee.save((err,result)=>{
            if(err)
                console.log(err);
            res.json(result);    
        })
    })
}

exports.addStream = (req,res)=>{
    Streams.count({},(err,count)=>{
        Employees.findOne({name:req.body.name},(err,employee)=>{
            var stream = new Streams({
                id:count+1,
                type:req.body.type,
                description:req.body.description,
                created_by:employee.id
            })
            stream.save((err,result)=>{
                if(err)
                    console.log(err);
                res.json({result});
            })
        })
    })
}