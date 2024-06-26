package com.prathamesh.todo.repository;

import com.prathamesh.todo.model.Todo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TodoRepo extends MongoRepository<Todo,String> {

}
