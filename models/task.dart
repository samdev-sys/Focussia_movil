
enum TaskStatus { todo, inProgress, done }
enum QuadrantType { doFirst, schedule, delegate, eliminate }

class Task {
  final String id;
  final String name;
  final String assignee;
  final int load;
  final TaskStatus status;
  final QuadrantType quadrant;
  final bool isPareto;

  Task({
    required this.id,
    required this.name,
    this.assignee = "Alex (Me)",
    this.load = 5,
    this.status = TaskStatus.todo,
    required this.quadrant,
    this.isPareto = false,
  });

  Task copyWith({TaskStatus? status}) {
    return Task(
      id: id,
      name: name,
      assignee: assignee,
      load: load,
      status: status ?? this.status,
      quadrant: quadrant,
      isPareto: isPareto,
    );
  }
}
