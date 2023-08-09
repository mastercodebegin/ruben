Feature: AnimalPig

    Scenario: User navigates to animal pig screen 
        Given I am a User loading pig image
        When I navigate to the Animal pig
        Then Animal pig will load with out errors
        Then I click on pig neck
        Then I click on pig back
        Then I click on pig breast
        Then I click on pig wing
        And I can leave the pig screen with out errors

