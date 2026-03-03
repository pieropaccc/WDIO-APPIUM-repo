const HomePage = require('../../../src/pages/HomePage.js')
const ArticlePage = require('../../../src/pages/ArticlePage.js')

describe('Basic Navigation in Wikipedia App', () => {

   beforeEach(async () => {
      await HomePage.skipOnboardingIfNeeded()
   })

   it('Search & click in the first Featured Article', async() => {
     
      const expectedTitle = await HomePage.openFirstFeaturedArticleAndGetTitle()

      //Assertion to validate title:
      await ArticlePage.titleValidation(expectedTitle)
      //Assertion to validate that article has content : 
     expect(await ArticlePage.hasContent()).toBe(true)
      
      await ArticlePage.clickNavigateUpButton()
   })

   it('Save functionality', async()=>{

      await ArticlePage.saveFunctionality()

      // Assertion .1 to validate we are inside Saved Tab
      const toolbarTitle = await $('id=org.wikipedia:id/main_toolbar').$("android.widget.TextView")
      await expect(toolbarTitle).toHaveText('Saved')

      // Assertion .2 to validate title of the list of articles saved
      const list = await ArticlePage.getListOfArticlesSaved("Articulos Guardados")
      await expect(list).toBeDisplayed()
      await expect(list).toHaveText("Articulos Guardados")

      // Delete List created to have clean environment
      
      await ArticlePage.cleanEnvironment()
         
   })
})




