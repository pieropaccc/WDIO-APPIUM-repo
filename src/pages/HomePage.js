class HomePage {

   // Locators :    
   get FeaturedArticle(){
      return $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("Featured article")')
   }

   get clickFeaturedArticleLocator(){
      return $('id=org.wikipedia:id/view_wiki_article_card')
   }

get titleFeaturedArticle(){
   return $('android=new UiSelector().resourceId("org.wikipedia:id/articleTitle")')
}







// Metodos & Funciones :

async openFirstFeaturedArticleAndGetTitle(){
   await this.FeaturedArticle.isDisplayed()
   const expectedTitle = await this.getTitleFromFeaturedArticle()
   await this.clickOnFirstFeaturedArticle()
   await this.skipWikipediaGamesPopup()
   return expectedTitle
}


async getTitleFromFeaturedArticle(){
   await this.titleFeaturedArticle.isDisplayed()
   return (await this.titleFeaturedArticle.getText()).trim()
}

async clickOnFirstFeaturedArticle(){
   await this.clickFeaturedArticleLocator.click()
}

async skipWikipediaGamesPopup(){
   
const closeButton = await $('~Close')
await closeButton.waitForExist({ timeout: 2000, reverse: true })

try {
    await closeButton.click()
} catch (e) {
    // Elemento no existe, continuar
}
}



   async skipOnboardingIfNeeded() {
      try {
         const skipButton = await $('//android.widget.Button[@resource-id="org.wikipedia:id/fragment_onboarding_skip_button"]')
         if (await skipButton.isDisplayed()) {
            await skipButton.click()
            await driver.pause(1000)
         }
      } catch (e) {
         // Onboarding no presente
      
      }
   }

}

module.exports = new HomePage()
