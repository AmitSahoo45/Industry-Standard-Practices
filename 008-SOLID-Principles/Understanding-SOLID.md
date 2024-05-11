# SOLID - The principle of Programming. 

## S - Single Responsibility Principle
When we are coding, it's easy to identify when we are forgetting the principle. 

Let's imagine that we have a task manager class. 

```ts
class TaskManager {
  constructor() {}
  connectAPI(): void {}
  createTask(): void {
    console.log("Create Task");
  }
  updateTask(): void {
    console.log("Update Task");
  }
  removeTask(): void {
    console.log("Remove Task");
  }
  sendNotification(): void {
    console.log("Send Notification");
  }
  sendReport(): void {
    console.log("Send Report");
  }
}
```

All right! Probably do you notice the problem, isn't it?
The class TaskManager have a lot of responsabilities that don't belong to her. 
For example: sendNotification and sendReport methods.

Now, let's refact and apply the solution:
```ts
class APIConnector {
  constructor() {}
  connectAPI(): void {}
}

class Report {
  constructor() {}
  sendReport(): void {
    console.log("Send Report");
  }
}

class Notificator {
  constructor() {}
  sendNotification(): void {
    console.log("Send Notification");
  }
}

class TaskManager {
  constructor() {}
  createTask(): void {
    console.log("Create Task");
  }
  updateTask(): void {
    console.log("Update Task");
  }
  removeTask(): void {
    console.log("Remove Task");
  }
}
```
Definition:
<span style="font-size: 1.2rem;"><strong>
Each class must have one, and only one, reason to change.
</strong></span>


## O - Open-Closed Principle
If you notice that you have a lot of conditions in some method to verify something, perhaps you are in case of the OCP.

Let's imagine the following example of Exam Class:
```ts
type ExamType = {
    type: "BLOOD" | "XRay";
};

class ExamApprove {
    constructor() { }

    approveRequestExam(exam: ExamType): void {
        if (exam.type === "BLOOD") {
            if (this.verifyConditionsBlood(exam))
                console.log("Blood Exam Approved");
        }

        else if (exam.type === "XRay")
            if (this.verifyConditionsXRay(exam))
                console.log("XRay Exam Approved!");
    }

    verifyConditionsBlood(exam: ExamType): boolean {
        return true;
    }
    
    verifyConditionsXRay(exam: ExamType): boolean {
        return false;
    }
}
```

Yeah, propably you already saw this code several times. First we are breaking the first principle SRP and making a lot of conditions.

Now imagine if another type of examination appears, for example, ultrasound. We need to add anonther method to verify and another condition.

Let's refactor this code:
```ts
type ExamType = {
  type: "BLOOD" | "XRay";
};

interface ExamApprove {
  approveRequestExam(exam: ExamType): void;
  verifyConditionExam(exam: ExamType): boolean;
}

class BloodExamApprove implements ExamApprove {
  approveRequestExam(exam: ExamType): void {
    if (this.verifyConditionExam(exam)) 
      console.log("Blood Exam Approved");
  }

  verifyConditionExam(exam: ExamType): boolean {
    return exam.type === "BLOOD";
  }
}

class RayXExamApprove implements ExamApprove {
  approveRequestExam(exam: ExamType): void {
    if (this.verifyConditionExam(exam))
      console.log("RayX Exam Approved");
  }
  verifyConditionExam(exam: ExamType): boolean {
    return exam.type === "XRay";
  }
}
```

So much better!!!! 🤌🏻
Now if another type of examination appears we just implements the interface ExamApprove. And if another type of verification for the exam comes up, we only update the interface.

Definition:
<span style="font-size: 1.2rem;"><strong>
Software entities (such as classes and methods) must be open for extension but closed for modification
</strong></span>


## L - Liskov Substitution Principle
One of more complicated to understand and examplain. But how I said, I will make easier to you understand.
Imagine that you have an university and two types of students. Student and Post Graduated Student.

```ts
class Student {
  constructor(public name: string) {}

  study(): void {
    console.log(`${this.name} is studying`);
  }

  deliverTCC() {
    /** Problem: Post graduate Students don't delivery TCC */
  }
}

class PostgraduateStudent extends Student {
  study(): void {
    console.log(`${this.name} is studying and searching`);
  }
}
```

We have a problem here, we are extending the Student class, but the Post Graduated Student don't need to deliver a TCC. He only study and search.
How we can resolve this problem? Simple! Let's create a class Student and separete the Student of graduation and Post Graduation:

```ts
class Student {
  constructor(public name: string) {}

  study(): void {
    console.log(`${this.name} is studying`);
  }
}

class StudentGraduation extends Student {
  study(): void {
    console.log(`${this.name} is studying`);
  }

  deliverTCC() {}
}

class StudentPosGraduation extends Student {
  study(): void {
    console.log(`${this.name} is studying and searching`);
  }
}
```
Now we have a better way to approach to separete their respective responsabilities. The name of this principle can be scary but its principle is simple.

Definition:
<span style="font-size: 1.2rem;"><strong>
Derived classes (or child classes) must be able to replace their base classes (or parent classes)
</strong></span>


## I - Interface Segregation Principle
To understand this principle, the trick is remember of the definition. A class shound not be forced to implement methods that will not be used.

So imagine that you have a class the implement a interface that its never be used.

Let's imagine a scenario with an Seller and a Recepsionist of some shop. Both seller and recepsionist have a sallary, but only a seller have a commission.

Let's see the problem:

```ts
interface Employee {
  salary(): number;
  generateCommission(): void;
}

class Seller implements Employee {
  salary(): number {
    return 1000;
  }
  generateCommission(): void {
    console.log("Generating Commission");
  }
}

class Receptionist implements Employee {
  salary(): number {
    return 1000;
  }
  generateCommission(): void {
    /** Problem: Receptionist don't have commission  */
  }
}
```

Both implements the Employee interface, but the receptionist don't have comission. So we are force to implement a method that never it will be used.

So the solution:

```ts
interface Employee {
  salary(): number;
}

interface Commissionable {
  generateCommission(): void;
}

class Seller implements Employee, Commissionable {
  salary(): number {
    return 1000;
  }

  generateCommission(): void {
    console.log("Generating Commission");
  }
}

class Receptionist implements Employee {
  salary(): number {
    return 1000;
  }
}
```

Easy beasy! Now we have two interfaces! The employer class and the comissionable interface. Now only the Seller will implement the two interfaces where it will have the commmission. The receptionist don't only implements the employee. So the Receptionist don't be forced to implement the method that will never be used.

Definition:
<span style="font-size: 1.2rem;"><strong>
A class should not be forced to implement interfaces and methods that will not be used.
</strong></span>

## D - Dependency Inversion Principle
The last principle of SOLID. This principle is about the dependency of the class. The class should not depend on the concrete class, but the abstraction.

Imagine that you have a Service class that integrates with a Repository class that will call the Database, for example a PostgreSQL. But if the repository class change and the database change for a MongoDB, for example. 
Let's see the example:

```ts
interface Order {
  id: number;
  name: string;
}

class OrderRepository {
  constructor() {}
  saveOrder(order: Order) {}
}

class OrderService {
  private orderRepository: OrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  processOrder(order: Order) {
    this.orderRepository.saveOrder(order);
  }
}
```

We notice that the repository is OrderService class is directly coupled to the concrete implementation of OrderRepository class.

Let's refact this example:

```ts
interface Order {
  id: number;
  name: string;
}

class OrderRepository {
  constructor() {}
  saveOrder(order: Order) {}
}

class OrderService {
  private orderRepository: OrderRepository;

  constructor(repository: OrderRepository) {
    this.orderRepository = repository;
  }

  processOrder(order: Order) {
    this.orderRepository.saveOrder(order);
  }
}
```

Nice! Much better! Now we receive the repository as parameter on the constructor to instanciate and use. Now we depend of the abstraction and we don't need to know what repository we are using.

Definition: 
<span style="font-size: 1.2rem;"><strong>
depend on abstractions rather than concrete implementations
</strong></span>