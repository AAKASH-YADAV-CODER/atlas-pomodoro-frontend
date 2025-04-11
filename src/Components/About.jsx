import React from "react";
import { motion } from "framer-motion";
import { Clock, Brain, Coffee, Target, BarChart2, Zap } from "lucide-react";

const InfoModal = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="flex items-center justify-center z-50 p-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="bg-white rounded-2xl p-8 max-w-4xl w-full overflow-y-auto shadow-xl">
        <motion.h2
          className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-indigo-600 mb-8 text-center"
          variants={itemVariants}
        >
          About the Pomodoro Technique
        </motion.h2>

        <motion.div
          className="space-y-8 text-gray-700"
          variants={containerVariants}
        >
          <motion.section
            variants={itemVariants}
            className="bg-purple-50 p-6 rounded-xl"
          >
            <h3 className="text-2xl font-semibold text-purple-800 mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6" />
              What is the Pomodoro Technique?
            </h3>
            <p className="text-lg leading-relaxed">
              The Pomodoro Technique is a revolutionary time management method
              developed by Francesco Cirillo in the late 1980s. Named after the
              tomato-shaped kitchen timer he used during university, this
              technique has become a global productivity phenomenon. It's based
              on the idea that frequent breaks can improve mental agility and
              maintain high levels of productivity throughout the day.
            </p>
          </motion.section>

          <motion.section
            variants={itemVariants}
            className="bg-indigo-50 p-6 rounded-xl"
          >
            <h3 className="text-2xl font-semibold text-indigo-800 mb-4 flex items-center gap-2">
              <Target className="w-6 h-6" />
              How to Use the Pomodoro Technique
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h4 className="text-xl font-medium text-indigo-700">
                  Basic Steps:
                </h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Choose a task you want to accomplish</li>
                  <li>Set a timer for 25 minutes (one Pomodoro)</li>
                  <li>Work on the task until the timer rings</li>
                  <li>Take a 5-minute break</li>
                  <li>Repeat the process</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-medium text-indigo-700">
                  Advanced Tips:
                </h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>After 4 Pomodoros, take a longer 15-30 minute break</li>
                  <li>Use the breaks to stretch, hydrate, or rest your eyes</li>
                  <li>
                    Track your completed Pomodoros to measure productivity
                  </li>
                  <li>
                    Adjust the duration based on your task and energy levels
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section
            variants={itemVariants}
            className="bg-purple-50 p-6 rounded-xl"
          >
            <h3 className="text-2xl font-semibold text-purple-800 mb-4 flex items-center gap-2">
              <Brain className="w-6 h-6" />
              Benefits of the Pomodoro Technique
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Zap className="w-6 h-6 text-purple-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-purple-700">
                      Enhanced Focus
                    </h4>
                    <p>
                      Short, timed sessions help maintain high concentration
                      levels and prevent mental fatigue.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Coffee className="w-6 h-6 text-purple-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-purple-700">
                      Better Work-Life Balance
                    </h4>
                    <p>
                      Regular breaks help maintain energy levels and prevent
                      burnout throughout the day.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <BarChart2 className="w-6 h-6 text-purple-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-purple-700">
                      Improved Productivity
                    </h4>
                    <p>
                      Breaking tasks into manageable chunks makes them less
                      overwhelming and more achievable.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Target className="w-6 h-6 text-purple-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-purple-700">
                      Better Time Management
                    </h4>
                    <p>
                      Track and optimize how you spend your time on different
                      tasks and projects.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            variants={itemVariants}
            className="bg-indigo-50 p-6 rounded-xl"
          >
            <h3 className="text-2xl font-semibold text-indigo-800 mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6" />
              Tips for Success
            </h3>
            <ul className="list-disc pl-5 space-y-3 text-lg">
              <li>
                Start with shorter Pomodoros (15-20 minutes) if you're new to
                the technique
              </li>
              <li>Use a physical timer or app to track your sessions</li>
              <li>Create a dedicated workspace free from distractions</li>
              <li>Keep a log of completed Pomodoros and tasks</li>
              <li>Adjust the technique to fit your personal work style</li>
              <li>Use the breaks to move around and refresh your mind</li>
            </ul>
          </motion.section>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InfoModal;
