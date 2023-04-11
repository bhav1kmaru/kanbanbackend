const express = require('express');
const { BoardModel } = require('../models/Board.model');

const boardRouter=express.Router()

boardRouter.get('/',async(req,res)=>{
    try {
        const boards=await BoardModel.find()
        res.send(boards)
    } catch (error) {
        res.status(500).send({message:error.message})
    }
})

boardRouter.get('/:id',async(req,res)=>{
    try {
        const board=await BoardModel.findById(req.params.id)
        if(board==null){
            return res.status(404).send({message:"Board not found"})
        }
        res.send(board)
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
})

boardRouter.post('/',async(req,res)=>{
    const board=new BoardModel({
        name:req.body.name,
    })
    try {
        const newBoard=await board.save()
        res.status(201).send(newBoard)
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})

boardRouter.patch('/:id',async(req,res)=>{
    try {
        const board=await BoardModel.findById(req.params.id)
        if(req.body.name!=null){
            board.name=req.body.name
        }
        const updatedBoard=await board.save()
        res.send(updatedBoard)
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})

boardRouter.delete('/:id',async(req,res)=>{
    try {
        await BoardModel.findByIdAndDelete(req.params.id)
        res.send({message:"Board Deleted"})
    } catch (error) {
        res.status(500).send({message:error.message})
    }
})

module.exports={boardRouter}