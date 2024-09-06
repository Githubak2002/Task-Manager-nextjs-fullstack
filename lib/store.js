import { create } from 'zustand';

export const useStore = create((set) => ({
  allTasks: [],
  // Set initial tasks
  setAllTasks: (tasks) => set({ allTasks: tasks }),
  // Add a new task
  addTask: (task) => set((state) => ({
    allTasks: [...state.allTasks, task]
  })),
  // Remove a task by id
  removeTask: (id) => set((state) => ({
    allTasks: state.allTasks.filter((task) => task.id !== id)
  })),
  // Remove all tasks
  removeAllTasks: () => set({ allTasks: [] }),
  // Bear-related state
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears })
}));


// import { create } from 'zustand';

export const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set((state) => ({ count : state.count = 0 }))
}))
