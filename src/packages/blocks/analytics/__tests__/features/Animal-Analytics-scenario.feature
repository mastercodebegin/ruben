Feature: AnimalAnalytics

    Scenario: User navigates to AnimalAnalytics
        Given I am a User loading AnimalAnalytics
        When I navigate to the AnimalAnalytics
        Then AnimalAnalytics will load with out errors
        Then click on cow chuck
        Then click on cowHead
        Then click on cowRib
        Then click on cowShortlion
        Then click on cowSirLion
        Then click on cowRound
        Then click on cowShank
        Then click on cowFlank
        Then click on cowForeShank
        Then click on cowBrisket
        Then click on cowShortplate
        And I can leave the screen with out errors
