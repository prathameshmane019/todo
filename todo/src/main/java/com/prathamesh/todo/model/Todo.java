package com.prathamesh.todo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "todos")
@Data
public class Todo {
    @Id
    private String id;

    private String title;
    private List<String> tasks = new ArrayList<String>();


}
