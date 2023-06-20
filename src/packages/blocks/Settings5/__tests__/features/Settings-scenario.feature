Feature: Settings

    Scenario: User navigates to settings screen
        Given users loading settings screen
        Then User pressing about us button to navigate to about us screen
        Then User pressing Analytics Screen button to navigate to Analytics screen
        Then User pressing Terms & conditions Screen button to navigate to Terms & conditions screen
        Then User pressing my orders Screen button to navigate to  my orders screen
        Then User pressing delete account button
        Then User pressing logout button
        Then User pressing cold packaging trigget
        Then User pressing lifetime subscribing trigger
        Then I can leave the screen with out errors
