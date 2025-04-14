
// This file will be the central place to import and export all projects
// In the future, we could build this dynamically by scanning the directory

import { scooterRentalProject } from './scooter_rental/project';

// Export all projects for easy access
export const projectsList = [
  scooterRentalProject,
  // Add more projects here as they are created
];

// Export individual projects for direct imports
export { scooterRentalProject };
