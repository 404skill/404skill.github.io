
import { Project } from '../../types';

export const scooterRentalProject: Project = {
  id: 'scooter_rental',
  title: 'Scooter Rental System',
  description: 'Design and implement a system for managing electric scooter rentals with user accounts, payment processing, and location tracking.',
  difficulty: 'medium',
  tasks: [
    {
      id: 't1',
      name: 'User Management',
      description: 'Create a system to manage user accounts, including registration, authentication, and profile management.'
    },
    {
      id: 't2',
      name: 'Scooter Inventory',
      description: 'Implement a database model for tracking scooters, their status, and location information.'
    },
    {
      id: 't3',
      name: 'Rental Logic',
      description: 'Build the core rental functionality including checking out, returning, and calculating fees.'
    },
    {
      id: 't4',
      name: 'Location Tracking',
      description: 'Add GPS tracking capabilities to monitor scooter locations and create geofencing rules.'
    },
    {
      id: 't5',
      name: 'Payment Processing',
      description: 'Integrate a payment system to handle rental fees, deposits, and penalties.'
    }
  ],
  technologies: ['containers', 'database', 'api'],
  templateUrl: '/templates/scooter-rental.zip',
};
