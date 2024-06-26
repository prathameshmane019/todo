package com.prathamesh.todo.service;

import com.prathamesh.todo.model.Todo;
import com.prathamesh.todo.repository.TodoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {

    @Autowired
    private TodoRepo TodoRepo;

    public void addTodo(Todo todo) {
        TodoRepo.save(todo);
        System.out.println("Added todo: {}"+ todo);
    }
    public List<Todo> getTodo() {
        return TodoRepo.findAll();
    }


    public Optional<Todo> getTodoById(String id) {
        return TodoRepo.findById(id);
    }

    public void deleteTodo(String id) {
        TodoRepo.deleteById(id);
        System.out.println("Todo deleted");
    }

    public Todo updateTodo(String id, Todo newTodo) {
         Todo oldTodo = TodoRepo.findById(id).orElse(null);
        System.out.println(newTodo.getTitle());
        if(oldTodo!=null){
            oldTodo.setTitle(newTodo.getTitle()!=null && !newTodo.getTitle().isEmpty() ? newTodo.getTitle():oldTodo.getTitle());
            oldTodo.setTasks(newTodo.getTasks()!=null && !newTodo.getTasks().isEmpty()? newTodo.getTasks():oldTodo.getTasks());
        }
        TodoRepo.save((oldTodo));
        System.out.println(oldTodo.getTitle() +" Updated");
        return oldTodo;
    }
}
