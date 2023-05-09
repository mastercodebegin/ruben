Feature: TermsAndConditions

    Scenario: User navigates to TermsAndConditions
        Given I am a User loading TermsAndConditions
        When I navigate to the TermsAndConditions
        Then TermsAndConditions will load with out errors
        Then callGetTermsAndConditions
        Then check api call
        And I can leave the screen with out errors