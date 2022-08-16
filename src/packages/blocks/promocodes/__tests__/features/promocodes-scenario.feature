Feature: promocodes

    Scenario: User navigates to promocodes
        Given I am a User loading promocodes
        When I navigate to the promocodes
        Then promocodes will load with out errors
        And I can leave the screen with out errors