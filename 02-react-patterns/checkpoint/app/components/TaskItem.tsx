"use client";

import { Task } from "../types/task";
import { Check, Clock, AlertCircle } from "lucide-react";
import { clsx } from "clsx";

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const priorityColors = {
    high: "text-red-600",
    medium: "text-yellow-600",
    low: "text-green-600",
  };

  const priorityIcons = {
    high: AlertCircle,
    medium: Clock,
    low: Check,
  };

  // Ski-specific styling
  const difficultyColors = {
    'green': 'border-l-green-500 bg-green-50',
    'blue': 'border-l-blue-500 bg-blue-50',
    'black': 'border-l-gray-700 bg-gray-50',
    'double-black': 'border-l-black bg-gray-100'
  }

  const difficultyIcons = {
    'green': '🟢',
    'blue': '🔵',
    'black': '⚫',
    'double-black': '⚫⚫'
  }

  const PriorityIcon = priorityIcons[task.priority];
  const difficultyStyle = task.difficulty ? difficultyColors[task.difficulty] : 'border-l-gray-300'
  const difficultyIcon = task.difficulty ? difficultyIcons[task.difficulty] : '🎿'

  return (
    <div
      className={clsx(
        "card border-l-4 transition-all duration-200 hover:shadow-md cursor-pointer",
        difficultyStyle,
        task.completed && "opacity-60"
      )}
    >
      <div className="flex items-start space-x-4">
        <div className="text-2xl mt-1">
          {difficultyIcon}
        </div>

        <div className="flex-1 min-w-0">
          <h3
            className={clsx(
              "font-semibold text-lg",
              task.completed ? "line-through text-gray-500" : "text-gray-900"
            )}
          >
            {task.title || task.name}
          </h3>

          {task.description && (
            <p className="text-sm text-gray-600 mt-1">
              {task.description}
            </p>
          )}

          {/* Ski-specific details */}
          {task.mountain && (
            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
              <span>🏔️ {task.mountain}</span>
              {task.vertical && <span>📏 {task.vertical}ft vertical</span>}
              {task.conditions && <span>❄️ {task.conditions}</span>}
            </div>
          )}

          {task.notes && (
            <p className="text-sm text-gray-700 mt-2 italic">
              {task.notes}
            </p>
          )}

          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
            <div
              className={clsx(
                "flex items-center space-x-1",
                priorityColors[task.priority]
              )}
            >
              <PriorityIcon className="w-3 h-3" />
              <span className="capitalize">
                {task.priority}
              </span>
            </div>
            <span>
              Created {task.createdAt.toLocaleDateString()}
            </span>
            {task.completedAt && (
              <span>
                Completed {task.completedAt.toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
