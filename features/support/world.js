const { setWorldConstructor } = require('@cucumber/cucumber');
const playwright = require('playwright');

class CustomWorld {
  async openUrl(url) {
    const browser = await playwright.chromium.launch({
      headless: false,
    });
    const context = await browser.newContext();
    this.page = await context.newPage();
    await this.page.goto(url);
    this.selectors(); 
  }
  
  async selectors(){
    const page = this.page
    this.appointmentTitle = page.locator('[data-testid="app-name"]')
    this.createTitle = page.locator('[data-testid="Title"]')
    this.yourAppointmentTitle = page.locator('[data-testid="dynamic-title"]')
    this.petNameInput = page.locator('[data-testid="pet"]')
    this.ownerName = page.locator('[data-testid="owner"]')
    this.appointmentTitle = page.locator('[data-testid="app-name"]')
    this.dateInput = page.locator('[data-testid="date"]')
    this.timeInput = page.locator('[data-testid="time"]')
    this.symptomsInput = page.locator('[data-testid="symptoms"]')
    this.submitButton = page.locator('[data-testid="btn-submit"]')
    this.deleteButton = page.locator('[data-testid="btn-delete"]')
    this.appointmentForms = page.locator('[data-testid="appointment"]')
    this.appointmentAlert = page.locator('[data-testid="alert"]')
  }
  
  async fillAppointment(appointInfo) {
    await this.petNameInput.type(appointInfo.petName)
    await this.ownerName.type(appointInfo.ownerName)
    await this.dateInput.type(appointInfo.date)
    await this.timeInput.type(appointInfo.time)
    await this.symptomsInput.fill(appointInfo.petSymptoms)
    await this.submitButton.click();
  }
}
setWorldConstructor(CustomWorld);