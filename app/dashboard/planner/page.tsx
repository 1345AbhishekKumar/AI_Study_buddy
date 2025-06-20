'use client';

import AnimatedBackground from '@/components/animations/AnimatedBackground';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Plus, Clock, Target, BookOpen, Brain, MoreVertical, Edit } from 'lucide-react';
import { useState } from 'react';

const taskColumns = [
  { id: 'todo', title: 'To Study', color: 'from-gray-500 to-gray-600' },
  {
    id: 'progress',
    title: 'In Progress',
    color: 'from-[#3A8EF6] to-[#6B46C1]',
  },
  { id: 'done', title: 'Completed', color: 'from-[#5CF4A0] to-[#3A8EF6]' },
];

const tasks = [
  {
    id: 1,
    title: 'Biology Chapter 5: Photosynthesis',
    type: 'pdf',
    priority: 'high',
    dueDate: '2024-01-15',
    estimatedTime: '2.5 hours',
    status: 'todo',
    aiTip: 'Focus time: 25 min sessions work best for this topic',
    progress: 0,
  },
  {
    id: 2,
    title: 'Khan Academy: Cellular Respiration',
    type: 'youtube',
    priority: 'medium',
    dueDate: '2024-01-16',
    estimatedTime: '1.5 hours',
    status: 'progress',
    aiTip: 'Take notes on key processes',
    progress: 60,
  },
  {
    id: 3,
    title: 'Chemistry Lab Report',
    type: 'assignment',
    priority: 'high',
    dueDate: '2024-01-14',
    estimatedTime: '3 hours',
    status: 'progress',
    aiTip: 'Break into sections: intro, method, results',
    progress: 30,
  },
  {
    id: 4,
    title: 'Math Practice Set 1',
    type: 'practice',
    priority: 'low',
    dueDate: '2024-01-18',
    estimatedTime: '1 hour',
    status: 'done',
    aiTip: 'Great job! Review mistakes for better retention',
    progress: 100,
  },
];

const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

export default function PlannerPage() {
  const [selectedDate, setSelectedDate] = useState(15);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return BookOpen;
      case 'youtube':
        return Brain;
      case 'assignment':
        return Edit;
      case 'practice':
        return Target;
      default:
        return BookOpen;
    }
  };

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="space-y-8">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 dark:from-gray-900/50 dark:via-transparent dark:to-gray-900/50 pointer-events-none z-0">
        <AnimatedBackground />
      </div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Study Planner</h1>
          <p className="mt-2 text-[#A0A6B2]">Plan smart. Study better.</p>
        </div>
        <motion.button
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#3A8EF6] to-[#6B46C1] px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:from-[#2563eb] hover:to-[#5b21b6] hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="h-5 w-5" />
          Add Task
        </motion.button>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Calendar Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-3">
              <Calendar className="h-5 w-5 text-[#3A8EF6]" />
              <h3 className="font-semibold text-white">January 2024</h3>
            </div>

            {/* Mini Calendar */}
            <div className="mb-6 grid grid-cols-7 gap-1">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                <div key={idx} className="p-2 text-center text-xs font-medium text-[#A0A6B2]">
                  {day}
                </div>
              ))}
              {calendarDays.map(day => {
                const hasTask = tasks.some(task => new Date(task.dueDate).getDate() === day);
                const isSelected = selectedDate === day;
                const isToday = day === 15;

                return (
                  <motion.button
                    key={day}
                    onClick={() => setSelectedDate(day)}
                    className={`relative rounded-lg p-2 text-sm transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#3A8EF6] to-[#6B46C1] text-white'
                        : isToday
                          ? 'border border-[#5CF4A0]/30 bg-[#5CF4A0]/20 text-[#5CF4A0]'
                          : 'text-[#A0A6B2] hover:bg-white/10 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {day}
                    {hasTask && (
                      <div className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#5CF4A0]"></div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Today's Summary */}
            <div className="space-y-4">
              <h4 className="font-medium text-white">Today&apos;s Focus</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
                  <Clock className="h-4 w-4 text-[#3A8EF6]" />
                  <div>
                    <div className="text-sm font-medium text-white">6.5 hours</div>
                    <div className="text-xs text-[#A0A6B2]">Planned study time</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
                  <Target className="h-4 w-4 text-[#5CF4A0]" />
                  <div>
                    <div className="text-sm font-medium text-white">3 tasks</div>
                    <div className="text-xs text-[#A0A6B2]">Due today</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Task Board */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="grid gap-6 md:grid-cols-3">
            {taskColumns.map((column, _columnIndex) => (
              <div key={column.id} className="space-y-4">
                {/* Column Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 bg-gradient-to-r ${column.color} rounded-full`}></div>
                    <h3 className="font-semibold text-white">{column.title}</h3>
                    <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-[#A0A6B2]">
                      {getTasksByStatus(column.id).length}
                    </span>
                  </div>
                </div>

                {/* Tasks */}
                <div className="min-h-[400px] space-y-3">
                  <AnimatePresence>
                    {getTasksByStatus(column.id).map((task, taskIndex) => {
                      const TypeIcon = getTypeIcon(task.type);

                      return (
                        <motion.div
                          key={task.id}
                          className="group cursor-pointer rounded-xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-4 backdrop-blur-xl transition-all duration-300 hover:border-[#3A8EF6]/50"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3, delay: taskIndex * 0.1 }}
                          whileHover={{ scale: 1.02, y: -2 }}
                          layout
                        >
                          {/* Task Header */}
                          <div className="mb-3 flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`h-2 w-2 ${getPriorityColor(task.priority)} rounded-full`}></div>
                              <TypeIcon className="h-4 w-4 text-[#3A8EF6]" />
                            </div>
                            <button className="rounded-lg p-1 opacity-0 transition-all duration-300 hover:bg-white/10 group-hover:opacity-100">
                              <MoreVertical className="h-4 w-4 text-[#A0A6B2]" />
                            </button>
                          </div>

                          {/* Task Content */}
                          <div className="space-y-3">
                            <h4 className="line-clamp-2 font-medium text-white transition-colors group-hover:text-[#3A8EF6]">
                              {task.title}
                            </h4>

                            {/* Progress Bar */}
                            {task.progress > 0 && (
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span className="text-[#A0A6B2]">Progress</span>
                                  <span className="text-[#5CF4A0]">{task.progress}%</span>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-white/10">
                                  <div
                                    className="h-1.5 rounded-full bg-gradient-to-r from-[#5CF4A0] to-[#3A8EF6] transition-all duration-300"
                                    style={{ width: `${task.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}

                            {/* Task Details */}
                            <div className="flex items-center justify-between text-xs text-[#A0A6B2]">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{task.estimatedTime}</span>
                              </div>
                              <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                            </div>

                            {/* AI Tip */}
                            <div className="rounded-lg border border-[#6B46C1]/30 bg-gradient-to-r from-[#6B46C1]/20 to-[#3A8EF6]/20 p-2">
                              <div className="flex items-start gap-2">
                                <Brain className="mt-0.5 h-3 w-3 shrink-0 text-[#6B46C1]" />
                                <span className="text-xs text-[#A0A6B2]">{task.aiTip}</span>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
                              <motion.button
                                className="flex-1 rounded-lg bg-[#3A8EF6]/20 px-3 py-2 text-xs text-[#3A8EF6] transition-colors hover:bg-[#3A8EF6]/30"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                Start Study
                              </motion.button>
                              <button className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20">
                                <Edit className="h-3 w-3 text-[#A0A6B2]" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

                  {/* Add Task Button */}
                  <motion.button
                    className="group w-full rounded-xl border-2 border-dashed border-white/20 p-4 transition-all duration-300 hover:border-[#3A8EF6]/50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Plus className="mx-auto h-5 w-5 text-[#A0A6B2] transition-colors group-hover:text-[#3A8EF6]" />
                    <span className="text-sm text-[#A0A6B2] transition-colors group-hover:text-[#3A8EF6]">
                      Add Task
                    </span>
                  </motion.button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
