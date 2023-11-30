Feature: LandingPage

    Scenario: User navigates to LandingPage
        Given I am a User loading LandingPage
        When I navigate to the LandingPage
        Then LandingPage will load with out errors
        And I can see the blog posts on landingPage
        Then user pressing add to cart button
        Then user can see imgBlogPost
        And I can leave the screen with out errors
