package com.prathamesh.todo.controller;

import com.prathamesh.todo.model.Todo;
import com.prathamesh.todo.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/todos")
public class TodoControllers {
    @Autowired
    private TodoService todoService;

    @GetMapping
    public List<Todo> getTodos() {
        return todoService.getTodo();
    }

    @PostMapping
    public void addTodo(@RequestBody Todo todo) {
        todoService.addTodo(todo);
    }

    @GetMapping("/{id}")
    public Optional<Todo> getById(@PathVariable String id){
        return todoService.getTodoById(id);
    }
    @DeleteMapping("/{id}")
    public String deleteTodo(@PathVariable String id){
        todoService.deleteTodo(id);
        return "todo deleted with id :"+id;
    }

    @PutMapping("/{id}")
    public Todo updateTod(@PathVariable String id,@RequestBody Todo todo){
        return todoService.updateTodo(id,todo);
    }

}