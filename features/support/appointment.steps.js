const { expect } = require('@playwright/test')
const { Given, When, Then } = require('@cucumber/cucumber')

Given('pet owner opens the website', { timeout: 60 * 120 }, async function () {
  await this.openUrl('http://localhost:3000/')
  await this.page.screenshot({path: 'no-appointment.png'})
  await expect(this.appointmentTitle).toHaveText('Appointment Management')
  await expect(this.appointmentTitle).toBeVisible();
  await expect(this.createTitle).toHaveText('Create Appointment')
  await expect(this.createTitle).toBeVisible();
});

When('fill up all information and add appointment', async function () {
  const date = new Date().toLocaleDateString()
  const time = new Date().toLocaleDateString([],{hour:'2-digit', minute: '2-digit'});
  const appointInfo = {
    petName: 'Merlin, The Wizard', 
    ownerName: 'QAmilla',
    date: date, 
    time: time,
    petSymptoms: 'He is caughing a lot and his hair is falling out.'}
    await this.fillAppointment(appointInfo)
  });
  
  Then('appointment must be saved', async function () {
    expect(this.appointmentForms).toBeVisible(); 
    expect(this.deleteButton).toBeVisible(); 
    expect(this.yourAppointmentTitle).toHaveText('Manage your appointments')
    expect(this.page.locator('text=Pet: Merlin, The Wizard')).toBeVisible()
    expect(this.page.locator('text=Owner: QAmilla')).toBeVisible()
    expect(this.page.locator('text=Date:' + this.date + '')).toBeVisible()
    expect(this.page.locator('text=Time:' + this.time + '')).toBeVisible()
    expect(this.page.locator('text=Symptoms: He is caughing a lot and his hair is falling out.')).toBeVisible()

    await this.page.screenshot({path: 'appointment-saved.png'})
  });
  
  When('pet owner deletes the appointment', async function () {
    this.deleteButton.click()
  });
  
  When('do not fill up information and try to save', async function () {
      await this.fillAppointment({petName: '', ownerName: '', date: '', time: '', petSymptoms: ''})
  });
  
  Then('appointment is not saved', async function () {
    expect(this.appointmentForms).toBeVisible(); 
    expect(this.deleteButton).toBeVisible(); 
    expect(this.yourAppointmentTitle).toHaveText('There are no appointments')
    expect(this.page.locator('text=Pet: Merlin, The Wizard')).toBeVisible(false)
    expect(this.page.locator('text=Owner: QAmilla')).toBeVisible(false)
    expect(this.page.locator('text=Date:' + this.date + '')).toBeVisible(false)
    expect(this.page.locator('text=Time:' + this.time + '')).toBeVisible(false)
    expect(this.page.locator('text=Symptoms: He is caughing a lot and his hair is falling out.')).toBeVisible(false)
  });
  
