Feature: LoadingScreen

    Scenario: User navigates to loading screen
        Given I am a User clicking shared url
        When I can see the loader while fetching the details
        Given I am a User trying to open blog post using shared url
        Given opening product link
        Then I can leave the screen with out errors
