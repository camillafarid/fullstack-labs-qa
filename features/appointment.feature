Feature: Create a pet Appointment

Scenario: Pet Owner wants to create an appointment
Given pet owner opens the website
When fill up all information and add appointment
Then appointment must be saved

Scenario: Pet Owner wants to delete an appointment 
Given pet owner opens the website
When fill up all information and add appointment
Then appointment must be saved
When pet owner deletes the appointment
Then appointment is not saved

Scenario: Pet owner wants to create appointment without information
Given pet owner opens the website
When do not fill up information and try to save
Then appointment is not saved
