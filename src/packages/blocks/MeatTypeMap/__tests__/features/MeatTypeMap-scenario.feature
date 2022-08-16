Feature: MeatTypeMap

    Scenario: User navigates to MeatTypeMap
        Given I am a User loading MeatTypeMap
        When I navigate to the MeatTypeMap
        Then MeatTypeMap will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors