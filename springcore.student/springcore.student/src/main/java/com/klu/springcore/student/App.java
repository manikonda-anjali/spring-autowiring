package com.klu.springcore.student;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
public class App {
public static void main(String[] args) {
ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
Student student = (Student) context.getBean("student");
// IMPORTANT: call display(), do NOT use println(student)
student.display();
}
}