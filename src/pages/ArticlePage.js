const HomePage = require("./HomePage")

class ArticlePage {
    
   get articleTitle(){
      return $('(//android.webkit.WebView//android.widget.TextView)[1]')
   }
    
   get articleContent(){
      return $$('//*[@resource-id="pcs"]//android.widget.TextView[@text and string-length(@text) > 50]')
   }


   get saveButton(){
      return $('~Save')
   }

   get addToListButton(){
      return $('id=org.wikipedia:id/snackbar_action')
   }

   get textInputAfterSavedButton(){
      return $('id=org.wikipedia:id/text_input')
   }
   
   get createNewListofSavedArtices(){
      return $('id=org.wikipedia:id/create_button')
   }

   get okButtonToCreateNewList(){
      return $('id=android:id/button1')
   }

   get navigateUpButton(){
      return $('~Navigate up')
   }

   get savedButtonNavBar(){
      return $('~Saved')
   }


   // Metodos & Funciones : 




   async hasContent(){
      const paragraphs = await this.articleContent
      return await paragraphs.length > 0
   }



   async getArticleTitleText(){
      await this.articleTitle.isDisplayed()
      return (await this.articleTitle.getText()).trim()
   }

   async titleValidation(expectedTitle){
      const actualTitle = await this.getArticleTitleText()
      expect(actualTitle).toContain(expectedTitle)
   }


   async clickOnSaveButton(){
      await this.saveButton.isDisplayed()
      await this.saveButton.click()
   }

   async clickOnAddToList(){
      await this.addToListButton.isDisplayed()
      await this.addToListButton.click()
   }

   async addInputToTextInputAfterSavedButton(){
      await this.textInputAfterSavedButton.isDisplayed({timeout: 10000})
      await this.textInputAfterSavedButton.setValue("Articulos Guardados")

   }

   async clickOnCreateNewListIfNeeded(){
      try{
         const newList = await this.createNewListofSavedArtices
         if(await newList.isDisplayed()){
            await newList.click()
            await driver.pause(1000)
         }
      }
      catch(e){
         // Button didnt appeared
      }
   }

   async clickOkButtonToCreateNewList(){
      await this.okButtonToCreateNewList.isDisplayed()
      await this.okButtonToCreateNewList.click()
   }

   async clickNavigateUpButton(){
      await this.navigateUpButton.isDisplayed()
      await this.navigateUpButton.click()
   }

   async clickSavedButtonNavBar(){
      await this.savedButtonNavBar.isDisplayed()
      await this.savedButtonNavBar.click()
   }


   async getListOfArticlesSaved(name){
      return await $(`android=new UiSelector().resourceId("org.wikipedia:id/item_title").text("${name}")`)
      
   }
   
 async cleanEnvironment(listName = "Articulos Guardados") {

    const list = await this.getListOfArticlesSaved(listName)
    await list.waitForDisplayed()

    await browser.execute('mobile: longClickGesture', {
        elementId: list.elementId,
        duration: 2000
    })

    
    const deleteOption = await $('android=new UiSelector()\
        .resourceId("org.wikipedia:id/title")\
        .text("Delete list")')

    await deleteOption.waitForDisplayed()
    await deleteOption.click()

   
    const okButton = await $('id=android:id/button1')
    await okButton.waitForDisplayed()
    await okButton.click()
}

async saveFunctionality(){
         await HomePage.openFirstFeaturedArticleAndGetTitle()
        await this.clickOnSaveButton()
        await this.clickOnAddToList()
        await this.clickOnCreateNewListIfNeeded()
        await this.addInputToTextInputAfterSavedButton()
        await this.clickOkButtonToCreateNewList()
        await this.clickNavigateUpButton()
        await this.clickSavedButtonNavBar()
}

}

module.exports = new ArticlePage()
