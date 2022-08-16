Feature: CustomisableUserProfiles

    Scenario: User navigates to CustomisableUserProfiles
        Given I am a User loading CustomisableUserProfiles
        When I navigate to the CustomisableUserProfiles
        Then CustomisableUserProfiles will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors