Feature: StripeIntegration

    Scenario: User navigates to StripeIntegration
        Given I am a User loading StripeIntegration
        When I navigate to the StripeIntegration
        Then StripeIntegration will load with out errors
        Then I can enter text with out errors
        Then I can enter card number
        Then I can enter card expirtydate
        Then I can enter cvv
        And I can select the button with with out errors
        And I can leave the screen with out errors