Feature: UpdateProfile

    Scenario: User navigates to update profile screen
        Given I am a User loading update profile screen
        When I navigate to the update profile screen
        Then user selecting image from storage
        Then user filling all the text fields
        Then user saving al the details
        And I can leave the screen with out errors
